"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { User } from "@/lib/session";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/data-access/users";
import { toast } from "sonner";
import { deleteRoute } from "@/actions/route_actions";
import { Input } from "@/components/ui/input";

export function DeletePortfolioDialog({
  isOpen,
  setIsOpen,
  routeName,
  user,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: User;
  routeName?: string;
}) {
  const [isDeleteText, setDeleteText] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handlePortfolioAccount() {
    startTransition(async () => {
      // Call the API to delete user images
      await fetch("/api/delete-user-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }),
      });

      // Delete the user
      if (user && routeName) {
        await deleteRoute(routeName);
      }
      router.push("/");
      setIsOpen(false);
      //   also added a toast messge

      toast.success("User has been deleted");
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Portfolio</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </DialogDescription>

        <p className="text-sm">
          Type <span className="font-bold"> Delete </span>to confirm
        </p>
        <Input type="text" onChange={(e) => setDeleteText(e.target.value)} />
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={isDeleteText !== "Delete"}
            variant="destructive"
            onClick={handlePortfolioAccount}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
