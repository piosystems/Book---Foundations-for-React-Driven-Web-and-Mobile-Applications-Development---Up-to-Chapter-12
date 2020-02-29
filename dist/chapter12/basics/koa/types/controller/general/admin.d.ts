import { Context } from 'koa';
import { NextFunction } from '../../type-definitions';
declare const admin: (ctx: Context, _next: NextFunction) => Promise<void>;
export default admin;
