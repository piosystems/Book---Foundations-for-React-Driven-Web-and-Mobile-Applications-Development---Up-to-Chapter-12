import { AuditColumn } from "./AuditColumn.entity";
import { Student } from "./Student.entity";
import { Grade } from "./Grade.entity";
import { CourseOffering } from "./CourseOffering.entity";
export declare class CourseOfferingEnrollment extends AuditColumn {
    courseOffering: CourseOffering;
    student: Student;
    gradingComplete: boolean;
    scoreBreakDown: Object;
    maxScorableBreakDown: Object;
    totalScore: {
        score: number;
        maxScorable: number;
    };
    grades: Grade[];
}
