"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = async (req, res, _next) => {
    res.send(`Hello ${req.params.name}`); //expects a parameter named name
};
exports.flights = async (req, res, _next) => {
    res.send(`The data sent is ${JSON.stringify(req.params)}. Flights from ${req.params.from} to ${req.params.to}`);
};
exports.helloFormGet = async (req, res, _next) => {
    res.send(`The request get data sent is ${JSON.stringify(req.query)}. Hello ${req.query.firstName} ${req.query.surname}`);
};
exports.helloJsonPost = async (req, res, _next) => {
    res.send(`The request body json data is ${JSON.stringify(req.body)}. Hello ${req.body.firstName} ${req.body["surname"]}`);
};
exports.helloFormPost = async (req, res, _next) => {
    res.send(`The request body form data is ${JSON.stringify(req.body)}. Hello ${req.body.firstName} ${req.body["surname"]}`);
};
exports.helloFormPostWithFile = async (req, res, _next) => {
    res.send(`Parameter(s) include ${req.body.firstName}, ${req.body["surname"]} and file(s) include ${req.file.path}`);
};
//# sourceMappingURL=other-demos.js.map