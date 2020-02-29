import log, {appName, dummyFunction, genericFunction, weatherTag, Person, CustomMath, User} from './tools';

/* ES5 string concat style
log("Welcome to Chapter 10! The application name is \'" + appName + "\'. There is a function that returns \'" + dummyFunction() + "\'.");
*/
//Template literal style
//Rewrite the log() statement above passing Template literal
log(`Welcome to Chapter 10! The application name is "${appName}". 
There is a function that returns "${dummyFunction()}".`)

//Output Tagged template
log(weatherTag`The temperature is ${25} degrees centigrade. The day is `);

//Output from a series of examples starting from destructuring
/*
log(genericFunction());
*/

//Default and Rest parameter example 2 - Pre-ES6 approach
/*
log(genericFunction(2,3)); //outputs 6
log(genericFunction(3)); //outputs 3
*/

//Default and Rest parameter example 2 - ES6 approach
/*
try{
    log(genericFunction(2,3,4)); //This will output 24 on the browser
}catch(error){
    log(error.message); //The error message "Illegal arguments counts. Arguments must be greater than 1" will be output in browser if less than two arguments are passed. This is just for illustration, don’t pass system error messages to client in this way.
}
*/

//Rest example 3 - combination with specific parameters
log(genericFunction(2,3,4,6,8,9,10.5,12));//Should output The (x,y) values are as follows: (4,11)(6,15)(8,19)(9,21)(10.5,24)(12,27)

//class declaration example 1
/*
const person1 = new Person("Pius", "Onobhayedo", "Male",1.7);
const person2 = new Person("Mary", "Joseph", "Female", undefined);
log(`Person 1 is ${person1.firstName} whose height is ${person1.height}. Person 2 is ${person2.firstName} whose height is ${person2.height}`);
*/

//Accessing object properties
const person1 = new Person("Pius", "Onobhayedo", "Male",1.7);
const person2 = new Person("Mary", "Joseph", "Female", undefined);
person1.firstName = "peter"; //here we have deliberately used lowercase for first letter
person2.firstName = "maria"; //here we have deliberately used lowercase for first letter
log(`Person 1 is ${person1.getFirstName()} whose height is ${person1.height}. Person 2 is ${person2.getFirstName()} whose height is ${person2.height}`); //using getFirstName() to get firstName.

//static class methods
log(CustomMath.sqrt(100));

//Inheritance
/*
const user1 = new User("myusername","mypassword","Pius","Onobhayedo","Male",undefined);
log(`The username of ${user1.firstName} is ${user1.username}`)
*/

//Promises for asynchronous programming. Example 1
/*
new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve("Timeout is over"); //send out a success feedback with data using resolve
        }, 1000) //set timeout for 1000ms i.e. 1second.
    }).then((data) => {
        log(`${data}`);//This should output "Timeout is over"
    }).catch((error) => {//This will only be reached it the asynchronous function returned a reject statement.
        log(`${error}`);
    });

//Let us still maintain the last log statement so that we can illustrate better how the asynchronous call that returns after the timeout does not stop the main execution thread.
const user1 = new User("myusername","mypassword","Pius","Onobhayedo","Male",undefined);
log(`The username of ${user1.firstName} is ${user1.username}`)
//Expected final display in browser: 'Timeout is over'
*/


//Promises for asynchronous programming. Example 2. Deliberate return of reject.
/*
new Promise((resolve, reject) => {
    setTimeout(()=>{
        reject("Timeout is over but I am upset. You should not have invoked a timeout in the first place. Hence I am sending a <em>reject</em> instead of a <em>resolve</em>!"); //send out a reject feedback
        }, 1000)
    }).then((data) => {
        log(`${data}`);//This should output "Timeout is over"
    }).catch((error) => {//This will only be reached it the asynchronous function returned a reject statement.
        log(`Error message received: ${error}`);
    })
//Let us still maintain the last log statement so that we can illustrate better how the asynchronous call that returns after the timeout does not stop the main execution thread.
const user1 = new User("myusername","mypassword","Pius","Onobhayedo","Male",undefined);
log(`The username of ${user1.firstName} is ${user1.username}`)
//Expected final display in browser 'Error message received: Timeout is over but I am upset. You should not have invoked a timeout in the first place. Hence I am sending a reject instead of a resolve!
*/

//new Promise as an expression
/*
const myPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve("Timeout is over"); //send out a success feedback with data using resolve
        }, 1000) //set timeout for 1000ms i.e. 1second.
    });

myPromise.then((data) => {
        log(`${data}`);//This should output "Timeout is over"
    });

myPromise.catch((error) => {//This will only be reached it the asynchronous function returned a reject statement.
        log(`${error}`);
    });
*/

//Promise where .then must be executed after .catch
/*
new Promise((resolve, reject) => {
    setTimeout(()=>{
        reject("Timeout is over but I am upset. You should not have invoked a timeout in the first place. Hence I am sending a <em>reject</em> instead of a <em>resolve</em>!"); //send out a reject feedback
        }, 1000)
    }).then((data) => {
        log(`${data}`);//This should output "Timeout is over"
    }).catch((error) => {//This will only be reached it the asynchronous function returned a reject statement.
        log(`Error message received: ${error}`);
    }).then(() =>{
        log(`This function is executed after success or failure is returned`)
    });
//Expected browser return: This function is executed after success or failure is returned
*/

//Calling Promise aware functions already defined by others
/*
const url = 'https://jsonplaceholder.typicode.com/users/1'; //Get data for a user with id 1
fetch(url)
    .then(response => response.json()) //convert data returned to json
    .then(data => log(`Data: Id = ${data.id}, Name = ${data.name}, Email = ${data.email}`)) //use the json data
    .catch(error => log(`Error: ${error}`));
//Expected browser output: Data: Id = 1, Name = Leanne Graham, Email = sincere@april.biz
*/

//Using Promise.all
/*
const fetch1 = fetch('https://jsonplaceholder.typicode.com/users/1').then(response => response.json())
const fetch2 = fetch('https://jsonplaceholder.typicode.com/users/2').then(response => response.json())
const fetch3 = fetch('https://jsonplaceholder.typicode.com/users/3').then(response => response.json())

Promise.all([fetch1,fetch2,fetch3])//get the data for the three calls in an array.
.then((data)=>{
    log(`User1 = ${data[0].name}; User2 = ${data[1].name}; User3 = ${data[2].name}`);//display data from array
})
//Expected output in browser: User1 = Leanne Graham; User2 = Ervin Howell; User3 = Clementine Bauch
*/

//Async/Await example 1
/*
//Define the function that will return new Promise that wraps the asynchronous call to setTimeout()
const promiseAwareTimeout = (milliseconds=1000) => { //The function expects milliseconds to be passed. If not passed, milliseconds parameter defaults to 1000
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(`Timeout of ${milliseconds} milliseconds is over`); //send out a success feedback with data using resolve
        }, milliseconds) //set timeout for passed milliseconds. Defaults to 1000
    });
}
//define a function that uses our Promise executor
const usePromiseAwareTimeout = async (milliseconds) => {
    log('About to call timeout')
    try{
        log(await promiseAwareTimeout(milliseconds));
    }catch(error){
        log(error);
    }
};
//call the async function.
usePromiseAwareTimeout(3000);
//Expected final browser output: Timeout of 3000 milliseconds is over
*/

//Async/await example 2
/*
const usersUrl = 'https://jsonplaceholder.typicode.com/users/';
const getUserById = async (userId) => { //user id parameter is expected
    let url = usersUrl + userId; //get the specific url for the user to fetch
    const response = await fetch(url); //make a call to the asynchronous fetch()
    const data = await response.json(); //make a call to the asynchronous conversion to json.
    log (data.name); //log the feedback.
}
getUserById(2); 
//Expected browser output: 'Ervin Howell'
*/

//Async/await example 3 - Return a promise
/*
const usersUrl = 'https://jsonplaceholder.typicode.com/users/';
const getUserById = async (userId) => {
    let url = usersUrl + userId;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
getUserById(2).then(data => {
    log(data.name);
});
*/

//Async/await example 4 - include try/catch
/*
const usersUrl = 'https://jsonplaceholder.typicode.com/users/';
const getUserById = async (userId) => {
    const url = usersUrl + userId;
    try{
        const response = await fetch(url);
        const data = await response.json();
        /*
        The if statement below is to ensure that errors like URL not found (ie Error 404) is caught.
        fetch() unfortunately does not send a Promise.reject() in such a case.
        So here, we are throwing exception if HTTP response status is 
        outside the OK range (the 2xx range are OK), so that it can be caught.
         */
        /*
        if (response.status >= 200 && response.status < 300){
            log(data.name); //do whatever you want with the data. You can even pass to other functions to do some work on it
        }else{
            throw Error(response.status);//make sure that the error is not ignored by the catch() statement below.
        }
        
    }catch(error){
        log(`Error: ${error}`);
    }
}

getUserById(2);
*/

//Async/await with Promise.all
/*
const usersUrl = 'https://jsonplaceholder.typicode.com/users/';
const getUserById = async (userId) => {
    let url = usersUrl + userId;
    try{
        const response = await fetch(url);
        const data = await response.json();
        
        //The if statement below is to ensure that errors like URL not found (ie Error 404) is caught.
        //fetch() unfortunately does not send a Promise.reject() in such a case.
        //So here, we are throwing exception if HTTP response status is 
        //outside the OK range (the 2xx range are OK), so that it can be caught.
         
        if (response.status >= 200 && response.status < 300){
            return data;
            //log(data.name); //do whatever you want with the data. You can even pass to other functions to do some work on it
        }else{
            throw Error(response.status);//make sure that the error is not ignored by the catch() statement below.
        }
        
    }catch(error){
        //log(`Error: ${error}`);//do whatever you want to deal with error
        return error;
    }
}

Promise.all([getUserById(0),getUserById(2),getUserById(3)]) //getUserById() is deliberately passed Id of 0 in the first case to provoke Error: 404.
.then((data) => {
    log(`User1 = ${data[0].name=='Error'?data[0]:data[0].name}; User2 = ${data[1].name}; User3 = ${data[2].name}`);//display data from array
})
//Expected browser output is User1 = Error: 404; User2 = Ervin Howell; User3 = Clementine Bauch
*/

//Generators - Example 1
/*
function* waitList(list){
    for(let person of list){
        yield person; //create yield point for each item on the list
    }
    //return; terminates a generator at any point. It does not have to be used at all. It can be used between yield statements if the developer wants the rest of the yield to be ignored.
}

const myWaitList = waitList(['Peter','Mary','John']); //call waitList

//Prepare the output.
const output = `The first yielded value is: ${myWaitList.next().value} <br/>
    Here is what is returned in the next call: ${myWaitList.next().value} <br/>
    Hopefully we still have room for a next call. Here is the return: ${myWaitList.next().value} <br/>
    What if we call again when there is no more value to yield. Here is what we get: ${myWaitList.next().value}`

log(output);
//Expected browser output is:
//The first yielded value is: Peter 
//Here is what is returned in the next call: Mary 
//Hopefully we still have room for a next call. Here is the return: John 
//What if we call again when there is no more value to yield. Here is what we get: undefined
*/

//Generators - example 2
function* waitList(list){
    for (let [index, value] of list.entries()){
        yield `Hi ${value}. You are number ${index + 1} on the list`
    }
    //return; terminates a generator at any point. It does not have to be used at all. It can be used between yield statements if the developer wants the rest of the yield to be ignored.
}

const myWaitList = waitList(['Peter','Mary','John']); //call waitList

//Prepare the output.
const output = `The first yielded value is: ${myWaitList.next().value} <br/>
    Here is what is returned in the next call: ${myWaitList.next().value} <br/>
    Hopefully we still have room for a next call. Here is the return: ${myWaitList.next().value} <br/>
    What if we call again when there is no more value to yield. Here is what we get: ${myWaitList.next().value}`

log(output);



