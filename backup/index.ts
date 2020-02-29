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

/*In this section, we will treat routing and error handling*/
import Koa from 'koa';
//let us import the types from @types/koa that we need
import {Context} from 'koa';
//As Koa types ships not with a type for next function, we can create one here
interface NextFunction{
  (err?:any): Promise<any> //This means that whenever we tag a variable type as NextFunction, that variable is expected to hold a function that returns a promise. The function can optionally receive an argument of any type which could typically be error type 
}

import koaRouter from 'koa-router-find-my-way'; //router middleware recommended by me.
//import koaRouter from 'koa-router'; //alternatively, use this router

//import body parser so that we can get post of json data and form data
//this requires npm install koa-body
/* import koaBody from 'koa-body'; */

const app: Koa = new Koa(); //Instantiate the Koa object.
const port: number = 3001; //Set port number. We have used a port number different from that of express so as to run both simultaneously during development.

/* Let us prepare the router */
//If using koa-router-find-my-way, you can set options or let it use default values by passing empty {}
//Let us set some options so we know the possibilities
const routerOpts: Object = {
  "ignoreTrailingSlash": true, //the default is false. If set to false a URL with a trailing / is considered different from a URL without a trailing /
  "caseSensitive": true, //the default is true
  "maxParamLength": 100, //the default is 100
  "allowUnsafeRegex": false, //the default is false
  "routes":[], //the default is []
  "defaultRoute": (ctx: Context)=>{ctx.body = `Cannot find the url ${ctx.url}`} //A way to catch error 404 - page not found
}

//router below is when koa-router-find-my-way is in use
const router: koaRouter.Instance = koaRouter(routerOpts);//Here we pass the options created above as an Object literal.
 
//router below is for when koa-router is in use instead of koa-router-find-my-way
//const router: koaRouter = new koaRouter();

//in Koa, error handler is the first in the middleware stack unlike the case of express where it is the last.
//It is characterized by a try{await next()}catch(error) statement
app.use(async(ctx: Context, next: NextFunction ) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500; //set error status to 500 if no error.status set in error object
    ctx.body = `Problem with site: ${error.message}`;
    ctx.app.emit('error', error, ctx); //Emit an event named 'error' so that you can do a more fine-grained handling
  }
});
//Below is not mandatory but useful for more centralized error handling.  This will be called whenever an event name 'error' is emitted.
app.on('error', async(_err: Error, _ctx: Context) => {//underscore here is a way to prevent Typescript from complaining if the variable is not in use
  /* Do some centralized error handling when there is an error event emitted
   * E.g. log to an erro log file
  */
});

//As we plan to do file upload using formidable, we need to check to ensure that the upload path 
//chosen is accessible otherwise there will be a system crash
//if formidable tries to access a non-existent upload directory.
/*
import fs from 'fs';
import {UPLOAD_DIR} from './settings';//good idea to have a settings module where we define application settings for our app
let validUploadDir: boolean = true;
try {
  fs.statSync(UPLOAD_DIR);
  //if no failure, it means that the file or directory indicated exists.
}
catch (error) {
  if (error.code === 'ENOENT') {
    //file or directory does not exist;
    validUploadDir = false;
  }
}
*/

//formidable options for file upload
/*
const formidableOptions: Object = {
  uploadDir: validUploadDir?UPLOAD_DIR:undefined, 
  keepExtensions: true, 
  onFileBegin: (name: any,file: any) => {
    file.path = `${name}`}
  }
  */

//import body parser so that we can get post of json data and form data
//this requires npm install body-parser
import koaBodyParser from 'koa-bodyparser';
const bodyParser = koaBodyParser({enableTypes: ['json', 'form', 'text']})
//declare the specific bodyparser for the type of content that will be handled by our router
//const jsonParser = bodyParser.json(); //for parsing body when the req type is application/json
//const urlencodedParser = bodyParser.urlencoded({ extended: false }); // for parsing body when the req type is application/x-www-form-urlencoded. Better to get used to extended = false because extended = true has been deprecated
//const textParser = bodyParser.text(); //for parsing body when the req type is html/text

//This requires npm install multer
import multer from 'koa-multer';

//declare multer with simple setting for destination below
//const upload = multer({ dest: 'uploads/' });
//Alternatively, for more fine-grained control of storage location, use multers diskStorage()
var storage = multer.diskStorage({
  destination: function (_req, _file, cb) {//Use this to specify location
    cb(null, 'uploads/')
  },
  filename: function (_req, file, cb) {//Use this to modify the filename, if desired
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage });
//for more information on multer, see https://expressjs.com/en/resources/middleware/multer.html

router
.get ("/", async(ctx: Context, _next: NextFunction) => {
  ctx.body = "Hello World!";
})
.get ("/register", async(ctx: Context, _next: NextFunction) => {
  ctx.body = "This is the register page!";
})
.post ("/process-registration", async(ctx: Context, _next: NextFunction) => {
  ctx.body = "This is about us!";
})
.get ("/about-us", async(ctx: Context, _next: NextFunction) => {
  ctx.body = "This is about us!";
})
.get ("/admin", async(ctx: Context, _next: NextFunction) => {
  ctx.body = "This is the admin page!";
})

//Next, let us define URL routes with parameters in the URL
.get ("/hello/:name",async(ctx: Context, _next: NextFunction) => {
  ctx.body = `Hello ${ctx.params.name}`;
})
//test above using http://localhost:3001/hello/Pius. The browser should display Hello Pius.

.get ("/flights/:from-:to", async(ctx: Context, _next: NextFunction) => {
  ctx.body = `The data sent is ${JSON.stringify(ctx.params)}. Flights from ${ctx.params.from} to ${ctx.params.to}`;
})
//test above using http://localhost:3001/flights/LAX-SFO. The browser should display 'The data sent is {"from":"LAX","to":"SFO"}. Flights from LAX to SFO'

//Get query parameters. Same as using get method in a form
.get("/hello-form-get", async(ctx: Context, _next: NextFunction) => {
  ctx.body = `The request get data sent is ${JSON.stringify(ctx.query)}. Hello ${ctx.query.firstName} ${ctx.query.surname}`;
})
//Test above using http://localhost:3001/hello-form-get?firstName=Pius&surname=Onobhayedo

//Next, let us work with json content-type sent in request
.post("/hello-json-post", bodyParser, async(ctx: Context, _next: NextFunction) => {
  ctx.body = `The request get data sent is ${JSON.stringify(ctx.request.body)}. Hello ${ctx.request.body["firstName"]} ${ctx.request.body["surname"]}`;
})
//test above with curl -d '{"firstName":"Pius", "surname":"Onobhayedo"}' -H "Content-Type: application/json" -X POST http://localhost:3001/hello-json-post

//next, let us work with form post without file upload
.post("/hello-form-post", bodyParser, async(ctx: Context, _next: NextFunction) => {
  ctx.body = `The request body form data is ${JSON.stringify(ctx.request.body)}. Hello ${ctx.request.body["firstName"]} ${ctx.request.body["surname"]}`;
})
//test above with curl -d "firstName=Pius&surname=Onobhayedo" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3001/hello-form-post

/*
Let us receive multipart/form-data - uploaded file(s) and form fields - using koaBody which uses formidable under the hood for file upload.
*/
/*
.post("/hello-form-post-with-file", 
koaBody({"multipart":true, "formidable":formidableOptions,"onError":(error,ctx)=>{
  ctx.app.emit('error', error, ctx);
}}), 
async(ctx: Context, _next: NextFunction) => {
    ctx.body = await `Parameter(s) include ${ctx.request.body["firstName"]} and ${ctx.request.body["surname"]} and file uploaded include ${ctx.request.files!["myfile"].path}.
    A second file uploaded is ${ctx.request.files!["myfile2"].path}`
})
//To test the above, use curl -F "firstName=Pius" -F "surname=Onobhayedo" -F "myfile=@data.txt" -F "myfile2=@data2.txt" -H "Content-Type: multipart/form-data" -X POST http://localhost:3001/hello-form-post-with-file
//To rename the file or to include codes that streams the file to another destination e.g. S3, implement the onFileBegin(). See 
*/
.post("/hello-form-post-with-file", bodyParser, upload.single('myfile'), async(ctx: Context, _next: NextFunction) => {
  ctx.body = await `Parameter(s) include ${ctx.request.body["firstName"]} and ${ctx.request.body["surname"]} 
  And file is ${ctx.req}.`
})
//To test the above, use curl -F "firstName=Pius" -F "surname=Onobhayedo" -F "myfile=@data.txt" -H "Content-Type: multipart/form-data" -X POST http://localhost:3000/hello-form-post-with-file


//Set root for not-found-error
//Below matches any method and any url. If router gets here, it means that the url entered was not found
//This is the equivalent of defaultRoute option passed to the router instance when using koa-router-find-my-way
.all("*", async(ctx: Context, _next: NextFunction) => { 
  ctx.body = `Cannot find the url ${ctx.url}`;
})
//You can alternatively catch not-found for specific request verbs so as to return more suitable responses.
//E.g. you may want to return a json response in the case of API endpoint e.g.
/*
.get ("*", async(ctx: Context, _next: NextFunction) => {
  ctx.body = {"error": 404, "message": `Resource for the url ${ctx.url} not found`}
})
*/

//After defining router, associate it with the app
app.use(router.routes()); //Use the routes defined

app.listen(port, () => console.log(`Example app listening on port ${port}!`));