'use client'

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Education } from "@/db/schema";
import { GetRouteType } from "@/actions/route_actions";
import { UpdateEducationDialog } from "../_components/UpdateEducationDialog";
import { DeleteEducationDialog } from "../_components/DeleteEducationDialog";
import { User } from "@/lib/session";

interface EducationTimelineProps {
    education: Education[];
    canEdit: boolean;
    user: User;
    route: GetRouteType;
}

export function EducationTimeline({ education, canEdit, user, route }: EducationTimelineProps) {
    const sortedEducation = [...education].sort((a, b) => {
        const aYear = parseInt(a.endYear?.toString() || a.yearOfCompletion?.toString() || a.startYear?.toString() || "0");
        const bYear = parseInt(b.endYear?.toString() || b.yearOfCompletion?.toString() || b.startYear?.toString() || "0");
        return bYear - aYear;
    });

    function scoreFormatter(score: string) {
        switch (score) {
            case "Percentage":
                return `%`;
            case "CGPA 10":
                return `CGPA/10`;
            case "CGPA 7":
                return `CGPA/7`;
            case "CGPA 5":
                return `CGPA/5`;
            case "CGPA 4":
                return `CGPA/4`;
            default:
                return '';
        }
    }

    return (
        <div>
            {/* Mobile view */}
            <div className="md:hidden space-y-4">
                {sortedEducation.map((edu) => (
                    <Card key={edu.id}>
                        <CardHeader>
                            <CardTitle>{edu.level}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-2 gap-2 text-sm">
                                <dt className="font-semibold">Institution:</dt>
                                <dd>{edu.institution}</dd>
                                <dt className="font-semibold">Degree/Board:</dt>
                                <dd>{edu.degree ? edu.degree : edu.board || ""}</dd>
                                <dt className="font-semibold">Stream/Specialization:</dt>
                                <dd>{edu.customStream ? edu.customStream : edu.stream === "None" ? null : edu.stream}</dd>
                                <dt className="font-semibold">Year:</dt>
                                <dd>{edu.startYear} - {edu.endYear && edu.endYear.toString().slice(-2)}</dd>
                                <dt className="font-semibold">Score:</dt>
                                <dd>{edu.scoreValue ? (`${edu.scoreValue} ${scoreFormatter(edu.scoreType || "")}`) : ''}</dd>
                            </dl>
                            {canEdit && (
                                <div className="flex justify-end space-x-2 mt-4">
                                    <UpdateEducationDialog user={user} route={route} education={edu} />
                                    <DeleteEducationDialog route={route} educationId={edu.id} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Desktop view */}
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Level</TableHead>
                            <TableHead>Institution</TableHead>
                            <TableHead>Degree</TableHead>
                            <TableHead>Stream/Specialization</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Score</TableHead>
                            {canEdit && <TableHead className="w-[100px]">Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedEducation.map((edu) => (
                            <TableRow key={edu.id}>
                                <TableCell>{edu.level}</TableCell>
                                <TableCell>{edu.institution}</TableCell>
                                <TableCell>{edu.degree ? edu.degree : edu.board || ""}</TableCell>
                                <TableCell>{edu.customStream ? edu.customStream : edu.stream === "None" ? null : edu.stream}</TableCell>
                                <TableCell>{edu.startYear} - {edu.endYear && edu.endYear.toString().slice(-2)}</TableCell>
                                <TableCell>{edu.scoreValue ? (`${edu.scoreValue} ${scoreFormatter(edu.scoreType || "")}`) : ''}</TableCell>
                                {canEdit && (
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <UpdateEducationDialog user={user} route={route} education={edu} />
                                            <DeleteEducationDialog route={route} educationId={edu.id} />
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

