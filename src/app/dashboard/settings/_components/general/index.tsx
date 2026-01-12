"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { deleteRoute, GetUserRouteType } from "@/actions/route_actions";
import { toast } from "sonner";

type Props = {
  route: GetUserRouteType;
};

export default function GeneralSettings({ route }: Props) {
  const [deleteConfirm, setDeleteConfirm] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      // Call the API to delete user images
      await fetch("/api/delete-user-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: route?.userId }),
      });

      // Delete the user
      if (route?.routeId) {
        await deleteRoute(route?.routeId);
      }
      router.push("/");

      toast.success("User has been deleted");
    });
  }

  return (
    <>
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Delete Portfolio</CardTitle>
          <CardDescription>
            Permanently delete your Portfolio and all of its contents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This action is irreversible. Please proceed with caution.
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <p>
              Type <span className="font-semibold">Delete</span> to confirm
            </p>
            <Input
              // id="delete-confirm"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteConfirm !== "Delete" || isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isPending ? "Deleting..." : "Delete Portfolio"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
