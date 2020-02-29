import { Context } from 'koa';
import { NextFunction } from '../../type-definitions';
declare const home: (ctx: Context, _next: NextFunction) => Promise<void>;
export default home;
