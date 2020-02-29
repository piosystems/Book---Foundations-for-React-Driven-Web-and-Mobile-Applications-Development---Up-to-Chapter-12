import {httpMethod, koaBodyOptionsWithfileUploadOptions} from '../helper/route-helper';
import { hello, flights, helloFormGet, helloJsonPost, helloFormPost, helloFormPostWithFile, helloArrayInJsonPost } from '../../controller/other-demos';
import koaBody = require('koa-body');//Note that koa-body uses formidable under the hood for file uploads

/*
//Next, let us define URL routes with parameters in the URL
.get ("/hello/:name", hello)
//test above using http://localhost:3001/hello/Pius. The browser should display Hello Pius.

.get ("/flights/:from-:to", flights)
//test above using http://localhost:3001/flights/LAX-SFO. The browser should display 'The data sent is {"from":"LAX","to":"SFO"}. Flights from LAX to SFO'

//Get query parameters. Same as using get method in a form
.get("/hello-form-get", helloFormGet)
//Test above using http://localhost:3001/hello-form-get?firstName=Pius&surname=Onobhayedo

//Next, let us work with json content-type sent in request
.post("/hello-json-post", koaBody(), helloJsonPost)
//test above with curl -d '{"firstName":"Pius", "surname":"Onobhayedo"}' -H "Content-Type: application/json" -X POST http://localhost:3001/hello-json-post

//next, let us work with form post without file upload
.post("/hello-form-post", koaBody(), helloFormPost)
//test above with curl -d "firstName=Pius&surname=Onobhayedo" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3001/hello-form-post

//Let us receive multipart/form-data - uploaded file(s) and form fields - using koaBody which uses formidable under the hood for file upload.

.post("/hello-form-post-with-file", koaBody(fileUploadOptions), helloFormPostWithFile)
//To test the above, use curl -F "firstName=Pius" -F "surname=Onobhayedo" -F "myfile=@data.txt" -F "myfile2=@data2.txt" -H "Content-Type: multipart/form-data" -X POST http://localhost:3001/hello-form-post-with-file

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


const demoRoutes = 
[
  {
    "method": [httpMethod.GET],
    "path" : '/hello/:name', //URL route with parameter. Test using http://localhost:3001/hello/Pius. The browser should display Hello Pius.
    "middlewares" : [],
    "controller" : hello
  },
  {
    "method": [httpMethod.GET],
    "path" : '/flights/:from-:to',//Test using http://localhost:3001/flights/LAX-SFO. The browser should display 'The data sent is {"from":"LAX","to":"SFO"}. Flights from LAX to SFO'
    "middlewares" : [],
    "controller" : flights
  },
  {
    "method": [httpMethod.GET],
    "path" : '/hello-form-get',//Test using http://localhost:3001/hello-form-get?firstName=Pius&surname=Onobhayedo
    "middlewares" : [],
    "controller" : helloFormGet
  },
  {
    "method": [httpMethod.POST],
    "path" : '/hello-json-post',//Test using curl -d '{"firstName":"Pius", "surname":"Onobhayedo"}' -H "Content-Type: application/json" -X POST http://localhost:3001/hello-json-post
    "middlewares" : [koaBody()],
    "controller" : helloJsonPost
  },
  {
    "method": [httpMethod.POST],
    "path" : '/hello-array-in-json-post',//Test using curl -d '{"users": [{"firstName":"Pius", "surname":"Onobhayedo"},{"firstName":"Paul","surname":"Onobhayedo"}]}' -H "Content-Type: application/json" -X POST http://localhost:3001/hello-array-in-json-post
    "middlewares" : [koaBody()],
    "controller" : helloArrayInJsonPost
  },
  {
    "method": [httpMethod.POST],
    "path" : '/hello-form-post',//Test using curl -d "firstName=Pius&surname=Onobhayedo" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3001/hello-form-post
    "middlewares" : [koaBody()],
    "controller" : helloFormPost
  },
  {
    //Let us receive multipart/form-data - uploaded file(s) and form fields - using koaBody which uses formidable under the hood for file upload.
    "method": [httpMethod.POST],
    "path" : '/hello-form-post-with-file',//Test using curl -F "firstName=Pius" -F "surname=Onobhayedo" -F "myfile=@data.txt" -F "myfile2=@data2.txt" -H "Content-Type: multipart/form-data" -X POST http://localhost:3001/hello-form-post-with-file
    "middlewares" : [koaBody(koaBodyOptionsWithfileUploadOptions)],
    "controller" : helloFormPostWithFile
  }
]

export default demoRoutes;

//If using koa-router we will have to create a router for each set of routes and nest them in router-all-routes.ts
//See https://github.com/ZijianHe/koa-router for how to setup nested routers.
