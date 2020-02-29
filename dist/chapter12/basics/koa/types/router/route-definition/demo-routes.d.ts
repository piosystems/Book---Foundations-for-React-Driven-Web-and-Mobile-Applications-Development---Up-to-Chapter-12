/// <reference types="koa" />
/// <reference types="koa-compose" />
declare const demoRoutes: ({
    "method": "GET"[];
    "path": string;
    "middlewares": never[];
    "controller": (ctx: import("koa").Context, _next: import("../../type-definitions").NextFunction) => Promise<void>;
} | {
    "method": "POST"[];
    "path": string;
    "middlewares": import("koa-compose").Middleware<import("koa").ParameterizedContext<{}, {}>>[];
    "controller": (ctx: import("koa").Context, _next: import("../../type-definitions").NextFunction) => Promise<void>;
})[];
export default demoRoutes;
