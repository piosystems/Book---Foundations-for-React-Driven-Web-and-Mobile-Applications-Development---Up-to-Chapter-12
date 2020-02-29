"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koaRouter = require("koa-router-find-my-way"); //router middleware recommended by me.
const route_helper_1 = require("./helper/route-helper");
//import route definitions to combine
/*
import userRoutes from './route-definitions/user-routes';
import generalRoutes from './route-definitions/general-routes';
import demoRoutes from './route-definitions/demo-routes'
*/
//Alternatively, follow the combined route approach
const all_routes_1 = __importDefault(require("./route-definition/all-routes"));
//declare koaRouter
const router = koaRouter(route_helper_1.routerOpts); //Here we pass the options created as an Object literal.
//combine the routes defined
//const routes: Array<Object> = Array.prototype.concat(generalRoutes,userRoutes,demoRoutes);
//Alternatively, use the combined allRoutes
//loop through the combined routes and add each to the router
all_routes_1.default.map(route => {
    router.on(route.method, route.path, ...route.middlewares, route.controller);
});
//Finally, before exporting router for use in our app, let us add a route in last postion, that will thus trap not-found issues
//Below matches any method and any url. If router gets here, it means that the url entered was not found
//This is the equivalent of defaultRoute option passed to the router instance when using koa-router-find-my-way
router.all("*", async (ctx, _next) => {
    ctx.body = `Cannot find the url ${ctx.url}`;
});
//console.log(router.prettyPrint());
//if using Koa-router instead of Koa-router-find-my-way, we should have set up the nested router here
//following the instructions in the URL https://github.com/ZijianHe/koa-router.
exports.default = router;
