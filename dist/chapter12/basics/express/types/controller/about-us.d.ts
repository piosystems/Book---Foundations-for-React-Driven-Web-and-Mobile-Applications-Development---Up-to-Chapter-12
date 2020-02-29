import { Request, Response, NextFunction } from 'express';
declare const aboutUs: (_req: Request, res: Response, _next: NextFunction) => Promise<void>;
export default aboutUs;
