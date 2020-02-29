import { Repository } from "typeorm";
import { Grade } from "../entity/Grade.entity";
export declare class GradeRepository extends Repository<Grade> {
    insertGrades(grades: Grade[]): Promise<import("typeorm").InsertResult>;
    updateGrade(gradeId: number, editedGradeData: Grade): Promise<import("typeorm").UpdateResult>;
    deleteGrade(gradeId: number): Promise<import("typeorm").DeleteResult>;
    setCourseOfferingEnrollment(gradeId: number, courseOfferingEnrollmentId: number): Promise<void>;
    unsetCourseOfferingEnrollment(gradeId: number): Promise<void>;
    findByCourseOfferingEnrollmentId_InnerJoinAndSelect(courseOfferingEnrollmentId: number): Promise<Grade[]>;
    findByStudentId(studentId: number): Promise<Grade[]>;
}
