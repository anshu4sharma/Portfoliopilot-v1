// types

export type EducationLevel =
  | "PhD"
  | "Post Graduation"
  | "Graduation"
  | "Diploma"
  | "XIIth"
  | "Xth"
  | "Other";

export type EducationLayout = "timeline";

export type ScoreType = "Percentage" | "CGPA 10" | "CGPA 7" | "CGPA 5" | "CGPA 4";

export interface Education {
  id: string;
  level: EducationLevel;
  customTitle?: string;
  institution: string;
  location: string;
  degree?: string;
  stream?: string;
  customStream?: string;
  board?: string;
  status?: "Pursuing" | "Completed";
  startYear?: string;
  endYear?: string;
  yearOfCompletion?: string;
  score: {
    type: ScoreType;
    value: number;
  };
}

export interface EducationFormData {
  level: EducationLevel;
  customTitle?: string;
  institution: string;
  location: string;
  degree?: string;
  stream?: string;
  customStream?: string;
  board?: string;
  status?: "Pursuing" | "Completed";
  startYear?: string;
  endYear?: string;
  yearOfCompletion?: string;
  scoreType: ScoreType;
  scoreValue: string;
}