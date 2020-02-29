/*
//bare bone helloworld world with no URL route or method specification 
import Koa from 'koa';
//let us import the types that we need
import {Context} from 'koa';
const app:Koa = new Koa(); //declare app type as Koa. Instantiate Koa.
const port:number = 3001;//port number for the http server to listen on

//catch request to any URL route and respond
app.use((ctx:Context) => {
  ctx.body = 'Hello World!';
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); //start the http server
*/

/*In this section, we will treat routing and error handling*/
import Koa from 'koa';
//let us import the types from @types/koa that we need
import {BaseContext} from 'koa';
//As Koa types ships not with a type for next function, we have created one
import {NextFunction} from './type-definitions';

export const app: Koa = new Koa(); //Instantiate the Koa object.
const port: number = 3001; //Set port number. We have used a port number different from that of express so as to run both simultaneously during development.

//import router from './router/router-end';

import router from './router/router';

//import staticServer from 'koa-static-server';

import koaStatic from 'koa-static';

//import {STATIC_DIR} from './settings';

import databaseConnection from './model/connection/connection';

//We will start using app only if database connection is successful.
//To use the entities defined we only need from now on to getRepository() or even the base getConnection()
databaseConnection
.then((_connection) => {//Only get the apps going if databaseConnection was successful. Also note that here, _connection passed could be used if necessary
  
  //in Koa, error handler is the first in the middleware stack unlike the case of express where it is the last.
  //It is characterized by a try{await next()}catch(error) statement
  app.use(async(ctx: BaseContext, next: NextFunction ) => {
    try {
      await next();
    } catch (error) {
      ctx.status = error.status || 500; //set error status to 500 if no error.status set in error object
      ctx.body = `Problem with site: ${error.message}`;
      ctx.app.emit('error', error, ctx); //Emit an event named 'error' so that you can do a more fine-grained handling
    }
  });
  //Below is not mandatory but useful for more centralized error handling.  This will be called whenever an event name 'error' is emitted.
  app.on('error', async(_err: Error, _ctx: BaseContext) => {//underscore here is a way to prevent Typescript from complaining if the variable is not in use
    /* Do some centralized error handling when there is an error event emitted
    * E.g. log to an erro log file
    */
  });
  
  //Associate static directory with the app.
  //app.use(staticServer({rootDir: STATIC_DIR, rootPath: '/static'})); //static path

  app.use(koaStatic(__dirname + '/static'))

  //Associate router with the app
  app.use(router.routes());

  //start the server
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  
})
.catch(console.error);






