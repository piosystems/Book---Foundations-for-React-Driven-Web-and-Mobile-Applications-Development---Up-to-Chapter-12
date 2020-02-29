import { Repository } from "typeorm";
import { User } from "../entity/User.entity";
export declare class UserRepository extends Repository<User> {
    insertUsers(users: User[]): Promise<import("typeorm").InsertResult>;
    updateUser(userId: number, editedUserData: User): Promise<import("typeorm").UpdateResult>;
    deleteUser(userId: number): Promise<import("typeorm").DeleteResult>;
    findByName(firstName: string, lastName: string): Promise<User[]>;
    findByConfirmedPrimaryEmailAddress(primaryEmailAddress: string): Promise<User | undefined>;
    findByResetPasswordToken(resetPasswordToken: string): Promise<User | undefined>;
    addRole(userId: number, roleId: number): Promise<void>;
    removeRole(userId: number, roleId: number): Promise<void>;
    findByRoleId(roleId: number): Promise<User[]>;
    findByUserId_leftJoinAndSelectRoles(userId: number): Promise<User | undefined>;
    saveUserAndPhoto(user: User, photo: any): Promise<void>;
    saveUserAndPhotoUsingQueryRunner(user: User, photo: any): Promise<void>;
}
