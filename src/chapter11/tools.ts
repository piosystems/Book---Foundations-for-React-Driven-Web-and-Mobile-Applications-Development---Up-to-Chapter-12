
const log = (output: any):void => {
    document.getElementById("output")!.innerHTML = output;
}

export default log;
/* Below is wrong in TS. No types have been specified
export class Person{
    constructor(firstName, lastName, gender, height, hobbies, birthday, isAlive){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.height = height;
        this.hobbies = hobbies;
        this.birthday = birthday;
        this.isAlive = isAlive;
    }
};
*/
/* class Person without default values
export class Person{
    //declare property types
    firstName: string;
    lastName: string;
    gender: string;
    height: number;
    hobbies: string[];
    birthday: Date;
    isAlive: boolean;

    constructor(firstName: string, lastName: string, gender: string, height: number, 
        hobbies: string[], birthday: Date, isAlive: boolean){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.height = height;
        this.hobbies = hobbies;
        this.birthday = birthday;
        this.isAlive = isAlive;
    }
};
*/
//declare class with some default values passed to the constructor
/*
export class Person{
    //declare property types
    firstName: string;
    lastName: string;
    gender: string;
    height: number;
    hobbies: string[];
    birthday: Date;
    isAlive: boolean;

    constructor(firstName: string, lastName: string, gender: string, height: any = undefined, 
        hobbies: string[] = [], birthday: any = undefined, isAlive: boolean = true){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.height = height;
        this.hobbies = hobbies;
        this.birthday = birthday;
        this.isAlive = isAlive;
    }
};
*/


/*
//Pass PersonData to constructor
export class Person{
    //declare property types
    firstName: string;
    lastName: string;
    gender: number;
    height: number;
    hobbies: string[];
    birthday: Date;
    isAlive: boolean;

    constructor(personData: PersonData){
        this.firstName = personData.firstName;
        this.lastName = personData.lastName;
        this.gender = personData.gender;
        this.height = personData.height;
        this.hobbies = personData.hobbies;
        this.birthday = personData.birthday;
        this.isAlive = personData.isAlive;
    }

};
*/








