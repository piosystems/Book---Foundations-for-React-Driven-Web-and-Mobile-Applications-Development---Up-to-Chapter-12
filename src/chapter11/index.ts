import log from './tools'
//import Person from './person';
import Student from './student';
import {PersonData, StudentData, Gender, ModeOfEntry} from './type-definitions'

//Accessing object properties
/*
let firstName = "Pius";
let lastName = "Onobhayedo";
let gender = "male";
let height = 1.7;
let hobbies = ['Tennis','Programming'];
let birthday = new Date(1900,4,5);
let isAlive = true;
*/


/*
let person1 = new Person(firstName, lastName, gender, height, 
    hobbies, birthday, isAlive)

let person2 = new Person("Mary","Joseph","female");
*/

/* PersonData with options.
let person1Data: PersonData = {
    firstName: "pius",
    lastName: "onobhayedo",
    gender: Gender.male,
    height: "1.5",
    hobbies: [],
    birthday: new Date(1900,10,10),
    isAlive: true
}

let person2Data: PersonData = {
    firstName: "Mary",
    lastName: "Joseph",
    gender: Gender.female,
    hobbies: ['Work','Pray','Play'],
    isAlive: true
}

let person1 = new Person(person1Data);
let person2 = new Person(person2Data);

log(`Person 1 is ${person1.height} whose height is ${person1.height} and birthday is ${person1.birthday.toLocaleDateString()}`);


log(`Person 1 is ${person1.getFullName()} whose height is ${person1.height} 
and birthday is ${person1.birthday.toLocaleDateString()} and hobbies are ${person1.hobbies.length==0?'not yet set':person1.hobbies}. <br/>
Person 2 is ${person2.getFullName()} whose height is ${person2.height} and hobbies are ${person2.hobbies.length==0?'not yet set':person2.hobbies}`);
*/

//Student registration
let student1PersonalData: PersonData = {
    firstName: "Mary",
    lastName: "Ota",
    gender: Gender.female,
    hobbies: ['Work','Pray','Play'],
    isAlive: true
}
let student1StudentData: StudentData = {
    department: "information science and media studies",
    matriculationNumber: "234234",
    modeOfEntry: ModeOfEntry.UTME,
    programOfStudy: "Information Science and Media Studies",
    yearOfEntry: new Date()
}

let student1 = new Student(student1StudentData, student1PersonalData)


log(`The Student 1 named ${student1.getFullName()} with matriculation number ${student1.matriculationNumber} <br/>
belongs to the department ${student1.department}. The height is ${student1.height}`);

//add height to student1

student1.height = 1.7;

log(`The Student 1 named ${student1.getFullName()} with matriculation number ${student1.matriculationNumber} <br/>
belongs to the department of ${student1.department}. The height is ${student1.height}`);






/*
export interface Props {
    x: number;
    y: number;
}
export class Value {
    private value = 10
    private props: Props = { x: 0, y: 0 };
    
    getValue(): number {
        return this.value;
    }
    
    setValue(value: number): void {
        this.value = value;
    }
    
    setProps(props: Props) {
        this.props = props;
    }
    
    getProps(): Props {
        return this.props;
    }
}

const value = new Value();
value.setValue(1000);
value.setProps({ x: 1000, y: 2000 });
log(`Value is ${value.getValue()} and Props are { x: ${value.getProps().x}, y: ${value.getProps().y}}`);
*/