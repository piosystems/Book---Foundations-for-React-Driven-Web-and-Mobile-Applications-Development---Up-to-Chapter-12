"use strict";
//We want to use nunjucks for rendering. Let's configure it here and then export it for use.
//Alternatively, you can use koa-views (https://github.com/queckezz/koa-views) which uses consolidate.js under the hood. May be heavier
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nunjucks_1 = __importDefault(require("nunjucks"));
const settings_1 = require("../../settings");
const path_1 = __importDefault(require("path"));
//Compose the base path.
//Since this render-helper.ts file is in koa/view/helper folder and not in koa/ where the view folder is, we need to navigate out
//hence the ../../ in the basePath construction below.
//const basePath = `${__dirname}/../../${VIEWS_BASE_PATH?VIEWS_BASE_PATH:'view/templates'}/`;//defaults to ${__dirname}/'view/templates' if VIEWS_BASE_PATH is not set
const basePath = path_1.default.join(__dirname, `/../../${settings_1.VIEWS_BASE_PATH ? settings_1.VIEWS_BASE_PATH : 'view/template'}/`); //VIEWS_BASE_PATH defaults to 'view/templates'
//create the renderEngine variable
exports.renderEngine = nunjucks_1.default.configure(basePath, {
    autoescape: true,
    watch: false // (default: false) reload templates when they are changed (server-side). To use watch, make sure optional dependency chokidar is installed.
    //see https://mozilla.github.io/nunjucks/api.html#configure for more options.
});
//for Koa, we can use the exported renderEngine above in our code or 
//we can implement a render function that returns Promise as shown below.
//The latter will enable us call renderEngine.render in an asynchronous manner.
const render = (path, params = {}) => {
    return new Promise((resolve, reject) => {
        exports.renderEngine.render(path, params, (err, content) => {
            if (err)
                return reject(err);
            resolve(content);
        });
    });
};
exports.default = render;
