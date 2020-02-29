"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import render from '../../view/helpers/render-helper';
const render_helper_1 = require("../../view/helper/render-helper");
const home = async (ctx, _next) => {
    //ctx.body = "Hello World! This is the home page";
    //below uses our nunjucks render engine
    //ctx.body = await render('home.html', {username: 'Pius'});//asynchronous call
    ctx.body = render_helper_1.renderEngine.render('home.html', { username: 'Pius' }); //synchronous call
};
exports.default = home;
