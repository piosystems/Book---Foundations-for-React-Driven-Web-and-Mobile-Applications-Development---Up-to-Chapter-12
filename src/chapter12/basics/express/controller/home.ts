import {Request, Response, NextFunction} from 'express';

const home = async(_req: Request, res: Response, _next: NextFunction) => {//The underscore is a way to prevent unused variable error flag by Typescript
    //res.send("Hello World! This is the home page");
    //below uses our nunjucks render engine associated with our express app
    res.render('home.html', {username: 'Pius'});
}

export default home;