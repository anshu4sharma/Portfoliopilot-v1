"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { addSkill } from "@/actions/skill_actions";
import { GetRouteType } from "@/actions/route_actions";
import { User } from "@/lib/session";
import { IconSelector, IconKey, allIcons } from "@/components/icon-selector";
import { IconRenderer } from "@/components/icon-renderer";
import { PlusIcon } from "lucide-react";
import { ProPlanRequiredDialog } from "@/components/pro-plan-required-dialog";

export const skillSchema = z.object({
  skillName: z.string().min(2, "Skill name must be at least 2 characters"),
  iconName: z.string().min(1, "Icon is required"),
  yearOfExperience: z.coerce
    .number()
    .min(0, "Years must be 0 or greater")
    .max(30, "Years must be less than 30"),
  levelOfProficiency: z.enum([
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ]),
});

export type SkillFormValues = z.infer<typeof skillSchema>;

type Props = {
  route: GetRouteType;
  user: User;
};

export function AddSkillDialog({ route, user }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const isProUser = user?.userType === "pro";

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skillName: "",
      iconName: "",
      yearOfExperience: 0,
      levelOfProficiency: "beginner",
    },
  });

  async function onSubmit(values: SkillFormValues) {

    startTransition(async () => {
      try {
        await addSkill({
          ...values,
          userId: user?.id || 0,
          routeId: route?.routeId || 0,
          routeName: route?.routeName || "",
        });

        toast({
          title: "Success",
          description: "Skill added successfully!",
        });
        setOpen(false);
        form.reset();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add skill. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Skill
          </Button>
        </DialogTrigger>
        {isProUser && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>
                Add a new skill to your portfolio. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="skillName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. React" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="iconName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-2 flex items-center gap-2">
                        <FormLabel>Icon</FormLabel>
                        <div className="mr-4 rounded-full bg-primary/10 p-2 text-primary">
                          <IconRenderer iconName={field.value} />
                        </div>
                      </div>

                      <FormControl>
                        <IconSelector
                          onSelect={field.onChange}
                          defaultSearchValue={field.value}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="levelOfProficiency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proficiency Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
                {isPending ? "Adding..." : "Add Skill"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      {!isProUser && (
        <ProPlanRequiredDialog
          isOpen={open}
          setIsOpen={setOpen}
          featureName="add skills to your portfolio"
        />
      )}
    </>
  );
}
