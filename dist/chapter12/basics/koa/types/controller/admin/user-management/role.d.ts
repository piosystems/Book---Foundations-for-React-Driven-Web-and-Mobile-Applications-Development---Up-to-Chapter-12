import { BaseContext } from 'koa';
import { NextFunction } from '../../../type-definitions';
export default class RoleController {
    static getRoles: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static getRole: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static addRole: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static updateRole: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static deleteRole: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static addUserToRole: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static getRoleUsers: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
    static deleteUserFromRole: (ctx: BaseContext, _next: NextFunction) => Promise<void>;
}
