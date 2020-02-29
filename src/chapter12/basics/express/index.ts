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

/*In this section, we will treat routing and error handling*/
import express from "express";
//Below is an import of types from @types/express .
import {Express} from 'express';

import renderEngine from "./view/helpers/render-helper"; //Our configured nunjucks render engine

const app: Express = express();

//Associate the nunjucks render engine with express
renderEngine.express(app); //now we can call res.render('a-template-file.html')

const port: number = 3000;

//declare static directory where you will serve static files like img, css from
app.use(express.static(__dirname + '/static'));


import router from './router/router'; //import router defined in router.ts
app.use(router); //After importing defined router, associate it with the app


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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
