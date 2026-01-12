"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, Clock, LockIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ContactMe } from "@/db/schema";
import { GetRouteType } from "@/actions/route_actions";
import { updateContactMe } from "@/actions/contact-me-actions";
import { useToast } from "@/components/ui/use-toast";
import { IntroTextDialog } from "./_components/IntroTextDialog";
import { ContactEmailDialog } from "./_components/ContactEmailDialog";
import { EmailTemplateDialog } from "./_components/EmailTemplateDialog";
import { useCanEditPortfolio } from "@/hooks/useCanEditPortfolio";
import { User } from "@/lib/session";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ProPlanRequiredDialog } from "@/components/pro-plan-required-dialog";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must not exceed 255 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const ContactSection = ({
  user,
  contactMe,
  route,
  heroSectionEmail,
}: {
  user: User;
  contactMe: ContactMe;
  route: GetRouteType;
  heroSectionEmail: string;
}) => {
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const canEdit = useCanEditPortfolio(user?.id || 0, route?.userId || 0);
  const isUserPro = user?.userType === 'pro'

  const [introText, setIntroText] = useState(
    contactMe?.introText ||
    "I'm always eager to discuss new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out if you'd like to collaborate or simply have a chat about the latest in web development and design.",
  );
  const [contactEmail, setContactEmail] = useState(
    contactMe?.contactEmail || heroSectionEmail,
  );
  const [emailTemplate, setEmailTemplate] = useState(
    contactMe?.emailTemplate ||
    `
Dear Portfolio Owner,

  You have received a new message from your portfolio contact form:

  Name: {name}
  Email: {email}

  Message:
  {message}

  Best regards,
  Your Portfolio Contact Form
  `.trim(),
  );

  const [showContact, setShowContact] = useState(user?.userType === 'pro');
  const [showProDialog, setShowProDialog] = useState(false);

  const handleToggleContact = (checked: boolean) => {
    if (user?.userType !== 'pro') {
      setShowProDialog(true);
      return;
    }
    setShowContact(checked);
    // Here you would typically also save this preference to the database
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, message } = values;
    const subject = "New Contact from Portfolio";
    const body = emailTemplate
      .replace("{name}", name)
      .replace("{email}", email)
      .replace("{message}", message);

    const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  async function updateIntroText() {
    startTransition(async () => {
      try {
        const result = await updateContactMe(
          route?.userId || 0,
          route?.routeName || "",
          {
            introText,
          },
        );

        if (result) {
          toast({
            title: "Success",
            description: "Introduction text has been updated",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update introduction text",
        });
      }
    });
  }

  async function updateContactEmail() {
    startTransition(async () => {
      try {
        const result = await updateContactMe(
          route?.userId || 0,
          route?.routeName || "",
          {
            contactEmail,
          },
        );

        if (result) {
          toast({
            title: "Success",
            description: "Contact email has been updated",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update contact email",
        });
      }
    });
  }

  async function updateEmailTemplate() {
    startTransition(async () => {
      try {
        const result = await updateContactMe(
          route?.userId || 0,
          route?.routeName || "",
          {
            emailTemplate,
          },
        );

        if (result) {
          toast({
            title: "Success",
            description: "Email template has been updated",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update email template",
        });
      }
    });
  }


  return (
    <>
      {(canEdit || route?.userType === 'pro') && (
        <section id="contact" className="container py-12 md:py-24 lg:py-32">
          {canEdit && !isUserPro && (
            <div className="mb-6 flex items-center gap-2">
              <Switch
                checked={showContact}
                onCheckedChange={handleToggleContact}
              />

              <span className="text-sm text-muted-foreground">
                Enable Contact Section
              </span>
              <Badge >
                {!isUserPro && <LockIcon className="w-2.5 h-2.5 mr-1" />}
                Pro</Badge>
            </div>
          )}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  Connect With Me
                </h2>
                <div className="group relative">
                  <p className="mb-6 max-w-prose text-muted-foreground">
                    {introText}
                  </p>
                  {canEdit && isUserPro && (
                    <div className="absolute -right-2 -top-6">
                      <IntroTextDialog
                        introText={introText}
                        setIntroText={setIntroText}
                        pending={pending}
                        updateIntroText={updateIntroText}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:lg:grid-cols-2">
                <Card className="border-2 border-primary/10 bg-card/50 backdrop-blur-sm relative">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {contactEmail}
                      </p>
                    </div>
                    {canEdit && isUserPro && (
                      <div className='absolute right-2 top-1 '>
                      <ContactEmailDialog
                        contactEmail={contactEmail}
                        setContactEmail={setContactEmail}
                        pending={pending}
                        updateContactEmail={updateContactEmail}
                        />
                        </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary/10 bg-card/50 backdrop-blur-sm">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">
                        Within 24 hours
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>

            <Card className="relative overflow-hidden border-2 border-primary/10 bg-card">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <CardContent className="relative p-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your email address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Your message here..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="group w-full">
                      Send Message
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {canEdit && isUserPro && (
            <div className="mt-8">
              <EmailTemplateDialog
                emailTemplate={emailTemplate}
                setEmailTemplate={setEmailTemplate}
                pending={pending}
                updateEmailTemplate={updateEmailTemplate}
              />
            </div>
          )}
          {showProDialog && (
            <ProPlanRequiredDialog
              isOpen={showProDialog}
              setIsOpen={setShowProDialog}
              featureName="enable contact section"
            />
          )}
        </section>
      )}
    </>
  );
};
