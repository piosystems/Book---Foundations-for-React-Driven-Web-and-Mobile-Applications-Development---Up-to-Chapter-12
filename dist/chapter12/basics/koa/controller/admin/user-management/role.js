"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Role_entity_1 = require("../../../model/entity/Role.entity");
const role_repository_1 = require("../../../model/data-mapper/role.repository");
const user_repository_1 = require("../../../model/data-mapper/user.repository");
const class_validator_1 = require("class-validator");
class RoleController {
}
//for API method GET and route /roles
RoleController.getRoles = async (ctx, _next) => {
    try {
        const roleRepository = typeorm_1.getRepository(Role_entity_1.Role);
        const roles = await roleRepository.find();
        if (roles.length == 0) {
            ctx.status = 204; //No content. The server successfully executed the method but returns no response body.
        }
        else {
            ctx.status = 200;
        }
        ctx.body = roles;
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//for API method GET and path /roles/:id 
RoleController.getRole = async (ctx, _next) => {
    try {
        const roleRepository = typeorm_1.getRepository(Role_entity_1.Role);
        const role = await roleRepository.findOne(ctx.params.id);
        if (role) {
            ctx.status = 200; //OK
            ctx.body = `${JSON.stringify({ "success": true, role })}`;
        }
        else {
            //role id sent is invalid
            ctx.status = 400; //Bad Request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "role not found", detail: "The role id sent cannot be found in the database" } })}`;
        }
    }
    catch (error) {
        ctx.status = 500; //Internal Server Error
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//for Method POST and path /roles should post a new role and return the details of the new role posted
RoleController.addRole = async (ctx, _next) => {
    try {
        const roleRepository = typeorm_1.getRepository(Role_entity_1.Role);
        const newRole = new Role_entity_1.Role();
        newRole.name = ctx.request.body.name;
        newRole.description = ctx.request.body.description;
        //Before saving, let us validate entries that need validation as specified in User.entity.ts
        const errors = await class_validator_1.validate(newRole, { skipMissingProperties: true });
        if (errors.length > 0) {
            ctx.status = 400; //Bad request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "validation error", detail: errors } })}`;
        }
        else if (await roleRepository.findOne({ name: newRole.name })) {
            //Role with the name already exists.
            ctx.status = 400; //Bad request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "Role with name already exists", detail: "Role with name already exists" } })}`;
        }
        else {
            //valid entries; save
            const role = await roleRepository.save(newRole);
            ctx.status = 201; //Created
            ctx.body = `${JSON.stringify({ "success": true, role })}`;
        }
    }
    catch (error) {
        ctx.status = 500; //Internal Server Error
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//Method PUT and path /roles/:id should edit the details of the role with id
RoleController.updateRole = async (ctx, _next) => {
    try {
        const roleRepository = typeorm_1.getRepository(Role_entity_1.Role);
        //Get the role to be updated
        const role = await roleRepository.findOne(ctx.params.id);
        if (role) {
            role.name = ctx.request.body.name;
            role.description = ctx.request.body.description;
            //Before saving, let us validate entries that need validation as specified in Role.entity.ts
            const errors = await class_validator_1.validate(role, { skipMissingProperties: true });
            if (errors.length > 0) {
                ctx.status = 400; //Bad request
                ctx.body = `${JSON.stringify({ "success": false, "error": { message: "Validation error", detail: errors } })}`;
            }
            else if (await roleRepository.findOne({ name: role.name })) {
                //The role with the name already exists.
                ctx.status = 400; //Bad request
                ctx.body = `${JSON.stringify({ "success": false, "error": { message: "Role with name address already exists", detail: "Role with name already exists" } })}`;
            }
            else {
                //valid entries; save
                const updatedRole = await roleRepository.save(role);
                ctx.status = 201; //Updated
                ctx.body = `${JSON.stringify({ "success": true, updatedRole })}`;
            }
        }
        else {
            //The role with the id does not exist.
            ctx.status = 400; //Bad request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "Role with the id does not exist", detail: "Role with the id does not exist" } })}`;
        }
    }
    catch (error) {
        ctx.status = 500; //Internal Server Error
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//Method DELETE and path /role/:id should delete the role with id 
RoleController.deleteRole = async (ctx, _next) => {
    try {
        const roleRepository = typeorm_1.getRepository(Role_entity_1.Role);
        const role = await roleRepository.findOne(ctx.params.id);
        if (!role) {
            ctx.status = 400; //Bad request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "Role with the id does not exist", detail: "Role with the id does not exist" } })}`;
        }
        else {
            await roleRepository.remove(role);
            ctx.status = 204;
            ctx.body = `${JSON.stringify({ "success": true })}`;
        }
    }
    catch (error) {
        ctx.status = 500; //Internal Server Error
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//Method PATCH and path /roles/:roleId/users/:userId
RoleController.addUserToRole = async (ctx, _next) => {
    try {
        //const roleRepository = getRepository(Role);
        const roleRepository = typeorm_1.getCustomRepository(role_repository_1.RoleRepository);
        let roleId = ctx.params.roleId; //this should come from request body
        const role = await roleRepository.findOne(roleId);
        const userRepository = typeorm_1.getCustomRepository(user_repository_1.UserRepository);
        let userId = ctx.params.userId; //this should come from request body
        const user = await userRepository.findOne(userId);
        if (role && user) {
            //first check to see if the user already has the role. If I set userId and roleId in join table as primary key, it should check this for me
            let userHasRole = false;
            userHasRole = user.roles.some(role => role.id == roleId); //Breaks out when true
            /*
            user.roles.map((role => {
                if (role.id == roleId){
                    userHasRole = true;
                    return;//leave loop as soon as condition is met.
                    }
                }))
                */
            if (userHasRole) {
                ctx.status = 400; //Bad request
                ctx.body = `${JSON.stringify({ "success": false, "error": 'The user already has this role' })}`;
            }
            else {
                //add the role to the user
                await userRepository.addRole(userId, roleId); //use this if using custom repository      
                ctx.status = 201; //created
                ctx.body = `${JSON.stringify({ "success": true, "user": await userRepository.findOne(userId) })}`; //send the updated user
            }
        }
        else {
            ctx.status = 400; //Bad request
            ctx.body = `${JSON.stringify({ "success": false, "error": 'The user or role does not exist' })}`;
        }
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message } })}`;
    }
};
//Method GET and path /roles/:id/user should get the users assigned a given role
//In the Role.entity.ts we specified a lazy relationship.
RoleController.getRoleUsers = async (ctx, _next) => {
    try {
        const roleRepository = typeorm_1.getRepository(Role_entity_1.Role);
        const role = await roleRepository.findOne(ctx.params.id);
        if (role) {
            const roleUsers = await role.users;
            ctx.status = 200; //OK
            ctx.body = `${JSON.stringify({ "success": true, "users": roleUsers })}`;
        }
        else {
            //user id sent is invalid
            ctx.status = 400; //Bad Request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "role not found", detail: "The role id sent cannot be found in the database" } })}`;
        }
    }
    catch (error) {
        ctx.status = 500; //Internal Server Error
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//Method PATCH and path /roles/:roleId/users/:userId should remove user with userId from role with roleId
RoleController.deleteUserFromRole = async (ctx, _next) => {
    try {
        const userRepository = typeorm_1.getCustomRepository(user_repository_1.UserRepository);
        const roleRepository = typeorm_1.getRepository(Role_entity_1.Role);
        const userId = ctx.params.userId;
        const roleId = ctx.params.roleId;
        const user = await userRepository.findOne(userId);
        const role = await roleRepository.findOne(roleId);
        if (user && role) {
            await userRepository.removeRole(userId, roleId);
            ctx.status = 201; //Successful execution. Return the current state of role
            ctx.body = `${JSON.stringify({ "success": true, role })}`;
        }
        else {
            ctx.status = 400; //Bad request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "user or role not found", detail: "The user or role id sent cannot be found in the database" } })}`;
        }
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message } })}`;
    }
};
exports.default = RoleController;
