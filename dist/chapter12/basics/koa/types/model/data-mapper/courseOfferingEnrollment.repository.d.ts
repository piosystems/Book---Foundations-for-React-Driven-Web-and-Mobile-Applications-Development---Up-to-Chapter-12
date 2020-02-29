import { Repository } from "typeorm";
import { CourseOfferingEnrollment } from "../entity/CourseOfferingEnrollment.entity";
export declare class CourseOfferingEnrollmentRepository extends Repository<CourseOfferingEnrollment> {
    insertCourseOfferingEnrollments(courseOfferingEnrollments: CourseOfferingEnrollment[]): Promise<import("typeorm").InsertResult>;
    updateCourseOfferingEnrollment(courseOfferingEnrollmentId: number, editedCourseOfferingEnrollmentData: CourseOfferingEnrollment): Promise<import("typeorm").UpdateResult>;
    deleteCourseOfferingEnrollment(courseOfferingEnrollmentId: number): Promise<import("typeorm").DeleteResult>;
    setCourseOffering(courseOfferingEnrollmentId: number, courseOfferingId: number): Promise<void>;
    unsetCourseOffering(courseOfferingEnrollmentId: number): Promise<void>;
    setStudent(courseOfferingEnrollmentId: number, studentId: number): Promise<void>;
    unsetStudent(courseOfferingEnrollmentId: number): Promise<void>;
    addGrade(courseOfferingEnrollmentId: number, gradeId: number): Promise<void>;
    removeGrade(courseOfferingEnrollmentId: number, gradeId: number): Promise<void>;
    findByCourseOfferingId_LeftJoinAndSelectCourseOffering(courseOfferingId: number): Promise<CourseOfferingEnrollment[]>;
}
