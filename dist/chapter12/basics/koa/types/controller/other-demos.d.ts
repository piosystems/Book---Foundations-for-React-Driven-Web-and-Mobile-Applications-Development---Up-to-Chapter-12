import { Context } from 'koa';
import { NextFunction } from '../type-definitions';
export declare const hello: (ctx: Context, _next: NextFunction) => Promise<void>;
export declare const flights: (ctx: Context, _next: NextFunction) => Promise<void>;
export declare const helloFormGet: (ctx: Context, _next: NextFunction) => Promise<void>;
export declare const helloJsonPost: (ctx: Context, _next: NextFunction) => Promise<void>;
export declare const helloArrayInJsonPost: (ctx: Context, _next: NextFunction) => Promise<void>;
export declare const helloFormPost: (ctx: Context, _next: NextFunction) => Promise<void>;
export declare const helloFormPostWithFile: (ctx: Context, _next: NextFunction) => Promise<void>;
