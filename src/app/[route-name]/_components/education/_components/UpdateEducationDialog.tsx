"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EducationFormData, EducationLevel, ScoreType } from "../types";
import { EDUCATION_LEVELS, STREAMS, BOARDS } from "../constants";
import { getDegreePlaceholder, getScorePlaceholder } from "../utils";
import { updateEducation } from "@/actions/education-actions";
import { GetRouteType } from "@/actions/route_actions";
import { User } from "@/lib/session";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useTransition } from "react";
import { Pencil } from "lucide-react";
import { Education } from "@/db/schema";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UpdateEducationDialogProps {
  user: User;
  route: GetRouteType;
  className?: string;
  children?: React.ReactNode;
  education: Education;
}

export function UpdateEducationDialog({
  user,
  route,
  className,
  children,
  education,
}: UpdateEducationDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<EducationFormData>({
      defaultValues: {
        level: education.level as EducationLevel,
        customTitle: education.customTitle ?? "",
        institution: education.institution,
        location: education.location,
        degree: education.degree ?? "",
        stream: education.stream ?? "",
        customStream: education.customStream ?? "",
        board: education.board ?? "",
        status: education.status ?? "Pursuing",
        startYear: education.startYear?.toString() ?? "",
        endYear: education.endYear?.toString() ?? "",
        yearOfCompletion: education.yearOfCompletion?.toString() ?? "",
        scoreType: education?.scoreType ?? "Percentage",
        scoreValue: education?.scoreValue?.toString() ?? "",
      },
    });

  const level = watch("level");
  const stream = watch("stream");

  const onSubmitForm = (data: EducationFormData) => {
    startTransition(async () => {
      try {
        await updateEducation({
          id: education.id,
          level: data.level,
          institution: data.institution,
          location: data.location,
          userId: user?.id ?? 0,
          routeId: route?.routeId ?? 0,
          routeName: route?.routeName ?? "",
          degree: data.degree,
          stream: data.stream,
          board: data.board,
          status: data.status,
          startYear: Number(data.startYear),
          endYear: Number(data.endYear),
          yearOfCompletion: Number(data.yearOfCompletion),
          scoreType: data.scoreType,
          scoreValue: Number(data.scoreValue),
          customTitle: data.customTitle,
          customStream: data.customStream,
        });
        toast({
          title: "Success",
          description: "Education updated successfully!",
        });
        setOpen(false);
        reset();
      } catch (error) {
        // console.error(error);
        toast({
          title: "Error",
          description: "Failed to update education. Please try again." + error,
          variant: "destructive",
        });
      }
    });
  };

  const isSchoolEducation = level === "Xth" || level === "XIIth";
  const isOtherEducation = level === "Other";
  const isOtherStream = stream === "Other";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button size="icon" variant="ghost" className={className}>
            {" "}
            <Pencil className="h-4 w-4" />{" "}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="flex h-[95vh] flex-col p-0 sm:max-w-[600px]">
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="flex h-full flex-col"
        >
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>Update Education</DialogTitle>
            <DialogDescription>
              Update your education details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-grow px-6 py-4">
            <div className="grid gap-4 px-1">
              <div className="grid gap-2">
                <Label htmlFor="level">
                  Education Level <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value: EducationLevel) =>
                    setValue("level", value)
                  }
                  defaultValue={level}
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {EDUCATION_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isOtherEducation && (
                <div className="grid gap-2">
                  <Label htmlFor="customTitle">Custom Title</Label>
                  <Input
                    id="customTitle"
                    placeholder="e.g. Online Certification"
                    {...register("customTitle")}
                  />
                </div>
              )}

              {isSchoolEducation ? (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="school">
                      School <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="school"
                      placeholder="e.g. Delhi Public School"
                      {...register("institution", { required: true })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="board">Board</Label>
                    <Select
                      onValueChange={(value) => setValue("board", value)}
                      defaultValue={watch("board")}
                    >
                      <SelectTrigger id="board">
                        <SelectValue placeholder="Select board" />
                      </SelectTrigger>
                      <SelectContent>
                        {BOARDS.map((board) => (
                          <SelectItem key={board} value={board}>
                            {board}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="institution">
                      Institution <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="institution"
                      placeholder="e.g. Stanford University"
                      {...register("institution", { required: true })}
                    />
                  </div>
                  {[
                    "PhD",
                    "Post Graduation",
                    "Graduation",
                    "Diploma",
                    "Other",
                  ].includes(level) && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="degree">
                          Degree <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="degree"
                          placeholder={getDegreePlaceholder(level)}
                          {...register("degree", { required: true })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="stream">Stream/Specialization</Label>
                        <Select
                          onValueChange={(value) => setValue("stream", value)}
                          defaultValue={stream}
                        >
                          <SelectTrigger id="stream">
                            <SelectValue placeholder="Select stream" />
                          </SelectTrigger>
                          <SelectContent>
                            {STREAMS.map((stream) => (
                              <SelectItem key={stream} value={stream}>
                                {stream}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {isOtherStream && (
                        <div className="grid gap-2">
                          <Label htmlFor="customStream">
                            Custom Stream/Specialization
                          </Label>
                          <Input
                            id="customStream"
                            placeholder="e.g. Data Science"
                            {...register("customStream")}
                          />
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startYear">
                    Start Year <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startYear"
                    placeholder="e.g. 2018"
                    {...register("startYear", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endYear">
                    End Year <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="endYear"
                    placeholder="e.g. 2022"
                    {...register("endYear", { required: true })}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. New Delhi, India"
                  {...register("location")}
                />
              </div>

              <div className="grid gap-2">
                <Label>Performance Score</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    onValueChange={(value: ScoreType) =>
                      setValue("scoreType", value)
                    }
                    defaultValue={watch("scoreType")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Score type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                      <SelectItem value="CGPA 10">CGPA(10)</SelectItem>
                      <SelectItem value="CGPA 7">CGPA(7)</SelectItem>
                      <SelectItem value="CGPA 5">CGPA(5)</SelectItem>
                      <SelectItem value="CGPA 4">CGPA(4)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder={getScorePlaceholder(watch("scoreType"))}
                    {...register("scoreValue")}
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="border-t px-6 py-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Education"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
