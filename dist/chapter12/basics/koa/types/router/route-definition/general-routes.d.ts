/// <reference types="koa" />
declare const generalRoutes: {
    "method": "GET"[];
    "path": string;
    "middlewares": never[];
    "controller": (ctx: import("koa").Context, _next: import("../../type-definitions").NextFunction) => Promise<void>;
}[];
export default generalRoutes;
