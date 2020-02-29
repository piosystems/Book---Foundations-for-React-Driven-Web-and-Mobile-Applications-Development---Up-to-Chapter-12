import { Context } from 'koa';
import { NextFunction } from '../../type-definitions';
declare const register: (ctx: Context, _next: NextFunction) => Promise<void>;
export default register;
