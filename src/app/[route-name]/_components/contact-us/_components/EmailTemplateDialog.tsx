import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Pencil } from "lucide-react";

interface EmailTemplateDialogProps {
  emailTemplate: string;
  setEmailTemplate: (template: string) => void;
  pending: boolean;
  updateEmailTemplate: () => Promise<void>;
}

export function EmailTemplateDialog({
  emailTemplate,
  setEmailTemplate,
  pending,
  updateEmailTemplate,
}: EmailTemplateDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    await updateEmailTemplate();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Email Template</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Email Template</DialogTitle>
        </DialogHeader>
        <Textarea
          value={emailTemplate}
          onChange={(e) => setEmailTemplate(e.target.value)}
          className="min-h-[200px]"
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
