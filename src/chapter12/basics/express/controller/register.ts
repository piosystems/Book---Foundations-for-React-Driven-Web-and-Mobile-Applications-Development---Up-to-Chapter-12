import {Request, Response, NextFunction} from 'express';

const register = async(_req: Request, res: Response, _next: NextFunction) => {//The underscore is a way to prevent unused variable error flag by Typescript
    res.send("This is the register page!");
}

export default register;