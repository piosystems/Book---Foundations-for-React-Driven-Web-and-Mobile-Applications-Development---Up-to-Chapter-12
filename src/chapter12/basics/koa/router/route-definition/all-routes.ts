//If preferred for simplicity, you can define all routes here
import {httpMethod, koaBodyOptionsWithfileUploadOptions} from '../helper/route-helper';
import { hello, flights, helloFormGet, helloJsonPost, helloFormPost, helloFormPostWithFile, helloArrayInJsonPost } from '../../controller/other-demos';
import koaBody = require('koa-body');//Note that koa-body uses formidable under the hood for file uploads
import home from '../../controller/general/home';
import aboutUs from '../../controller/general/about-us';
import UserController from '../../controller/admin/user-management/user';
import { Routes } from '../../type-definitions';

const routes: Array<Routes> = 

[
    /*demo routes*/
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
    },
    /* General routes */
    {
        "method": [httpMethod.GET],
        "path" : '/',
        "middlewares" : [],
        "controller" : home
      },
      {
        "method": [httpMethod.GET],
        "path" : '/about-us',
        "middlewares" : [],
        "controller" : aboutUs
      },
      /* user routes*/
      {
        "method": [httpMethod.GET],
        "path" : '/v1/users',
        "middlewares" : [],
        "controller" : UserController.getUsers
      },
      {
        "method": [httpMethod.POST],
        "path" : '/v1/users',
        "middlewares" : [koaBody()],
        "controller" : UserController.addUsers
      },
      {
        "method": [httpMethod.POST],
        "path" : '/v1/user',
        "middlewares" : [koaBody()],
        "controller" : UserController.addUser
      },
      {
        "method": [httpMethod.GET],
        "path" : '/v1/users/:id',
        "middlewares" : [],
        "controller" : UserController.getUser
      },
      {
        "method": [httpMethod.PUT],
        "path" : '/v1/users/:id',
        "middlewares" : [koaBody()],
        "controller" : UserController.updateUser
      },
      {
        "method": [httpMethod.DELETE],
        "path" : '/v1/users/:id',
        "middlewares" : [],
        "controller" : UserController.deleteUser
      },
      {
        "method": [httpMethod.PATCH],
        "path" : '/v1/users/:userId/roles/:roleId',
        "middlewares" : [],
        "controller" : UserController.addRole
      },
      {
        "method": [httpMethod.PATCH],
        "path" : '/v1/users/:id/roles',
        "middlewares" : [],
        "controller" : UserController.getUserRoles
      },
      {
        "method": [httpMethod.DELETE],
        "path" : '/v1/users/:userId/roles/:roleId',
        "middlewares" : [],
        "controller" : UserController.removeRole
      },
      {
        "method": [httpMethod.PATCH,httpMethod.POST],//post is here because of use from a form
        "path": '/v1/users/forgot-password/',
        "middlewares":[koaBody()],
        "controller" : UserController.forgotPassword
      },
      {
        "method": [httpMethod.PATCH, httpMethod.GET, httpMethod.POST],//get is here because of use from a form
        "path": '/v1/users/reset-password/:token',
        "middlewares":[koaBody(koaBodyOptionsWithfileUploadOptions)],
        "controller" : UserController.resetPassword
      }
  ]
  
  export default routes;