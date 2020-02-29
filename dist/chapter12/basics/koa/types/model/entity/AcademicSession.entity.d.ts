import { AuditColumn } from "./AuditColumn.entity";
import { CourseOffering } from "./CourseOffering.entity";
export declare class AcademicSession extends AuditColumn {
    title: string;
    startDate: Date;
    endDate: Date;
    notes: string;
    isCurrent: boolean;
    courseOfferings: Promise<CourseOffering[]>;
}
