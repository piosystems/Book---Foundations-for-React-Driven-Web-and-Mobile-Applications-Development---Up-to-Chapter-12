import { User } from "./User.entity";
import { AuditColumn } from "./AuditColumn.entity";
import { EmploymentStatus } from "../../settings";
import { CourseOffering } from "./CourseOffering.entity";
export declare class CourseAdmin extends AuditColumn {
    employeeNumber: string;
    employmentStatus: EmploymentStatus;
    isActive: boolean;
    courseAdminProfile: {
        citation: string;
        personalSiteURL: string;
    };
    user: User;
    asPrimaryCourseAdmin_CourseOfferings: Promise<CourseOffering[]>;
    asAdditionalCourseAdmin_CourseOfferings: Promise<CourseOffering[]>;
}
