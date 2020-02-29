"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_helper_1 = require("../helper/route-helper");
//import UserController from '../../controller/admin/user-management/user'
//import koaBody = require('koa-body');
const home_1 = __importDefault(require("../../controller/general/home"));
//import register from '../../controller/general/register';
//import processRegistration from '../../controller/general/process-registration';
const about_us_1 = __importDefault(require("../../controller/general/about-us"));
//import admin from '../../controller/general/admin';
/*
.get ("/", home)
.get ("/register", register)
.get ("/process-registration", processRegistration)
.get ("/about-us", aboutUs)
.get ("/admin", admin)
*/
const generalRoutes = [
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
    }
];
exports.default = generalRoutes;
