"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home = async (_req, res, _next) => {
    //res.send("Hello World! This is the home page");
    //below uses our nunjucks render engine associated with our express app
    res.render('home.html', { username: 'Pius' });
};
exports.default = home;
//# sourceMappingURL=home.js.map