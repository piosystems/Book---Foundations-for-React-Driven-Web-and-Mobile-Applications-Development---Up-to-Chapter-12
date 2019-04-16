import { StudentData, PersonData } from './type-definitions';
import Person from './person';
export default class Student extends Person {
    private _matriculationNumber;
    matriculationNumber: string;
    private _programOfStudy;
    programOfStudy: string;
    private _department;
    department: string;
    private _yearOfEntry;
    yearOfEntry: Date;
    private _modeOfEntry;
    modeOfEntry: number;
    private _nextOfKin;
    nextOfKin: string;
    private _emailAddress;
    emailAddress: string;
    private _phoneNumber;
    phoneNumber: string;
    constructor(studentData: StudentData, personData: PersonData);
}
