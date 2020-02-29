import { Context } from 'koa';
import { NextFunction } from '../../type-definitions';
declare const processRegistration: (ctx: Context, _next: NextFunction) => Promise<void>;
export default processRegistration;
