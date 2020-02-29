import { Request, Response, NextFunction } from 'express';
export declare const hello: (req: Request, res: Response, _next: NextFunction) => Promise<void>;
export declare const flights: (req: Request, res: Response, _next: NextFunction) => Promise<void>;
export declare const helloFormGet: (req: Request, res: Response, _next: NextFunction) => Promise<void>;
export declare const helloJsonPost: (req: Request, res: Response, _next: NextFunction) => Promise<void>;
export declare const helloFormPost: (req: Request, res: Response, _next: NextFunction) => Promise<void>;
export declare const helloFormPostWithFile: (req: Request, res: Response, _next: NextFunction) => Promise<void>;
