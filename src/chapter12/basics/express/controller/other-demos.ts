import {Request, Response, NextFunction} from 'express';

export const hello = async(req: Request, res: Response, _next: NextFunction) => {
    res.send(`Hello ${req.params.name}`); //expects a parameter named name
}

export const flights = async(req: Request, res: Response, _next: NextFunction) => {
    res.send(`The data sent is ${JSON.stringify(req.params)}. Flights from ${req.params.from} to ${req.params.to}`);
}

export const helloFormGet = async(req: Request, res: Response, _next: NextFunction) => {
    res.send(`The request get data sent is ${JSON.stringify(req.query)}. Hello ${req.query.firstName} ${req.query.surname}`);
}

export const helloJsonPost = async(req: Request, res: Response, _next: NextFunction) => {
    res.send(`The request body json data is ${JSON.stringify(req.body)}. Hello ${req.body.firstName} ${req.body["surname"]}`);
}

export const helloFormPost = async(req: Request, res: Response, _next: NextFunction) => {
    res.send(`The request body form data is ${JSON.stringify(req.body)}. Hello ${req.body.firstName} ${req.body["surname"]}`);
}

export const helloFormPostWithFile = async (req: Request, res: Response, _next: NextFunction) => {
    res.send(`Parameter(s) include ${req.body.firstName}, ${req.body["surname"]} and file(s) include ${req.file.path}`)
}





