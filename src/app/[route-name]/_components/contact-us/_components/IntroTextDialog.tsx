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

interface IntroTextDialogProps {
  introText: string;
  setIntroText: (text: string) => void;
  pending: boolean;
  updateIntroText: () => Promise<void>;
}

export function IntroTextDialog({
  introText,
  setIntroText,
  pending,
  updateIntroText,
}: IntroTextDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    await updateIntroText();
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
          <DialogTitle>Edit Introduction Text</DialogTitle>
        </DialogHeader>
        <Textarea
          value={introText}
          onChange={(e) => setIntroText(e.target.value)}
          className="min-h-[100px]"
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
