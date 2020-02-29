import { BaseContext } from 'koa';
import { NextFunction } from '../../../type-definitions';
export default class UserController {
    static getUsers: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static getUser: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static addUsers: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static addUser: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static updateUser: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static deleteUser: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static addRole: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static getUserRoles: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static removeRole: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static forgotPassword: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static resetPassword: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
}
