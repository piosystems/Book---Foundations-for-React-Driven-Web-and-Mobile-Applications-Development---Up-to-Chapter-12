import { Repository } from "typeorm";
import { School } from "../entity/School.entity";
export declare class SchoolRepository extends Repository<School> {
    insertSchools(schools: School[]): Promise<import("typeorm").InsertResult>;
    updateSchool(schoolId: number, editedSchoolData: School): Promise<import("typeorm").UpdateResult>;
    deleteSchool(schoolId: number): Promise<import("typeorm").DeleteResult>;
    findByName(name: string): Promise<School | undefined>;
    setCurrentDean(schoolId: number, userId: number): Promise<void>;
    unsetCurrentDean(schoolId: number): Promise<void>;
    setCurrentDeputyDean(schoolId: number, userId: number): Promise<void>;
    unsetCurrentDeputyDean(schoolId: number): Promise<void>;
    setCurrentSecretaryOfSchool(schoolId: number, userId: number): Promise<void>;
    unsetCurrentSecretaryOfSchool(schoolId: number): Promise<void>;
    addDepartment(schoolId: number, departmentId: number): Promise<void>;
    removeDepartment(schoolId: number, departmentId: number): Promise<void>;
    findBySchoolId_LeftJoinAndSelectDepartments(schoolId: number): Promise<School | undefined>;
    findBySchoolId_LeftJoinAndSelectAllRelationsExceptDepartment(schoolId: number): Promise<School | undefined>;
    findBySchoolId_LeftJoinAndSelectAllRelations(schoolId: number): Promise<School | undefined>;
}
