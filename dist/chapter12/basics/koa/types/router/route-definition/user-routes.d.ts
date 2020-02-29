/// <reference types="koa" />
/// <reference types="koa-compose" />
declare const userRoutes: ({
    "method": "PUT"[];
    "path": string;
    "middlewares": import("koa-compose").Middleware<import("koa").ParameterizedContext<{}, {}>>[];
    "controller": (ctx: import("koa").BaseContext, _next: import("../../type-definitions").NextFunction) => Promise<void>;
} | {
    "method": "DELETE"[];
    "path": string;
    "middlewares": never[];
    "controller": (ctx: import("koa").BaseContext, _next: import("../../type-definitions").NextFunction) => Promise<void>;
} | {
    "method": ("GET" | "PATCH" | "POST")[];
    "path": string;
    "middlewares": import("koa-compose").Middleware<import("koa").ParameterizedContext<{}, {}>>[];
    "controller": (ctx: import("koa").BaseContext, _next: import("../../type-definitions").NextFunction) => Promise<void>;
})[];
export default userRoutes;
