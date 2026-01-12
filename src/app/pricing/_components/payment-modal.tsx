"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { useRouter } from "next/navigation";
import { UserEmailAndName } from "@/data-access/profiles";
import { PRICING } from "@/config/pricing";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

type PaymentModalProps = {
  userId: number;
  children?: React.ReactNode;
  phoneNo?: string;
  userNameAndEmail?: UserEmailAndName;
  billingCycle: "monthly" | "yearly";
};

export default function PaymentModal({
  userId,
  children,
  phoneNo,
  userNameAndEmail,
  billingCycle,
}: PaymentModalProps) {
  const router = useRouter();
  const billingCycleKey = billingCycle.toUpperCase() as "MONTHLY" | "YEARLY";
  const pricing = PRICING[billingCycleKey];
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: userNameAndEmail?.displayName ?? "",
      email: userNameAndEmail?.email ?? "",
      phoneNumber: phoneNo ?? "",
    },
  });

  const handlePayment = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const paymentResponse = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: parseFloat(pricing.OFFER_PRICE),
            currency: "INR",
            billingCycle,
          }),
        });

        if (!paymentResponse.ok) {
          throw new Error(`HTTP error! status: ${paymentResponse.status}`);
        }

        const { order } = await paymentResponse.json();

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "portfoliopilot.in",
          description: `${billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)} Pro Plan`,
          order_id: order.id,
          handler: async function (response: any) {
            const paymentResponse = await fetch("/api/after-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                response,
                phoneNo: values.phoneNumber,
                userId,
                amount: order.amount / 100,
                currency: order.currency,
                email: values.email,
                name: values.fullName,
                paymentId: response.razorpay_payment_id,
              }),
            });

            if (!paymentResponse.ok) {
              toast({
                title: "Error processing payment",
                description: `Error: ${paymentResponse.statusText}`,
                variant: "destructive",
              });
            } else {
              toast({
                title: "Payment Successful",
                description: `Payment ID: ${response.razorpay_payment_id}`,
              });
              router.push("/dashboard");
            }
          },
          prefill: {
            name: values.fullName,
            email: values.email,
            contact: values.phoneNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (error) {
        toast({
          title: "Error initiating payment",
          description: error as string,
          variant: "destructive",
        });
        console.error("Error initiating payment", error);
      }
    });
  };

  const handleSubscription = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const subscriptionResponse = await fetch("/api/subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            billingCycle,
          }),
        });

        if (!subscriptionResponse.ok) {
          throw new Error(`HTTP error! status: ${subscriptionResponse.status}`);
        }

        const { subscription, key } = await subscriptionResponse.json();

        const options = {
          key,
          subscription_id: subscription.id,
          name: "portfoliopilot.in",
          description: `${billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)} Pro Plan Subscription`,
          handler: async function (response: any) {
            const confirmResponse = await fetch("/api/after-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                response,
                phoneNo: values.phoneNumber,
                userId,
                amount: subscription.plan_amount / 100,
                currency: "INR",
                email: values.email,
                name: values.fullName,
                paymentId: response.razorpay_payment_id,
                subscriptionId: subscription.id,
              }),
            });

            if (!confirmResponse.ok) {
              toast({
                title: "Error processing subscription",
                description: `Error: ${confirmResponse.statusText}`,
                variant: "destructive",
              });
            } else {
              toast({
                title: "Subscription Successful",
                description: `Subscription ID: ${subscription.id}`,
              });
              router.push("/dashboard");
            }
          },
          prefill: {
            name: values.fullName,
            email: values.email,
            contact: values.phoneNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (error) {
        toast({
          title: "Error initiating subscription",
          description: error as string,
          variant: "destructive",
        });
        console.error("Error initiating subscription", error);
      }
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handlePayment(values);
    // handleSubscription(values);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {children ? (
            children
          ) : (
            <Button className="mt-4 w-full" disabled={isPending}>
              Make Payment
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Your Details</DialogTitle>
            <DialogDescription>
              Please provide your information to proceed with the payment.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter a phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Processing..." : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
