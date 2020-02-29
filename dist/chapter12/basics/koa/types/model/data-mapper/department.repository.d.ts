import { Repository } from "typeorm";
import { Department } from "../entity/Department.entity";
export declare class DepartmentRepository extends Repository<Department> {
    insertDepartments(departments: Department[]): Promise<import("typeorm").InsertResult>;
    updateDepartment(departmentId: number, editedDepartmentData: Department): Promise<import("typeorm").UpdateResult>;
    deleteDepartment(departmentId: number): Promise<import("typeorm").DeleteResult>;
    findByName(name: string): Promise<Department | undefined>;
    setCurrentHeadOfDepartment(departmentId: number, userId: number): Promise<void>;
    unsetCurrentHeadOfDepartment(departmentId: number): Promise<void>;
    setCurrentSecretaryOfDepartment(departmentId: number, userId: number): Promise<void>;
    unsetCurrentSecretaryOfDepartment(departmentId: number): Promise<void>;
    setSchool(departmentId: number, schoolId: number): Promise<void>;
    unsetSchool(departmentId: number): Promise<void>;
    addCourse(departmentId: number, courseId: number): Promise<void>;
    removeCourse(departmentId: number, courseId: number): Promise<void>;
    addProgram(departmentId: number, programId: number): Promise<void>;
    removeProgram(departmentId: number, programId: number): Promise<void>;
    findByDepartmentId_LeftJoinAndSelectAllRelations(departmentId: number): Promise<Department | undefined>;
    findByDepartmentId_LeftJoinAndSelectAllRelations_ExceptCoursesAndPrograms(departmentId: number): Promise<Department | undefined>;
    findByDepartmentId_LeftJoinAndSelectPrograms(departmentId: number): Promise<Department | undefined>;
    findByDepartmentId_LeftJoinAndSelectCourses(departmentId: number): Promise<Department | undefined>;
}
