// constants

import { EducationLevel } from "./types";

export const EDUCATION_LEVELS: EducationLevel[] = [
  "PhD",
  "Post Graduation",
  "Graduation",
  "Diploma",
  "XIIth",
  "Xth",
  "Other",
];

export const isSchoolEducation = (level: EducationLevel) => level === "Xth" || level === "XIIth"
export const isOtherEducation = (level: EducationLevel) => level === "Other"
export const isOtherStream = (stream: string) => stream === "Other"

export const STREAMS = [
  "None",
  "Science",
  "Commerce",
  "Arts",
  "Computer Science",
  "Engineering",
  "Business Studies",
  "Economics",
  "Other",
];

export const BOARDS = ["CBSE", "ICSE", "State Board", "International Board", "Other"];
