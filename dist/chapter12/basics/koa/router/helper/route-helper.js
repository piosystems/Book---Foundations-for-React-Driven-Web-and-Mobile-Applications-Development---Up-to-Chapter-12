"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Prepare router options */
//If using koa-router-find-my-way, you can set options or let it use default values by passing empty object literal {}
//Let us prepare the some options to pass so we know the possibilities
exports.routerOpts = {
    "ignoreTrailingSlash": true,
    "caseSensitive": true,
    "maxParamLength": 1000,
    "allowUnsafeRegex": false,
    "defaultRoute": (ctx) => { ctx.body = `Cannot find the url ${ctx.url}`; } //A way to catch error 404 - page not found
};
/*Prepare upload options*/
const settings_1 = require("../../settings"); //good idea to have a settings module where we define application settings for our app
//As we plan to do file upload using formidable, we need to check to ensure that the upload path 
//chosen is accessible, otherwise there will be a system crash if formidable tries to access a non-existent upload directory.
//What is done here is for illustration. It is not advisable to do this test for every upload attempt. Better done at initial setup only
const fs_1 = __importDefault(require("fs"));
const validUploadDir = () => {
    let validUploadDir = false;
    try {
        fs_1.default.statSync(settings_1.UPLOAD_DIR);
        //if no failure, it means that the file or directory indicated exists.
        validUploadDir = true;
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            //file or directory does not exist;
            validUploadDir = false;
        }
    }
    return validUploadDir;
};
//formidable options for file upload. 
const formidableOptions = {
    /*
    Below is a way to set upload directory using uploadDir element. We want to be sure that the file path is valid.
    If not mark uploadDir as undefined. This will cause formidable to upload to default tmp directory on the system.
    Alternative way is to implement onFileBegin option within which a custom file.path can be specified, as done below.
    The onFileBegin option also gives room to implement more complex storage like streaming to cloud like S3.
    */
    //uploadDir: validUploadDir()?UPLOAD_DIR:undefined, //not using this
    keepExtensions: true,
    onFileBegin: (_name, file) => {
        //Below, check if the upload directory in setting is valid. If yes set the path of upload to it an append the name of the file
        //Alternatively, a random name is used to save the file if you don't explicitly set the file path.
        if (validUploadDir()) {
            file.path = `${settings_1.UPLOAD_DIR}/${new Date().valueOf()}.${file.name}`;
        } //if the upload directory is not valid, default value will be used which points to system tmp directory.
    },
    //For illustration, some other options include the following below. See https://github.com/felixge/node-formidable for more)
    maxFieldsSize: 20 * 1024 * 1024,
    maxFileSize: 200 * 1024 * 1024,
    maxFields: 1000,
    onError: (error, ctx) => {
        ctx.app.emit('error', error, ctx); //Emit an event named 'error' so that you can do a more fine-grained handling
    }
};
//Final options for file upload koa-body middleware which includes formidable options prepared above
exports.koaBodyOptionsWithfileUploadOptions = {
    "multipart": true,
    "formidable": formidableOptions,
    "onError": (error, ctx) => {
        ctx.app.emit('error', error, ctx); //Emit error to be caught my our centralized error handler in the index.js page
    }
};
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const PATCH = 'PATCH';
const DELETE = 'DELETE';
//let's unify them and export at once.
exports.httpMethod = {
    'GET': GET,
    'POST': POST,
    'PUT': PUT,
    'PATCH': PATCH,
    'DELETE': DELETE
};
