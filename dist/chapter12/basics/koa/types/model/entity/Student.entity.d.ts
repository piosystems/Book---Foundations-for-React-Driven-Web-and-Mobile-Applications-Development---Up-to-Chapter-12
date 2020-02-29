import { User } from "./User.entity";
import { AuditColumn } from "./AuditColumn.entity";
import { CourseOfferingEnrollment } from "./CourseOfferingEnrollment.entity";
import { Program } from "./Program.entity";
import { Level } from "../../settings";
export declare class Student extends AuditColumn {
    admissionNumber: string;
    matriculationNumber: string;
    programOfStudy: Program;
    yearOfEntry: number;
    entryLevel: Level;
    currentLevel: Level;
    entryQualifications: string[];
    schoolsAttended: string[];
    graduated: boolean;
    user: User;
    courseOfferingEnrollments: Promise<CourseOfferingEnrollment[]>;
}
