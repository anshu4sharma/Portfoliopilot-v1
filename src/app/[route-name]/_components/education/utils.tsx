import { Education, EducationLevel, ScoreType } from "./types";
import { Award, Book } from "lucide-react";


export const sampleEducationData: Education[] = [
    {
        id: "1",
        level: "PhD",
        institution: "IIT Bombay",
        location: "Mumbai, Maharashtra",
        degree: "Doctor of Philosophy",
        stream: "Computer Science",
        board: "CBSE",
        status: "Completed",
        startYear: "2020",
        endYear: "2024",
        yearOfCompletion: "2024",
        score: {
            type: "Percentage",
            value: 85.5,
        },
        customTitle: "PhD in Computer Science",
        customStream: "Computer Science",
    },
    {
        id: "2",
        level: "XIIth",
        institution: "St. Joseph's School",
        location: "Mumbai, Maharashtra",
        board: "CBSE",
        status: "Completed",
        startYear: "2018",
        endYear: "2020",
        yearOfCompletion: "2020",
        score: {
            type: "Percentage",
            value: 95.5,
        },
        customTitle: "XIIth",
        customStream: "Science",
    }
];

export const getDegreePlaceholder = (level: EducationLevel) => {
    return level === "PhD" ? "e.g. Doctor of Philosophy" : "e.g. Bachelor of Science";
};

export const getScorePlaceholder = (scoreType: ScoreType) => {
    return scoreType === "Percentage" ? "e.g. 85.5" : "e.g. 8.5";
};



export const getEducationIcon = (level: EducationLevel) => {
    return level === "PhD" ? <Award /> : <Book />;
};

export const isSchoolEducation = (level: EducationLevel) => level === "Xth" || level === "XIIth"
export const isOtherEducation = (level: EducationLevel) => level === "Other"
export const isOtherStream = (stream: string) => stream === "Other"