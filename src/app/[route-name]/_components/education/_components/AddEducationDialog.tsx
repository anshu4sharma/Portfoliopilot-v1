"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { EducationFormData, EducationLevel, ScoreType } from "../types"
import { EDUCATION_LEVELS, STREAMS, BOARDS } from "../constants"
import { getDegreePlaceholder, getScorePlaceholder, isOtherEducation, isOtherStream, isSchoolEducation } from "../utils"
import { addEducation } from "@/actions/education-actions"
import { GetRouteType } from "@/actions/route_actions"
import { User } from "@/lib/session";
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { useTransition } from "react"
import { PlusIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

import { ProPlanRequiredDialog } from "@/components/pro-plan-required-dialog";

interface AddEducationDialogProps {
    user: User
    route: GetRouteType
    className?: string
    children?: React.ReactNode
}

export function AddEducationDialog({ user, route, className, children }: AddEducationDialogProps) {

    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const isUserPro = user?.userType == 'pro'

    const { register, handleSubmit, watch, setValue, reset } = useForm<EducationFormData>({
        defaultValues: {
            level: "Graduation",
            institution: "",
            location: "",
            degree: "",
            stream: "",
            board: "",
            status: "Pursuing",
            startYear: "",
            endYear: "",
            yearOfCompletion: "",
            scoreType: "Percentage",
            scoreValue: "",
            customTitle: "",
            customStream: "",
        },
    })

    const level = watch("level")
    const stream = watch("stream")

    const onSubmitForm = (data: EducationFormData) => {

        // const isProUser = user?.userType === "pro";

        // if (!isProUser) {
        //     setShowProDialog(true);
        //     return;
        // }


        startTransition(async () => {
            try {
                await addEducation({
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
                    description: "Education added successfully!",
                });
                setOpen(false);
                reset();
            } catch (error) {
                // console.error(error);
                toast({
                    title: "Error",
                    description: "Failed to add education. Please try again.",
                    variant: "destructive",
                });
            }
        })
    }

    // const isSchoolEducation = isSchoolEducation(level)
    // const isOtherEducation = isOtherEducation(level)(level)
    // const isOtherStream = isOtherStream(stream)

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children ? children : <Button className={className}> <PlusIcon className="w-4 h-4 mr-2" />  Add Education</Button>}
                </DialogTrigger>
                {isUserPro &&
                    <DialogContent className="sm:max-w-[600px] h-[95vh] flex flex-col p-0">
                        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col h-full">
                            <DialogHeader className="px-6 py-4 border-b">
                                <DialogTitle>Add Education</DialogTitle>
                                <DialogDescription>
                                    Fill in your education details. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="flex-grow px-6 py-4">
                                <div className="grid gap-4 px-1">
                                    <div className="grid gap-2">
                                        <Label htmlFor="level">Education Level <span className="text-red-500">*</span></Label>
                                        <Select
                                            onValueChange={(value: EducationLevel) => setValue("level", value)}
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

                                    {isOtherEducation(level) && (
                                        <div className="grid gap-2">
                                            <Label htmlFor="customTitle">Custom Title</Label>
                                            <Input
                                                id="customTitle"
                                                placeholder="e.g. Online Certification"
                                                {...register("customTitle")}
                                            />
                                        </div>
                                    )}

                                    {isSchoolEducation(level) && (
                                        <>
                                            <div className="grid gap-2">
                                                <Label htmlFor="school">School <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="school"
                                                    placeholder="e.g. Delhi Public School"
                                                    {...register("institution", { required: true })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="board">Board</Label>
                                                <Select onValueChange={(value) => setValue("board", value)} defaultValue={watch("board")}>
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
                                    )}
                                    {!isSchoolEducation(level) && (
                                        <>
                                            <div className="grid gap-2">
                                                <Label htmlFor="institution">Institution <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="institution"
                                                    placeholder="e.g. Stanford University"
                                                    {...register("institution", { required: true })}
                                                />
                                            </div>
                                            {["PhD", "Post Graduation", "Graduation", "Diploma", "Other"].includes(level) && (
                                                <>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="degree">Degree <span className="text-red-500">*</span></Label>
                                                        <Input
                                                            id="degree"
                                                            placeholder={getDegreePlaceholder(level)}
                                                            {...register("degree", { required: true })}
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="stream">Stream/Specialization</Label>
                                                        <Select onValueChange={(value) => setValue("stream", value)} defaultValue={stream}>
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
                                                    {isOtherStream(stream ?? "") && (
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
                                            <Label htmlFor="startYear">Start Year <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="startYear"
                                                placeholder="e.g. 2018"
                                                {...register("startYear", { required: true })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="endYear">End Year <span className="text-red-500">*</span></Label>
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
                                                onValueChange={(value: ScoreType) => setValue("scoreType", value)}
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
                            <DialogFooter className="px-6 py-4 border-t">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Education"}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>}
            </Dialog>
            {!isUserPro &&
                <ProPlanRequiredDialog
                    isOpen={open}
                    setIsOpen={setOpen}
                    featureName="add education to your portfolio"
                />}
        </>
    )
}

