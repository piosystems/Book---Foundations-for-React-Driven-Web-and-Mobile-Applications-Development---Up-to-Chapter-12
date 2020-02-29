import { Repository } from "typeorm";
import { Teacher } from "../entity/Teacher.entity";
export declare class TeacherRepository extends Repository<Teacher> {
    insertTeachers(teachers: Teacher[]): Promise<import("typeorm").InsertResult>;
    updateTeacher(teacherId: number, editedTeacherData: Teacher): Promise<import("typeorm").UpdateResult>;
    deleteTeacher(teacherId: number): Promise<import("typeorm").DeleteResult>;
    setUser(teacherId: number, userId: number): Promise<void>;
    unsetUser(teacherId: number): Promise<void>;
    addCourseOfferingAsPrimaryTeacher(teacherId: number, courseOfferingId: number): Promise<void>;
    removeCourseOfferingAsPrimaryTeacher(teacherId: number, courseOfferingId: number): Promise<void>;
    addCourseOfferingAsAdditionalTeacher(teacherId: number, courseOfferingId: number): Promise<void>;
    removeCourseOfferingAsAdditionalTeacher(teacherId: number, courseOfferingId: number): Promise<void>;
    findByTeacherId_LeftJoinAndSelect_AsPrimaryTeacher_CourseOfferings(teacherId: number): Promise<Teacher | undefined>;
    findByTeacherId_LeftJoinAndSelect_AsAdditionalTeacher_CourseOfferings(teacherId: number): Promise<Teacher | undefined>;
    findByTeacherId_LeftJoinAndSelectUser(teacherId: number): Promise<Teacher | undefined>;
    findTeachersWithNoUserIndentity(): Promise<Teacher[]>;
    findByTeacherId_LeftJoinAndSelectAll(teacherId: number): Promise<Teacher | undefined>;
}
