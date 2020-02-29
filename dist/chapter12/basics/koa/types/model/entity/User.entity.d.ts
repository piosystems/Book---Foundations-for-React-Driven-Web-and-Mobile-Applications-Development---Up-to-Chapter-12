import { AuditColumn } from "./AuditColumn.entity";
import { Gender } from "../../settings";
import { Role } from "./Role.entity";
export declare class User extends AuditColumn {
    firstName: string;
    middleName: string;
    lastName: string;
    commonName: string;
    homeAddress: string;
    gender: Gender;
    dateOfBirth: Date;
    Nationality: string;
    stateOfOrigin: string;
    photo: string;
    isActive: boolean;
    primaryEmailAddress: string;
    isPrimaryEmailAddressVerified: boolean;
    passwordSalt: string;
    passwordHash: string;
    isPasswordChangeRequired: boolean;
    resetPasswordToken: string;
    resetPasswordExpiration: Date;
    primaryEmailVerificationToken: string;
    otpEnabled: boolean;
    otpSecret: string;
    roles: Role[];
}
