"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_helper_1 = require("../helper/route-helper");
const user_1 = __importDefault(require("../../controller/admin/user-management/user"));
const koaBody = require("koa-body");
//.post ("/v1/add-user", koaBody(), UserController.addUser) //koaBody() is in use here because of post
//.get ("/v1/users", UserController.getUsers)
//.get ("/v1/users/:id", UserController.getUser)
//.put ("/v1/users/:id", koaBody(), UserController.updateUser) //Also requires body, just like post
//.delete ("/v1/users/:id", UserController.deleteUser)
//.patch ("/v1/users/:userId/roles/:roleId", UserController.addRoleToUser)
//.get ("/v1/users/:id/roles", UserController.getUserRoles)
//.delete ("/v1/users/:userId/roles/:roleId", UserController.deleteRoleFromUser)
const userRoutes = [
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
exports.default = userRoutes;
