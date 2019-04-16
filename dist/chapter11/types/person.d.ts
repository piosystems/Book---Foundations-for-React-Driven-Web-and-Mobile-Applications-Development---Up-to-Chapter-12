import { PersonData } from './type-definitions';
export default class Person {
    private _firstName;
    firstName: string;
    private _lastName;
    lastName: string;
    private _gender;
    gender: number;
    private _height;
    height: number;
    private _hobbies;
    hobbies: string[];
    private _birthday;
    birthday: Date;
    private _isAlive;
    isAlive: boolean;
    constructor(personData: PersonData);
    getFullName(): string;
    protected toTitleCase: (str: string) => string;
}
