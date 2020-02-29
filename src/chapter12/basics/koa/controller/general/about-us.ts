import {Context} from 'koa';
import {NextFunction} from '../../type-definitions';

const aboutUs = async(ctx: Context, _next: NextFunction) => {
    ctx.body = "This is about us!";
}

export default aboutUs;