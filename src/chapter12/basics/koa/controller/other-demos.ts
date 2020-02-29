import {Context} from 'koa';
import {NextFunction} from '../type-definitions';

export const hello = async(ctx: Context, _next: NextFunction) => {
    ctx.body = `Hello ${ctx.params.name}`;
}

export const flights = async(ctx: Context, _next: NextFunction) => {
    ctx.body = `The data sent is ${JSON.stringify(ctx.params)}. Flights from ${ctx.params.from} to ${ctx.params.to}`;
}

export const helloFormGet = async(ctx: Context, _next: NextFunction) => {
    ctx.body = `The request get data sent is ${JSON.stringify(ctx.query)}. Hello ${ctx.query.firstName} ${ctx.query.surname}`;
}

export const helloJsonPost = async(ctx: Context, _next: NextFunction) => {
    ctx.body = `The request get data sent is ${JSON.stringify(ctx.request.body)}. Hello ${ctx.request.body.firstName} ${ctx.request.body["surname"]}`;
}

export const helloArrayInJsonPost = async(ctx: Context, _next: NextFunction) => {
    const userArray: any[] = ctx.request.body.users
    userArray.map(user => {
        console.log(`Hello ${user.firstName} ${user.surname}`)
    })
    ctx.body = `The request get data sent is ${JSON.stringify(ctx.request.body)}.`;
}

export const helloFormPost = async(ctx: Context, _next: NextFunction) => {
    ctx.body = `The request body form data is ${JSON.stringify(ctx.request.body)}. Hello ${ctx.request.body.firstName} ${ctx.request.body["surname"]}`;
}

export const helloFormPostWithFile = async(ctx: Context, _next: NextFunction) => {
    ctx.body = await `Parameter(s) include ${ctx.request.body.firstName} and ${ctx.request.body["surname"]} and file uploaded include ${ctx.request.files!.myfile.path}.
    A second file uploaded is ${ctx.request.files!["myfile2"].path}`
}



