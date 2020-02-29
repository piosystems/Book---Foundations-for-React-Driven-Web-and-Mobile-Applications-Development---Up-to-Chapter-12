"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//If preferred for simplicity, you can define all routes here
const route_helper_1 = require("../helper/route-helper");
const other_demos_1 = require("../../controller/other-demos");
const koaBody = require("koa-body"); //Note that koa-body uses formidable under the hood for file uploads
const home_1 = __importDefault(require("../../controller/general/home"));
const about_us_1 = __importDefault(require("../../controller/general/about-us"));
const user_1 = __importDefault(require("../../controller/admin/user-management/user"));
const routes = [
    /*demo routes*/
    {
        "method": [route_helper_1.httpMethod.GET],
        "path": '/hello/:name',
        "middlewares": [],
        "controller": other_demos_1.hello
    },
    {
        "method": [route_helper_1.httpMethod.GET],
        "path": '/flights/:from-:to',
        "middlewares": [],
        "controller": other_demos_1.flights
    },
    {
        "method": [route_helper_1.httpMethod.GET],
        "path": '/hello-form-get',
        "middlewares": [],
        "controller": other_demos_1.helloFormGet
    },
    {
        "method": [route_helper_1.httpMethod.POST],
        "path": '/hello-json-post',
        "middlewares": [koaBody()],
        "controller": other_demos_1.helloJsonPost
    },
    {
        "method": [route_helper_1.httpMethod.POST],
        "path": '/hello-array-in-json-post',
        "middlewares": [koaBody()],
        "controller": other_demos_1.helloArrayInJsonPost
    },
    {
        "method": [route_helper_1.httpMethod.POST],
        "path": '/hello-form-post',
        "middlewares": [koaBody()],
        "controller": other_demos_1.helloFormPost
    },
    {
        //Let us receive multipart/form-data - uploaded file(s) and form fields - using koaBody which uses formidable under the hood for file upload.
        "method": [route_helper_1.httpMethod.POST],
        "path": '/hello-form-post-with-file',
        "middlewares": [koaBody(route_helper_1.koaBodyOptionsWithfileUploadOptions)],
        "controller": other_demos_1.helloFormPostWithFile
    },
    /* General routes */
    {
        "method": [route_helper_1.httpMethod.GET],
        "path": '/',
        "middlewares": [],
        "controller": home_1.default
    },
    {
        "method": [route_helper_1.httpMethod.GET],
        "path": '/about-us',
        "middlewares": [],
        "controller": about_us_1.default
    },
    /* user routes*/
    {
        "method": [route_helper_1.httpMethod.GET],
        "path": '/v1/users',
        "middlewares": [],
        "controller": user_1.default.getUsers
    },
    {
        "method": [route_helper_1.httpMethod.POST],
        "path": '/v1/users',
        "middlewares": [koaBody()],
        "controller": user_1.default.addUsers
    },
    {
        "method": [route_helper_1.httpMethod.POST],
        "path": '/v1/user',
        "middlewares": [koaBody()],
        "controller": user_1.default.addUser
    },
    {
        "method": [route_helper_1.httpMethod.GET],
        "path": '/v1/users/:id',
        "middlewares": [],
        "controller": user_1.default.getUser
    },
    {
        "method": [route_helper_1.httpMethod.PUT],
        "path": '/v1/users/:id',
        "middlewares": [koaBody()],
        "controller": user_1.default.updateUser
    },
    {
        "method": [route_helper_1.httpMethod.DELETE],
        "path": '/v1/users/:id',
        "middlewares": [],
        "controller": user_1.default.deleteUser
    },
    {
        "method": [route_helper_1.httpMethod.PATCH],
        "path": '/v1/users/:userId/roles/:roleId',
        "middlewares": [],
        "controller": user_1.default.addRole
    },
    {
        "method": [route_helper_1.httpMethod.PATCH],
        "path": '/v1/users/:id/roles',
        "middlewares": [],
        "controller": user_1.default.getUserRoles
    },
    {
        "method": [route_helper_1.httpMethod.DELETE],
        "path": '/v1/users/:userId/roles/:roleId',
        "middlewares": [],
        "controller": user_1.default.removeRole
    },
    {
        "method": [route_helper_1.httpMethod.PATCH, route_helper_1.httpMethod.POST],
        "path": '/v1/users/forgot-password/',
        "middlewares": [koaBody()],
        "controller": user_1.default.forgotPassword
    },
    {
        "method": [route_helper_1.httpMethod.PATCH, route_helper_1.httpMethod.GET, route_helper_1.httpMethod.POST],
        "path": '/v1/users/reset-password/:token',
        "middlewares": [koaBody(route_helper_1.koaBodyOptionsWithfileUploadOptions)],
        "controller": user_1.default.resetPassword
    }
];
exports.default = routes;
