import { Request, Response, NextFunction } from 'express';
declare const register: (_req: Request, res: Response, _next: NextFunction) => Promise<void>;
export default register;
