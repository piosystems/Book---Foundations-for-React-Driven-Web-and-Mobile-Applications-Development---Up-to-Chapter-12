import { AuditColumn } from "./AuditColumn.entity";
import { User } from "./User.entity";
import { Department } from "./Department.entity";
export declare class School extends AuditColumn {
    name: string;
    description: string;
    otherSchoolInfo: Object;
    currentDean: User;
    currentDeputyDean: User;
    currentSecretaryOfSchool: User;
    departments: Promise<Department[]>;
}
