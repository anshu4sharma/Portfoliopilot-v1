import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pencil } from "lucide-react";

interface ContactEmailDialogProps {
  contactEmail: string;
  setContactEmail: (email: string) => void;
  pending: boolean;
  updateContactEmail: () => Promise<void>;
}

export function ContactEmailDialog({
  contactEmail,
  setContactEmail,
  pending,
  updateContactEmail,
}: ContactEmailDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    await updateContactEmail();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contact Email</DialogTitle>
        </DialogHeader>
        <Input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={pending}>
            {pending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
