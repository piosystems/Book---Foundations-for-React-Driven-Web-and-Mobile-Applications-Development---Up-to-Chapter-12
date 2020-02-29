import { Repository } from "typeorm";
import { Role } from "../entity/Role.entity";
export declare class RoleRepository extends Repository<Role> {
    insertRoles(roles: Role[]): Promise<import("typeorm").InsertResult>;
    updateRole(roleId: number, editedRoleData: Role): Promise<import("typeorm").UpdateResult>;
    deleteRole(roleId: number): Promise<import("typeorm").DeleteResult>;
    findByName(name: string): Promise<Role | undefined>;
    addUser(roleId: number, userId: number): Promise<void>;
    removeUser(roleId: number, userId: number): Promise<void>;
    findByUserId(userId: number): Promise<Role[]>;
    findByRoleId_LeftJoinAndSelectUsers(roleId: number): Promise<Role | undefined>;
}
