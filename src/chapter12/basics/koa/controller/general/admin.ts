import {Context} from 'koa';
import {NextFunction} from '../../type-definitions';

const admin = async(ctx: Context, _next: NextFunction) => {
    ctx.body = "This is the admin page!";
}

export default admin;