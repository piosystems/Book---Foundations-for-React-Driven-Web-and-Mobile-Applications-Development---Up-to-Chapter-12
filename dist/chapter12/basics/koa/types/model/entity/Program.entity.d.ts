/**
 * This maintains a list of programs by the institution.
 * Columns are degree, title, owningDepartment, numberOfLevel, entryRequirements, etc.
 * This should guide admissions and programCourse setup
 */
import { AuditColumn } from "./AuditColumn.entity";
import { Department } from "./Department.entity";
import { Student } from "./Student.entity";
import { QualificationInView } from "../../settings";
import { ProgramCourseOffering } from "./ProgramCourseOffering.entity";
export declare class Program extends AuditColumn {
    code: string;
    title: string;
    description: string;
    qualificationInView: QualificationInView;
    noOfAcademicYears: number;
    durationInDays: number;
    expectedEntryQualification: string;
    department: Department;
    students: Promise<Student[]>;
    isActive: boolean;
    programCourseOfferings: Promise<ProgramCourseOffering[]>;
}
