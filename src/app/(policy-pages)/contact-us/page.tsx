"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must not exceed 255 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactUs() {
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
    const myEmail = "support@portfoliopilot.in";
    const subject = "New Contact for Portfoliopilot";
    const body = `
Dear Portfoliopilot,

You have received a new message from your website contact form:

Name: ${name}
Email: ${email}

Message:
${message}

Best regards,
Website Contact Form
`.trim();

    const mailtoLink = `mailto:${myEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold">Portfoliopilot</h2>
            <p className="mb-4 text-lg">
              Welcome to Portfoliopilot. We're here to help! If you have
              any questions, concerns, or feedback about our services, please
              don't hesitate to reach out to us.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    className="h-32"
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                  <Mail className="h-5 w-5" />
                  Contact Details
                </h3>
                <div className="space-y-2">
                  <p>Email: support@portfoliopilot.in</p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                  <MapPin className="h-5 w-5" />
                  Office Address
                </h3>
                <address className="space-y-1 not-italic">
                  <p className="font-medium">Portfoliopilot</p>
                  <p>Meerut, Uttar Pradesh</p>
                  <p>India</p>
                </address>
              </div>

              {/* <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                <div className="space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
                  <p>Saturday: 9:00 AM - 2:00 PM (IST)</p>
                  <p>Sunday: Closed</p>
                </div>
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
