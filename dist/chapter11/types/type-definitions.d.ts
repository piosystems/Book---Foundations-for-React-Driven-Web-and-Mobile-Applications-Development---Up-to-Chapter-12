export interface PersonData {
    firstName: string;
    lastName: string;
    gender: number;
    height?: any;
    hobbies: string[];
    birthday?: any;
    isAlive: boolean;
}
export declare enum ModeOfEntry {
    UTME = 1,
    DirectEntry = 2,
    Transfer = 3
}
export declare enum Gender {
    female = 1,
    male = 2
}
export interface StudentData {
    matriculationNumber: string;
    programOfStudy: string;
    department: string;
    yearOfEntry: Date;
    modeOfEntry?: any;
    nextOfKin?: any;
    emailAddress?: any;
    phoneNumber?: any;
}
