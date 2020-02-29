"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = async (ctx, _next) => {
    ctx.body = `Hello ${ctx.params.name}`;
};
exports.flights = async (ctx, _next) => {
    ctx.body = `The data sent is ${JSON.stringify(ctx.params)}. Flights from ${ctx.params.from} to ${ctx.params.to}`;
};
exports.helloFormGet = async (ctx, _next) => {
    ctx.body = `The request get data sent is ${JSON.stringify(ctx.query)}. Hello ${ctx.query.firstName} ${ctx.query.surname}`;
};
exports.helloJsonPost = async (ctx, _next) => {
    ctx.body = `The request get data sent is ${JSON.stringify(ctx.request.body)}. Hello ${ctx.request.body.firstName} ${ctx.request.body["surname"]}`;
};
exports.helloArrayInJsonPost = async (ctx, _next) => {
    const userArray = ctx.request.body.users;
    userArray.map(user => {
        console.log(`Hello ${user.firstName} ${user.surname}`);
    });
    ctx.body = `The request get data sent is ${JSON.stringify(ctx.request.body)}.`;
};
exports.helloFormPost = async (ctx, _next) => {
    ctx.body = `The request body form data is ${JSON.stringify(ctx.request.body)}. Hello ${ctx.request.body.firstName} ${ctx.request.body["surname"]}`;
};
exports.helloFormPostWithFile = async (ctx, _next) => {
    ctx.body = await `Parameter(s) include ${ctx.request.body.firstName} and ${ctx.request.body["surname"]} and file uploaded include ${ctx.request.files.myfile.path}.
    A second file uploaded is ${ctx.request.files["myfile2"].path}`;
};
