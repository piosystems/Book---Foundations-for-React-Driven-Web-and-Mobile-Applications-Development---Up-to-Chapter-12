
import {httpMethod, koaBodyOptionsWithfileUploadOptions} from '../helper/route-helper';
import UserController from '../../controller/admin/user-management/user'
import koaBody = require('koa-body');


//.post ("/v1/add-user", koaBody(), UserController.addUser) //koaBody() is in use here because of post
//.get ("/v1/users", UserController.getUsers)
//.get ("/v1/users/:id", UserController.getUser)
//.put ("/v1/users/:id", koaBody(), UserController.updateUser) //Also requires body, just like post
//.delete ("/v1/users/:id", UserController.deleteUser)
//.patch ("/v1/users/:userId/roles/:roleId", UserController.addRoleToUser)
//.get ("/v1/users/:id/roles", UserController.getUserRoles)
//.delete ("/v1/users/:userId/roles/:roleId", UserController.deleteRoleFromUser)

const userRoutes = 
[
  {
    "method": [httpMethod.GET],
    "path" : '/v1/users',
    "middlewares" : [],
    "controller" : UserController.getUsers
  },
  {
    "method": [httpMethod.POST],
    "path" : '/v1/users',
    "middlewares" : [koaBody()],
    "controller" : UserController.addUsers
  },
  {
    "method": [httpMethod.POST],
    "path" : '/v1/user',
    "middlewares" : [koaBody()],
    "controller" : UserController.addUser
  },
  {
    "method": [httpMethod.GET],
    "path" : '/v1/users/:id',
    "middlewares" : [],
    "controller" : UserController.getUser
  },
  {
    "method": [httpMethod.PUT],
    "path" : '/v1/users/:id',
    "middlewares" : [koaBody()],
    "controller" : UserController.updateUser
  },
  {
    "method": [httpMethod.DELETE],
    "path" : '/v1/users/:id',
    "middlewares" : [],
    "controller" : UserController.deleteUser
  },
  {
    "method": [httpMethod.PATCH],
    "path" : '/v1/users/:userId/roles/:roleId',
    "middlewares" : [],
    "controller" : UserController.addRole
  },
  {
    "method": [httpMethod.PATCH],
    "path" : '/v1/users/:id/roles',
    "middlewares" : [],
    "controller" : UserController.getUserRoles
  },
  {
    "method": [httpMethod.DELETE],
    "path" : '/v1/users/:userId/roles/:roleId',
    "middlewares" : [],
    "controller" : UserController.removeRole
  },
  {
    "method": [httpMethod.PATCH,httpMethod.POST],//post is here because of use from a form
    "path": '/v1/users/forgot-password/',
    "middlewares":[koaBody()],
    "controller" : UserController.forgotPassword
  },
  {
    "method": [httpMethod.PATCH, httpMethod.GET, httpMethod.POST],//get is here because of use from a form
    "path": '/v1/users/reset-password/:token',
    "middlewares":[koaBody(koaBodyOptionsWithfileUploadOptions)],
    "controller" : UserController.resetPassword
  }
]

export default userRoutes;


