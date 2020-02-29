import { Request, Response, NextFunction } from 'express';
declare const home: (_req: Request, res: Response, _next: NextFunction) => Promise<void>;
export default home;
