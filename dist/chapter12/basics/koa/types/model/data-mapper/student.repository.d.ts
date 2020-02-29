import { Repository } from "typeorm";
import { Student } from "../entity/Student.entity";
export declare class StudentRepository extends Repository<Student> {
    insertStudents(students: Student[]): Promise<import("typeorm").InsertResult>;
    updateStudents(studentId: number, editedStudentData: Student): Promise<import("typeorm").UpdateResult>;
    deleteStudent(studentId: number): Promise<import("typeorm").DeleteResult>;
    setUser(studentId: number, userId: number): Promise<void>;
    unsetUser(studentId: number): Promise<void>;
    setProgram(studentId: number, programId: number): Promise<void>;
    unsetProgram(studentId: number): Promise<void>;
    addCourseOfferingEnrollments(studentId: number, courseOfferingEnrollmentId: number): Promise<void>;
    removeCourseOfferingEnrollments(studentId: number, courseOfferingEnrollmentId: number): Promise<void>;
    findByProgramId_LeftJoinAndSelectProgram(programId: number): Promise<Student[]>;
    findByStudentId_LeftJoinAndSelectUser(studentId: number): Promise<Student | undefined>;
    findByStudentId_LeftJoinAndSelectEnrollments(studentId: number): import("typeorm").SelectQueryBuilder<Student>;
    findByStudentId_LeftJoinAndSelect(studentId: number): Promise<Student | undefined>;
    findByUserId_LeftJoinAndSelectUser(userId: number): Promise<Student | undefined>;
    findStudentsWithNoUserIndentity(): Promise<Student[]>;
}
