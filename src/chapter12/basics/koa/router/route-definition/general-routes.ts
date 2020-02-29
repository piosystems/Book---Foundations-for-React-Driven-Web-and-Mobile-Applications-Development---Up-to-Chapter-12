import {httpMethod} from '../helper/route-helper';
//import UserController from '../../controller/admin/user-management/user'
//import koaBody = require('koa-body');

import home from '../../controller/general/home';
//import register from '../../controller/general/register';
//import processRegistration from '../../controller/general/process-registration';
import aboutUs from '../../controller/general/about-us';
//import admin from '../../controller/general/admin';

/*
.get ("/", home)
.get ("/register", register)
.get ("/process-registration", processRegistration)
.get ("/about-us", aboutUs)
.get ("/admin", admin)
*/

const generalRoutes = 
[
  {
    "method": [httpMethod.GET],
    "path" : '/',
    "middlewares" : [],
    "controller" : home
  },
  {
    "method": [httpMethod.GET],
    "path" : '/about-us',
    "middlewares" : [],
    "controller" : aboutUs
  }
]

export default generalRoutes;
