"use client";
import { startTransition, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { env } from "@/env";
import { GetUserRouteType, updateRouteName } from "@/actions/route_actions";
import { RouteFormSchema } from "@/app/create-portfolio/_components/create-portfolio";
import { toast, useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/dist/client/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  route: GetUserRouteType;
};

export default function DomainsSettings({ route }: Props) {
  const [routeName, setRouteName] = useState(
    route?.routeName && route?.routeName,
  );
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const routeForm = useForm<z.infer<typeof RouteFormSchema>>({
    resolver: zodResolver(RouteFormSchema),
    defaultValues: {
      routeName: routeName,
    },
  });

  const handleRouteNameUpdate = async (
    data: z.infer<typeof RouteFormSchema>,
  ) => {
    console.log("btn clicked");
    if (data.routeName && routeName !== data.routeName && routeName) {
      startTransition(async () => {
        console.log("inside transition");
        try {
          const result = await updateRouteName(routeName, data.routeName);

          setRouteName(data.routeName);
          toast({
            title: "Route Updated",
            description: `Your route has been updated to /${result.routeName}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
          });
        } catch (error) {
          console.error("Error updating route name:", error);
          toast({
            title: "Update Failed",
            description:
              error instanceof Error
                ? error.message
                : "An error occurred while updating the route. Please try again.",
            variant: "destructive",
          });
        }
      });
    }
  };

  return (
    <Form {...routeForm}>
      <form onSubmit={routeForm.handleSubmit(handleRouteNameUpdate)}>
        <Card>
          <CardHeader>
            <CardTitle>Subdomain</CardTitle>
            <CardDescription>
              Your site&apos;s default Vercel subdomain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={routeForm.control}
              name="routeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route Name</FormLabel>
                  <div className="flex flex-col items-center gap-2 lg:flex-row">
                    <FormControl>
                      <div className="flex w-full">
                        <Input
                          placeholder={routeName}
                          className="rounded-r-none"
                          {...field}
                        />
                        <div className="flex items-center rounded-r-md border border-l-0 bg-muted px-3 text-muted-foreground">
                          .{env.NEXT_PUBLIC_ROOT_DOMAIN}
                        </div>
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              disabled={
                isPending || routeForm.getValues("routeName") === routeName
              }
              type="submit"
              className="w-full lg:w-auto"
            >
              <Check className="mr-2 h-4 w-4" />{" "}
              {isPending ? "Updating..." : "Save Changes"}
            </Button>

          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

function CustomDomain() {
  const form = useForm();
  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
          <CardDescription>Point your own domain to your site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="customDomain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Domain</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="yourdomain.com" />
                </FormControl>
                <FormDescription>Please enter a valid domain.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
