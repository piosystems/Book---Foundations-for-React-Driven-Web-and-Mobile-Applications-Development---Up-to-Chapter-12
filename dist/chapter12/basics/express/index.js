"use strict";
/*
//Bear bone helloworld with no URL route or http method specification
import express from "express"; //import express
//import the types that we need as well
import {Express, Request, Response} from "express"
const app: Express = express(); //Notice the use of imported 'Express' as type here.
const port: number = 3000; //port number for the http server to listen on

//catch request to any URL route and respond
app.use (( _req: Request, res: Response) => { //The use of underscore here is for Typescript type checking not to fail if the parameter is not used within the function.
    res.send("Hello World!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); //start the http server
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*In this section, we will treat routing and error handling*/
const express_1 = __importDefault(require("express"));
const render_helper_1 = __importDefault(require("./view/helpers/render-helper")); //Our configured nunjucks render engine
const app = express_1.default();
//Associate the nunjucks render engine with express
render_helper_1.default.express(app); //now we can call res.render('a-template-file.html')
const port = 3000;
//declare static directory where you will serve static files like img, css from
app.use(express_1.default.static(__dirname + '/static'));
const router_1 = __importDefault(require("./router/router")); //import router defined in router.ts
app.use(router_1.default); //After importing defined router, associate it with the app
/* We could have also written the above route middlewares as application-level middlewares as follows
app.get ("/", async(_req: Request, res: Response, _next: NextFunction) => {
    res.send("Hello World!");
});
app.get ("/register/",(_req: Request, res: Response, _next: NextFunction) => {
    res.send("This is the register page!");
    
});
app.post ("/process-registration/",(_req: Request, res: Response, _next: NextFunction) => {
    res.send("This is about us!");
});
app.get ("/about-us/",(_req: Request, res: Response, _next: NextFunction) => {
    res.send("This is about us!");
});
app.get ("/admin/",(_req: Request, res: Response, _next: NextFunction) => {
    res.send("This is the admin page!");
});

app.use((req: Request, res: Response, _next: NextFunction) => { //This matches any method and any URL subroute
    res.status(400).send(`Cannot find the url ${req.url}`)
});
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => { //This matches any method and any URL subroute
    res.status(500).send(`Something is wrong!: ${error.message}`)
});
*/
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=index.js.map