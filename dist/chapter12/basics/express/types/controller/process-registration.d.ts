import { Request, Response, NextFunction } from 'express';
declare const processRegistration: (_req: Request, res: Response, _next: NextFunction) => Promise<void>;
export default processRegistration;
