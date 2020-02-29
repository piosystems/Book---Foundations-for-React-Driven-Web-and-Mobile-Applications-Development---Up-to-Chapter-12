import { Repository } from "typeorm";
import { CourseOffering } from "../entity/CourseOffering.entity";
export declare class CourseOfferingRepository extends Repository<CourseOffering> {
    insertCourseOfferings(courseOfferings: CourseOffering[]): Promise<import("typeorm").InsertResult>;
    updateCourseOffering(courseOfferingId: number, editedCourseOfferingData: CourseOffering): Promise<import("typeorm").UpdateResult>;
    deleteCourseOffering(courseOfferingId: number): Promise<import("typeorm").DeleteResult>;
    setAcademicSession(courseOfferingId: number, academicSessionId: number): Promise<void>;
    unsetAcademicSession(courseOfferingId: number): Promise<void>;
    setCourse(courseOfferingId: number, courseId: number): Promise<void>;
    unsetCourse(courseOfferingId: number): Promise<void>;
    setPrimaryTeacher(courseOfferingId: number, primaryTeacherId: number): Promise<void>;
    unsetPrimaryTeacher(courseOfferingId: number): Promise<void>;
    setPrimaryCourseAdmin(courseOfferingId: number, primaryCourseAdminId: number): Promise<void>;
    unsetPrimaryCourseAdmin(courseOfferingId: number): Promise<void>;
    setDepartmentHOD(courseOfferingId: number, departmentHODUserId: number): Promise<void>;
    unsetDepartmentHOD(courseOfferingId: number): Promise<void>;
    addAdditionalTeacher(courseOfferingId: number, additionalTeacherId: number): Promise<void>;
    removeAdditionalTeacher(courseOfferingId: number, additionalTeacherId: number): Promise<void>;
    addAdditionalCourseAdmin(courseOfferingId: number, additionalCourseAdminId: number): Promise<void>;
    removeAdditionalCourseAdmin(courseOfferingId: number, additionalCourseAdminId: number): Promise<void>;
    addCourseOfferingEnrollment(courseOfferingId: number, courseOfferingEnrollmentId: number): Promise<void>;
    removeCourseOfferingEnrollment(courseOfferingId: number, courseOfferingEnrollmentId: number): Promise<void>;
    addProgramCourseOffering(courseOfferingId: number, programCourseOfferingId: number): Promise<void>;
    removeProgramCourseOffering(courseOfferingId: number, programCourseOfferingId: number): Promise<void>;
    findByIsActiveAndAcademicSessionIdAndCourseId_LeftJoinAndSelectAcademicSessionAndCourse(isActive: boolean, academicSessionId: number, courseId: number): Promise<CourseOffering[]>;
    findByCourseOfferingId_LeftJoinAndSelectCourseOfferingEnrollments(courseOfferingId: number): Promise<CourseOffering | undefined>;
    findByCourseOfferingId_LeftJoinAndSelectProgramCourseOfferings(courseOfferingId: number): Promise<CourseOffering | undefined>;
}
