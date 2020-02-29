import { AuditColumn } from "./AuditColumn.entity";
import { Department } from "./Department.entity";
import { CourseOffering } from "./CourseOffering.entity";
export declare class Course extends AuditColumn {
    code: string;
    title: string;
    description: string;
    creditUnits: number;
    recommendedPrerequiteCourses: number[];
    department: Department;
    courseOfferings: Promise<CourseOffering[]>;
}
