import {Request, Response, NextFunction} from 'express';

const admin = async(_req: Request, res: Response, _next: NextFunction) => {//The underscore is a way to prevent unused variable error flag by Typescript
    res.send("This is admin page!");
}

export default admin;