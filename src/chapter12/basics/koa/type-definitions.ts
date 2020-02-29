import { HTTPMethod } from "find-my-way";
import { Middleware, ParameterizedContext } from "koa";

//As Koa types ships not with a type for next function, we can create one here
export interface NextFunction{
    (err?:Error): Promise<any> //This means that whenever we tag a variable type as NextFunction, that variable is expected to hold a function that returns a promise. The function can optionally receive an argument of any type which could typically be error type 
}

export interface Routes{
    method: HTTPMethod[],
    path : string,
    middlewares : Middleware<ParameterizedContext<{}, {}>>[],
    controller : any
}