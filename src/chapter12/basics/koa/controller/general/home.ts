import {Context} from 'koa';
import {NextFunction} from '../../type-definitions';
//import render from '../../view/helpers/render-helper';
import {renderEngine} from '../../view/helper/render-helper';


const home = async(ctx: Context, _next: NextFunction) => {
    //ctx.body = "Hello World! This is the home page";
    //below uses our nunjucks render engine
    //ctx.body = await render('home.html', {username: 'Pius'});//asynchronous call
    ctx.body = renderEngine.render('home.html', {username: 'Pius'}); //synchronous call
}

export default home;