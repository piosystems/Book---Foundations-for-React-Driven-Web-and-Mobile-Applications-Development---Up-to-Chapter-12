import { Repository } from "typeorm";
import { CourseAdmin } from "../entity/CourseAdmin.entity";
export declare class CourseAdminRepository extends Repository<CourseAdmin> {
    insertCourseAdmin(courseAdmins: CourseAdmin[]): Promise<import("typeorm").InsertResult>;
    updateCourseAdmin(courseAdminId: number, editedCourseAdminData: CourseAdmin): Promise<import("typeorm").UpdateResult>;
    deleteCourseAdmin(courseAdminId: number): Promise<import("typeorm").DeleteResult>;
    setUser(courseAdminId: number, userId: number): Promise<void>;
    unsetUser(courseAdminId: number): Promise<void>;
    addCourseOfferingAsPrimaryCourseAdmin(courseAdminId: number, courseOfferingId: number): Promise<void>;
    removeCourseOfferingAsPrimaryCourseAdmin(courseAdminId: number, courseOfferingId: number): Promise<void>;
    addCourseOfferingAsAdditionalCourseAdmin(courseAdminId: number, courseOfferingId: number): Promise<void>;
    removeCourseOfferingAsAdditionalTeacher(courseAdminId: number, courseOfferingId: number): Promise<void>;
    findByCourseAdminId_LeftJoinAndSelect_AsPrimaryCourseAdmin_CourseOfferings(courseAdminId: number): Promise<CourseAdmin | undefined>;
    findByCourseAdminId_LeftJoinAndSelect_AsAdditionalCourseAdmin_CourseOfferings(courseAdminId: number): Promise<CourseAdmin | undefined>;
    findByCourseAdminId_LeftJoinAndSelectUser(courseAdminId: number): Promise<CourseAdmin | undefined>;
    findCourseAdminsWithNoUserIndentity(): Promise<CourseAdmin[]>;
    findByCourseAdminId_LeftJoinAndSelectAll(courseAdminId: number): Promise<CourseAdmin | undefined>;
}
