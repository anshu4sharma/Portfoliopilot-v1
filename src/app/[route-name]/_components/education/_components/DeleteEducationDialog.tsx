import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GetRouteType } from "@/actions/route_actions";
import { deleteEducation } from "@/actions/education-actions";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

interface DeleteEducationDialogProps {
  educationId: number;
  route: GetRouteType;
  children?: React.ReactNode;
  className?: string;
}

export function DeleteEducationDialog({
  educationId,
  route,
  children,
  className,
}: DeleteEducationDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  const handleConfirm = () => {
    startTransition(() => {
      try {
        deleteEducation(educationId, route?.routeName || "");
        toast({
          title: "Education deleted",
          description: "The education entry has been deleted successfully",
        });
        setOpen(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while deleting the education entry - " + error,
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? children : <Button size='icon' variant="ghost" className={className}> <Trash2 className="w-4 h-4" />  </Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Education</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the education entry? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
