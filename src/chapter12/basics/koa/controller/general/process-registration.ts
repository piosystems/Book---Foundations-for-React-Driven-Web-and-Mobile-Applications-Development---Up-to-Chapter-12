import {Context} from 'koa';
import {NextFunction} from '../../type-definitions';
import { User } from '../../model/entity/User.entity';
import { Gender } from '../../settings';
import { getRepository } from 'typeorm';
import { Role } from '../../model/entity/Role.entity';
//import databaseConnection from '../helpers/typeorm-connection-helper';

const processRegistration = async(ctx: Context, _next: NextFunction) => {
    //Just testing. Below should be passed as param
    
    let user = new User();
    user.isActive = true;
    user.firstName = "Pius4";
    user.middleName = "Onome";
    user.lastName = "Onobhayedo";
    user.commonName = "piosystems"
    user.passwordHash = "";
    user.passwordSalt = "";
    user.photo = "";
    user.primaryEmailAddress = "piosystems@yahoo.co.uk";
    user.stateOfOrigin = "Edo";
    user.gender = Gender.M;
/*
    databaseConnection
    .then(async conn => {
         await conn.getRepository(User).save(user)
         .then((user) => {
            console.log(user)
            ctx.body = user
         }) //Returns a Promise<User>
         .catch((error)=>{
            //ctx.status = 500;
            ctx.body = error.message;
         })
    })
    .catch((error)=>{
        //ctx.status = 500;
        ctx.body = error.message;
    })
    */

   /*
   let role = new Role();
   role.name = "student";
   role.description = "Just any student";
   */

   const roleRepository = getRepository(Role);
   
   //I used the two line below to create roles
   //const newRole = roleRepository.create(role);
   //await roleRepository.save(newRole)

   const userRepository = getRepository(User);
   const newUser = userRepository.create(user);

   const studentRole = await roleRepository.find({name: "student"});

   newUser.roles = studentRole;

   await userRepository.save(newUser);

   const oldUser = await userRepository.findOne({id: 1})
   const roles = await oldUser!.roles

   ctx.body = `${JSON.stringify(oldUser)} <br/> roles are ${JSON.stringify(roles)}`;
}

export default processRegistration;