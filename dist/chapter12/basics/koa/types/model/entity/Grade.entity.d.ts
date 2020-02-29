import { AuditColumn } from "./AuditColumn.entity";
import { CourseOfferingEnrollment } from "./CourseOfferingEnrollment.entity";
import { GradeCategory } from '../../settings';
export declare class Grade extends AuditColumn {
    score: {
        category: GradeCategory;
        score: number;
        maxScorable: number;
    };
    courseOfferingEnrollment: CourseOfferingEnrollment;
}
