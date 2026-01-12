import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LockIcon } from "lucide-react";

interface ProPlanRequiredDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    featureName: string;
}

export function ProPlanRequiredDialog({
    isOpen,
    setIsOpen,
    featureName,
}: ProPlanRequiredDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <LockIcon className="h-5 w-5 text-primary" />
                        <DialogTitle>Pro Plan Required</DialogTitle>
                    </div>
                    <DialogDescription className="pt-2">
                        To {featureName}, you need to upgrade to our Pro plan. Unlock this and
                        many other premium features to enhance your portfolio.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Maybe Later
                    </Button>
                    <Link href="/pricing" className="w-full sm:w-auto">
                        <Button className="w-full">View Pricing Plans</Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}