import { AuditColumn } from "./AuditColumn.entity";
import { User } from "./User.entity";
export declare class Role extends AuditColumn {
    name: string;
    description: string;
    users: Promise<User[]>;
}
