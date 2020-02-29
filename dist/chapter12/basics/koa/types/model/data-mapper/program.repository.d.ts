import { Repository } from "typeorm";
import { Program } from "../entity/Program.entity";
export declare class ProgramRepository extends Repository<Program> {
    insertPrograms(programs: Program[]): Promise<import("typeorm").InsertResult>;
    updateProgram(programId: number, editedProgramData: Program): Promise<import("typeorm").UpdateResult>;
    deleteProgram(programId: number): Promise<import("typeorm").DeleteResult>;
    setDepartment(programId: number, departmentId: number): Promise<void>;
    unsetDepartment(programId: number): Promise<void>;
    addStudent(programId: number, studentId: number): Promise<void>;
    removeStudent(programId: number, studentId: number): Promise<void>;
    addProgramCourseOffering(programId: number, programCourseOfferingId: number): Promise<void>;
    removeProgramCourseOffering(programId: number, programCourseOfferingId: number): Promise<void>;
    findByCode(code: string): Promise<Program | undefined>;
    findByDepartmentId(departmentId: number): Promise<Program[]>;
    findByStudentId(studentId: number): Promise<Program | undefined>;
    findByProgramId_LeftJoinAndSelectStudents(programId: number): Promise<Program | undefined>;
}
