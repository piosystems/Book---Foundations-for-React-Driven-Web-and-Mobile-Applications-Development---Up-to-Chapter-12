import { AuditColumn } from "./AuditColumn.entity";
import { Course } from "./Course.entity";
import { User } from "./User.entity";
import { Teacher } from "./Teacher.entity";
import { TERM_OR_SEMESTER } from '../../settings';
import { AcademicSession } from "./AcademicSession.entity";
import { CourseOfferingEnrollment } from "./CourseOfferingEnrollment.entity";
import { CourseAdmin } from "./CourseAdmin.entity";
import { ProgramCourseOffering } from "./ProgramCourseOffering.entity";
export declare class CourseOffering extends AuditColumn {
    academicSession: AcademicSession;
    term_or_semester: TERM_OR_SEMESTER;
    startDate: Date;
    endDate: Date;
    isTermOrSemesterIndependent: boolean;
    isActive: boolean;
    course: Course;
    primaryTeacher: Teacher;
    primaryCourseAdmin: CourseAdmin;
    additionalTeachers: Teacher[];
    additionalCourseAdmins: CourseAdmin[];
    departmentHOD: User;
    courseOfferingEnrollments: Promise<CourseOfferingEnrollment[]>;
    programCourseOfferings: Promise<ProgramCourseOffering[]>;
}
