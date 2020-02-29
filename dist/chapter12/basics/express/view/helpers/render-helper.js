"use strict";
//We want to use nunjucks for rendering. Let's configure it here and then export it for use.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nunjucks_1 = __importDefault(require("nunjucks"));
const settings_1 = require("../../settings");
const path_1 = __importDefault(require("path"));
//Compose the base path.
//Since this render-helper.ts file is in express/view/helpers folder and not in express/ where the view folder is, we need to navigate out
//hence the ../../ in the basePath construction below.
//const basePath = `${__dirname}/../../${VIEWS_BASE_PATH?VIEWS_BASE_PATH:'view/templates'}/`;//defaults to ${__dirname}/../'view/templates' if VIEWS_BASE_PATH is not set
const basePath = path_1.default.join(__dirname, `/../../${settings_1.VIEWS_BASE_PATH ? settings_1.VIEWS_BASE_PATH : 'view/templates'}/`);
//create the renderEngine variable
const renderEngine = nunjucks_1.default.configure(basePath, {
    autoescape: true,
    watch: false // (default: false) reload templates when they are changed (server-side). To use watch, make sure optional dependency chokidar is installed.
    //see https://mozilla.github.io/nunjucks/api.html#configure for more options.
});
exports.default = renderEngine;
//# sourceMappingURL=render-helper.js.map