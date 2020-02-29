import { User } from "./User.entity";
import { AuditColumn } from "./AuditColumn.entity";
import { EmploymentStatus } from "../../settings";
import { CourseOffering } from "./CourseOffering.entity";
export declare class Teacher extends AuditColumn {
    employeeNumber: string;
    employmentStatus: EmploymentStatus;
    isActive: boolean;
    teacherProfile: {
        citation: string;
        personalSiteURL: string;
    };
    user: User;
    asPrimaryTeacher_CourseOfferings: Promise<CourseOffering[]>;
    asAdditionalTeacher_courseOfferings: Promise<CourseOffering[]>;
}
