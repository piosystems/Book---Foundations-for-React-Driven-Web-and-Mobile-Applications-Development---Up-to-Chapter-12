import express from 'express';
//Below is an import of types from @types/express .
import {Request, Response, NextFunction, Router} from 'express'
import {jsonParser, urlencodedParser, upload} from './helpers/router-helper';

//import our defined controllers
import home from '../controller/home';
import register from '../controller/register';
import processRegistration from '../controller/process-registration';
import aboutUs from '../controller/about-us';
import admin from '../controller/admin';
import { helloFormPostWithFile, helloFormPost, helloJsonPost, helloFormGet, flights, hello } from '../controller/other-demos';


/*setup routes*/
//declare the express router
const router: Router = express.Router();
//define each route for the router just declared...
router
.get ("/", home)
.get ("/register", register)
.post ("/process-registration", processRegistration)
.get ("/about-us", aboutUs)
.get ("/admin", admin)

//Next, let us define URL routes with parameters in the URL
.get ("/hello/:name", hello)
//test above with http://localhost:3000/hello/Pius. The browser should display 'Hello Pius'.

.get ("/flights/:from-:to", flights)
//test above with http://localhost:3000/flights/LAX-SFO. The browser should display Flights from LAX to SFO

//Get query parameters. Same as using get method in a form
.get("/hello-form-get", helloFormGet)
//Test above using http://localhost:3000/hello-form-get?firstName=Pius&surname=Onobhayedo

//Next, let us work with json content-type sent in request
.post("/hello-json-post", jsonParser, helloJsonPost)
//test above with curl -d '{"firstName":"Pius", "surname":"Onobhayedo"}' -H "Content-Type: application/json" -X POST http://localhost:3000/hello-json-post

//next, let us work with form post without file upload
.post("/hello-form-post", urlencodedParser, helloFormPost)
//test above with curl -d "firstName=Pius&surname=Onobhayedo" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/hello-form-post


//Let us receive multipart/form-data - uploaded file(s) and form fields - using multer. Here we use multer's upload.single which is for only one file upload. For multiple, see upload.array and upload.fields in the URL https://expressjs.com/en/resources/middleware/multer.html
.post("/hello-form-post-with-file", upload.single('myfile'), helloFormPostWithFile)
//To test the above, use curl -F "firstName=Pius" -F "surname=Onobhayedo" -F "myfile=@data.txt" -H "Content-Type: multipart/form-data" -X POST http://localhost:3000/hello-form-post-with-file

//Set route for Not-Found situation
.use( async(req: Request, res: Response, _next: NextFunction) => { //This matches any method and any URL subroute
    res.status(400).send(`Cannot find the url ${req.url}`)
})
//Set route for other errors. Not found is not considered an error strictly speaking.
.use( async(error: Error, _req: Request, res: Response, _next: NextFunction) => { //This matches any method and any URL subroute
    res.status(500).send(`Something is wrong!: ${error.message}`)
});

export default router;
