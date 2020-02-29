import { AuditColumn } from "./AuditColumn.entity";
import { User } from "./User.entity";
import { Course } from "./Course.entity";
import { Program } from "./Program.entity";
import { School } from "./School.entity";
export declare class Department extends AuditColumn {
    name: string;
    description: string;
    otherDepartmentalInfo: Object;
    currentHeadOfDepartment: User;
    currentSecretaryOfDepartment: User;
    school: School;
    courses: Promise<Course[]>;
    programs: Promise<Program[]>;
}
