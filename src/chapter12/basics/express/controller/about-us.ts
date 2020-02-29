import {Request, Response, NextFunction} from 'express';

const aboutUs = async(_req: Request, res: Response, _next: NextFunction) => {//The underscore is a way to prevent unused variable error flag by Typescript
    res.send("This is about us page!");
}

export default aboutUs;