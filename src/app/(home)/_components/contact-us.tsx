"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, Clock, MessageSquare, ArrowRight } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must not exceed 255 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const ContactUS = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const myEmail = "support@portfoliopilot.in";

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, message } = values;
    const subject = "New Contact from Portfolio";
    const body = `
Dear Portfolio Owner,

You have received a new message from your portfolio contact form:

Name: ${name}
Email: ${email}

Message:
${message}

Best regards,
Your Portfolio Contact Form
`.trim();

    const mailtoLink = `mailto:${myEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  return (
    <section id="contact" className="container py-12 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Get In Touch
            </h2>
            <div className="group relative">
              <p className="mb-6 max-w-prose text-muted-foreground">
                Have questions about portfoliopilot.in? We're here to help! Whether you
                need assistance with your portfolio or want to learn more about
                our features, don't hesitate to reach out.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-2 border-primary/10 bg-card/50 backdrop-blur-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email Us</p>
                  <p className="text-sm text-muted-foreground">{myEmail}</p>
                </div>
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
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
