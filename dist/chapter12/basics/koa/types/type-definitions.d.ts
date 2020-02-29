import { HTTPMethod } from "find-my-way";
import { Middleware, ParameterizedContext } from "koa";
export interface NextFunction {
    (err?: Error): Promise<any>;
}
export interface Routes {
    method: HTTPMethod[];
    path: string;
    middlewares: Middleware<ParameterizedContext<{}, {}>>[];
    controller: any;
}
