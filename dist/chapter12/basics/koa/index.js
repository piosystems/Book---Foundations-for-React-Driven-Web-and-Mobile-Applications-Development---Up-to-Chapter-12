"use strict";
/*
//bare bone helloworld world with no URL route or method specification
import Koa from 'koa';
//let us import the types that we need
import {Context} from 'koa';
const app:Koa = new Koa(); //declare app type as Koa. Instantiate Koa.
const port:number = 3001;//port number for the http server to listen on

//catch request to any URL route and respond
app.use((ctx:Context) => {
  ctx.body = 'Hello World!';
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); //start the http server
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*In this section, we will treat routing and error handling*/
const koa_1 = __importDefault(require("koa"));
exports.app = new koa_1.default(); //Instantiate the Koa object.
const port = 3001; //Set port number. We have used a port number different from that of express so as to run both simultaneously during development.
//import router from './router/router-end';
const router_1 = __importDefault(require("./router/router"));
//import staticServer from 'koa-static-server';
const koa_static_1 = __importDefault(require("koa-static"));
//import {STATIC_DIR} from './settings';
const connection_1 = __importDefault(require("./model/connection/connection"));
//We will start using app only if database connection is successful.
//To use the entities defined we only need from now on to getRepository() or even the base getConnection()
connection_1.default
    .then((_connection) => {
    //in Koa, error handler is the first in the middleware stack unlike the case of express where it is the last.
    //It is characterized by a try{await next()}catch(error) statement
    exports.app.use(async (ctx, next) => {
        try {
            await next();
        }
        catch (error) {
            ctx.status = error.status || 500; //set error status to 500 if no error.status set in error object
            ctx.body = `Problem with site: ${error.message}`;
            ctx.app.emit('error', error, ctx); //Emit an event named 'error' so that you can do a more fine-grained handling
        }
    });
    //Below is not mandatory but useful for more centralized error handling.  This will be called whenever an event name 'error' is emitted.
    exports.app.on('error', async (_err, _ctx) => {
        /* Do some centralized error handling when there is an error event emitted
        * E.g. log to an erro log file
        */
    });
    //Associate static directory with the app.
    //app.use(staticServer({rootDir: STATIC_DIR, rootPath: '/static'})); //static path
    exports.app.use(koa_static_1.default(__dirname + '/static'));
    //Associate router with the app
    exports.app.use(router_1.default.routes());
    //start the server
    exports.app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})
    .catch(console.error);
