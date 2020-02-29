import {Context} from 'koa';
import {NextFunction} from '../../type-definitions';

const register = async(ctx: Context, _next: NextFunction) => {
    ctx.body = "This is the register page!";
}

export default register;