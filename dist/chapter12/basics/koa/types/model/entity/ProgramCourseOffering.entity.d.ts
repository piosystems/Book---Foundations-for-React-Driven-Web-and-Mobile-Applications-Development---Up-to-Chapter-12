/**
 * Program Course Offerings is useful as a course enrollment guide for students in a give Program.
 * This is a kind of many-to-many relationship between Program and CourseOffering
 * Since it has additional fields, we need to implement it using many-to-one for ProgramCourse to Program
 * and another many-to-one for ProgramCourse to CourseOffering.
 * Both fields need to be set as primary key
 */
import { AuditColumn } from "./AuditColumn.entity";
import { Level, TERM_OR_SEMESTER } from "../../settings";
import { Program } from "./Program.entity";
import { CourseOffering } from "./CourseOffering.entity";
export declare class ProgramCourseOffering extends AuditColumn {
    program: Program;
    courseOffering: CourseOffering;
    level: Level;
    termOrSemester: TERM_OR_SEMESTER;
    isCompulsory: boolean;
    isRequired: boolean;
    isElective: boolean;
}
