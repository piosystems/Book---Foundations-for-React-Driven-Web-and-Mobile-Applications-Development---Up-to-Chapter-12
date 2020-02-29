"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_entity_1 = require("../../model/entity/User.entity");
const settings_1 = require("../../settings");
const typeorm_1 = require("typeorm");
const Role_entity_1 = require("../../model/entity/Role.entity");
//import databaseConnection from '../helpers/typeorm-connection-helper';
const processRegistration = async (ctx, _next) => {
    //Just testing. Below should be passed as param
    let user = new User_entity_1.User();
    user.isActive = true;
    user.firstName = "Pius4";
    user.middleName = "Onome";
    user.lastName = "Onobhayedo";
    user.commonName = "piosystems";
    user.passwordHash = "";
    user.passwordSalt = "";
    user.photo = "";
    user.primaryEmailAddress = "piosystems@yahoo.co.uk";
    user.stateOfOrigin = "Edo";
    user.gender = settings_1.Gender.M;
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
    const roleRepository = typeorm_1.getRepository(Role_entity_1.Role);
    //I used the two line below to create roles
    //const newRole = roleRepository.create(role);
    //await roleRepository.save(newRole)
    const userRepository = typeorm_1.getRepository(User_entity_1.User);
    const newUser = userRepository.create(user);
    const studentRole = await roleRepository.find({ name: "student" });
    newUser.roles = studentRole;
    await userRepository.save(newUser);
    const oldUser = await userRepository.findOne({ id: 1 });
    const roles = await oldUser.roles;
    ctx.body = `${JSON.stringify(oldUser)} <br/> roles are ${JSON.stringify(roles)}`;
};
exports.default = processRegistration;
