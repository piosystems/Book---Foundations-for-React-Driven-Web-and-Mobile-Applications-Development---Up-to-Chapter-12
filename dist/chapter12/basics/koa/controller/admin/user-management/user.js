"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_entity_1 = require("../../../model/entity/User.entity");
const typeorm_1 = require("typeorm");
const user_repository_1 = require("../../../model/data-mapper/user.repository");
const Role_entity_1 = require("../../../model/entity/Role.entity");
const class_validator_1 = require("class-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = require("crypto");
const settings_1 = require("../../../settings");
const render_helper_1 = __importDefault(require("../../../view/helper/render-helper"));
//In order to use just one import for the controller methods, we will put all the methods in one class
//and declare the classes as static, so we don't even have to instantiate the class first.
class UserController {
}
//for API method GET and path /users. This should return all users. Boundary queries can also be specified
//See for boundary examples. We will lookout here for page and page_size. page=0 and page_size=10 means return 0 to 10
UserController.getUsers = async (ctx, _next) => {
    try {
        const userRepository = typeorm_1.getCustomRepository(user_repository_1.UserRepository);
        //It makes sense to habitually plan for restriction of number of records to return. Else it can be too large.
        //boundaries can be sent as parameters. Max can also be set using settings.
        const users = await userRepository.find();
        //For find options see https://github.com/typeorm/typeorm/blob/master/docs/find-options.md
        //If for example we want to restrict number returned to 10 starting from 5 to 10, we would do
        //const users: User[] = await userRepository.find({skip: 5, take: 10});//these values can be read from parameters
        //we can also choose to enable cache and sort by 
        //const users: User[] = await userRepository.find({skip: ctx.query.page, take: ctx.query.page_size, cache: true});
        if (users.length == 0) {
            ctx.status = 204; //No content. The server successfully executed the method but returns no response body.
        }
        else {
            ctx.status = 200;
        }
        ctx.body = users;
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//for API method GET and path /users/:id 
UserController.getUser = async (ctx, _next) => {
    try {
        const userRepository = typeorm_1.getRepository(User_entity_1.User);
        const user = await userRepository.findOne(ctx.params.id);
        if (user) {
            ctx.status = 200; //OK
            ctx.body = `${JSON.stringify({ "success": true, user })}`;
        }
        else {
            //user id sent is invalid
            ctx.status = 400; //Bad Request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "user not found", detail: "The user id sent cannot be found in the database" } })}`;
        }
    }
    catch (error) {
        ctx.status = 500; //Internal Server Error
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//for Method POST and path /users should post a new user and return the details of the new user posted
//expect user(s) in a json array item named users
UserController.addUsers = async (ctx, _next) => {
    try {
        const userRepository = typeorm_1.getCustomRepository(user_repository_1.UserRepository);
        //Get the json array of user objects from the post body
        const usersToInsert = ctx.request.body.users;
        //console.log(usersToInsert);
        const newUsers = []; //To hold the new user objects to insert
        const invalidUserEntries = []; //To hold the user entries and error messages that are invalid
        await Promise.all(//this leads to wait for all awaits called within the map (iterable)
        usersToInsert.map(async (userToInsert) => {
            const newUser = new User_entity_1.User();
            newUser.isActive = userToInsert.isActive; //notice that we are getting the parameters from request body
            newUser.firstName = userToInsert.firstName;
            newUser.middleName = userToInsert.middleName;
            newUser.lastName = userToInsert.lastName;
            newUser.commonName = userToInsert.commonName;
            //newUser.passwordHash = userToInsert.passwordHash;
            //newUser.passwordSalt = "";//No need to store salt separately since I am using bcrypt that stores the salt with the generated hash
            newUser.photo = userToInsert.photo;
            newUser.primaryEmailAddress = userToInsert.primaryEmailAddress; //unique is true in db
            newUser.stateOfOrigin = userToInsert.stateOfOrigin;
            newUser.gender = userToInsert.gender;
            //for test
            newUser.isPrimaryEmailAddressVerified = userToInsert.isPrimaryEmailAddressVerified;
            await bcrypt_1.default.hash(userToInsert.passwordHash, 10).then(hash => {
                newUser.passwordHash = hash;
                //console.log (hash);
            });
            //testing comparison
            await bcrypt_1.default.compare("test1", newUser.passwordHash).then(result => {
                console.log(result); //true or false
            });
            //Before adding to the newUsers array for saving, let us validate entries that need validation as specified in User.entity.ts
            const errors = await class_validator_1.validate(newUser, { skipMissingProperties: true });
            if (errors.length > 0) {
                invalidUserEntries.push({ user: newUser, message: "validation error", detail: errors });
            }
            else if (await userRepository.findOne({ primaryEmailAddress: newUser.primaryEmailAddress })) {
                //The user with the email already exists in the database.
                invalidUserEntries.push({ user: newUser, message: "email address in use", detail: "user with primary email address already exists in database" });
            }
            else if (newUsers.some(user => user.primaryEmailAddress === newUser.primaryEmailAddress)) {
                //You are repeating email address in this user insert batch request.
                invalidUserEntries.push({ user: newUser, message: "email address repetition", detail: "email address is already in use in this batch" });
            }
            else {
                newUsers.push(newUser);
            }
        })); //end of Promise.all. Continue with the rest of the code
        //console.log(`${invalidUserEntries.length} ${newUsers.length}`)
        if (invalidUserEntries.length < usersToInsert.length) { //At least some newUser data had no problems; Insert the non-problematic
            const users = await userRepository.insertUsers(newUsers);
            if (invalidUserEntries.length > 0) { //There were some problems
                ctx.status = 200; //OK but see the response for result
                ctx.body = `${JSON.stringify({ "success": users, "error": invalidUserEntries })}`;
            }
            else { //No problems at all
                ctx.status = 201; //Created
                ctx.body = `${JSON.stringify({ success: users })}`;
            }
        }
        else {
            ctx.status = 400; //Bad request. All request data were problematic
            ctx.body = `${JSON.stringify({ "success": false, "error": invalidUserEntries })}`;
        }
    }
    catch (error) {
        ctx.status = 500; //Internal Server Error
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//With the above, the addUser below (for single users) may not be necessary anymore.
//for Method POST and path /users should post a new user and return the details of the new user posted
UserController.addUser = async (ctx, _next) => {
    try {
        const userRepository = typeorm_1.getRepository(User_entity_1.User);
        const newUser = new User_entity_1.User();
        newUser.isActive = ctx.request.body.isActive; //notice that we are getting the parameters from request body
        newUser.firstName = ctx.request.body.firstName;
        newUser.middleName = ctx.request.body.middleName;
        newUser.lastName = ctx.request.body.lastName;
        newUser.commonName = ctx.request.body.commonName;
        //newUser.passwordHash = ctx.request.body.passwordHash;
        //newUser.passwordSalt = "";
        newUser.photo = ctx.request.body.photo;
        newUser.primaryEmailAddress = ctx.params.primaryEmailAddress; //unique is true in db
        newUser.stateOfOrigin = ctx.request.body.stateOfOrigin;
        newUser.gender = ctx.request.body.gender;
        await bcrypt_1.default.hash(ctx.request.body.passwordHash, 10).then((hash) => {
            newUser.passwordHash = hash;
            //console.log (hash);
        });
        //Before saving, let us validate entries that need validation as specified in User.entity.ts
        const errors = await class_validator_1.validate(newUser, { skipMissingProperties: true });
        if (errors.length > 0) {
            ctx.status = 400; //Bad request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "validation error", detail: errors } })}`;
        }
        else if (await userRepository.findOne({ primaryEmailAddress: newUser.primaryEmailAddress })) {
            //The user with the email already exists.
            ctx.status = 400; //Bad request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "user with primary email address already exists", detail: "user with primary email address already exists" } })}`;
        }
        else {
            //valid entries; save
            const user = await userRepository.save(newUser);
            ctx.status = 201; //Created
            ctx.body = `${JSON.stringify({ "success": true, user })}`;
        }
    }
    catch (error) {
        ctx.status = 500; //Internal Server Error
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//Method PUT and path /users/:id should edit the details of the user with id
UserController.updateUser = async (ctx, _next) => {
    try {
        const userRepository = typeorm_1.getRepository(User_entity_1.User);
        //Get the user to be updated
        const user = await userRepository.findOne(ctx.params.id);
        if (user) {
            user.isActive = ctx.request.body.isActive; //notice that we are getting the parameters from request body
            user.firstName = ctx.request.body.firstName;
            user.middleName = ctx.request.body.middleName;
            user.lastName = ctx.request.body.lastName;
            user.commonName = ctx.request.body.commonName;
            //user.passwordHash = ctx.request.body.passwordHash;//leave password intact
            //user.passwordSalt = "";
            user.photo = ctx.request.body.photo;
            user.primaryEmailAddress = ctx.params.primaryEmailAddress; //unique is true in db
            user.stateOfOrigin = ctx.request.body.stateOfOrigin;
            user.gender = ctx.request.body.gender;
            /* Leave password intact during update
            await bcrypt.hash(ctx.request.body.passwordHash,10).then((hash) => {
                user.passwordHash = hash
                //console.log (hash);
            })
            */
            //Before saving, let us validate entries that need validation as specified in User.entity.ts
            const errors = await class_validator_1.validate(user, { skipMissingProperties: true });
            if (errors.length > 0) {
                ctx.status = 400; //Bad request
                ctx.body = `${JSON.stringify({ "success": false, "error": { message: "Validation error", detail: errors } })}`;
            }
            else if (await userRepository.findOne({ primaryEmailAddress: user.primaryEmailAddress })) {
                //The user with the email already exists.
                ctx.status = 400; //Bad request
                ctx.body = `${JSON.stringify({ "success": false, "error": { message: "User with primary email address already exists", detail: "User with primary email address already exists" } })}`;
            }
            else {
                //valid entries; save
                const updatedUser = await userRepository.save(user);
                ctx.status = 201; //Created
                ctx.body = `${JSON.stringify({ "success": true, updatedUser })}`;
            }
        }
        else {
            //The user with the id does not exist. Depending on the case, you may opt for creating a new user or return error
            ctx.status = 400; //Bad request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "User with the id does not exist", detail: "User with the id does not exist" } })}`;
        }
    }
    catch (error) {
        ctx.status = 500; //Internal Server Error
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//Method DELETE and path /users/:id should delete the user with id 
UserController.deleteUser = async (ctx, _next) => {
    try {
        const userRepository = typeorm_1.getRepository(User_entity_1.User);
        const user = await userRepository.findOne(ctx.params.id);
        if (!user) {
            ctx.status = 400; //Bad request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "User with the id does not exist", detail: "User with the id does not exist" } })}`;
        }
        else {
            await userRepository.remove(user);
            ctx.status = 204;
            ctx.body = `${JSON.stringify({ "success": true })}`;
        }
    }
    catch (error) {
        ctx.status = 500; //Internal Server Error
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
/*
Methods below that involve relationship may be more efficient if done with Querybuilder
See https://github.com/typeorm/typeorm/blob/master/docs/relational-query-builder.md
For such, we will use data-mapper to define the functions to be called from here as part
of CustomRepository
*/
//Method PATCH and path /users/:userId/roles/:roleId should add a new role with id 1 to user with id 1
UserController.addRole = async (ctx, _next) => {
    try {
        //const userRepository = getRepository(User);
        const userRepository = typeorm_1.getCustomRepository(user_repository_1.UserRepository);
        const userId = ctx.params.userId;
        const user = await userRepository.findOne(userId);
        const roleRepository = typeorm_1.getRepository(Role_entity_1.Role); //no need to get custom repository here
        const roleId = ctx.params.roleId;
        const role = await roleRepository.findOne(roleId);
        if (user && role) {
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
                /*Below is a less efficient way. See https://github.com/typeorm/typeorm/blob/master/docs/relational-query-builder.md for reason for less efficiency
                userRoles.push(role);
                user!.roles = userRoles;
                await userRepository.save(user!);
                */
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
//Method GET and path /users/:id/roles should get the roles of the user with the given id
//As there is an eager relationship between User and Roles, this is not be necessary
//because roles array is carried along with user objects.
UserController.getUserRoles = async (ctx, _next) => {
    try {
        const userRepository = typeorm_1.getRepository(User_entity_1.User);
        const user = await userRepository.findOne(ctx.params.id);
        if (user) {
            const userRoles = user.roles;
            ctx.status = 200; //OK
            ctx.body = `${JSON.stringify({ "success": true, "roles": userRoles })}`;
        }
        else {
            //user id sent is invalid
            ctx.status = 400; //Bad Request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "user not found", detail: "The user id sent cannot be found in the database" } })}`;
        }
    }
    catch (error) {
        ctx.status = 500; //Internal Server Error
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message, detail: error.detail } })}`;
    }
};
//Method PATCH and path /users/:userId/roles/:rolesId should delete role with roleId from user with userId
UserController.removeRole = async (ctx, _next) => {
    try {
        //const userRepository = getRepository(User);
        const userRepository = typeorm_1.getCustomRepository(user_repository_1.UserRepository);
        const userId = ctx.params.userId;
        const roleId = ctx.params.roleId;
        const user = await userRepository.findOne(userId);
        if (user) {
            await userRepository.removeRole(userId, roleId);
            ctx.status = 201; //Successful execution. Return the current state of user
            ctx.body = `${JSON.stringify({ "success": true, user })}`;
        }
        else {
            ctx.status = 400; //Bad request
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "user not found", detail: "The user id sent cannot be found in the database" } })}`;
        }
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message } })}`;
    }
};
//Methods for password change request
//for URL /v1/forgot-password/
UserController.forgotPassword = async (ctx, _next) => {
    //generate a token to send by email
    //Node has a random bytes generator that can be used for generating a random token
    //See https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    try {
        //Check to see if email sent is available
        const userRepository = typeorm_1.getCustomRepository(user_repository_1.UserRepository);
        //const user = await userRepository.findOne({primaryEmailAddress: ctx.params.email});
        //instead of above, get user only if with confirmed email address.
        const email = ctx.request.body.email;
        const user = await userRepository.findByConfirmedPrimaryEmailAddress(email);
        if (user) {
            //generate the token
            await crypto_1.randomBytes(256, async (error, buf) => {
                if (error)
                    throw error; //strange. the catch part below will handle it
                const token = buf.toString('hex');
                console.log(token);
                //success. Continue with email of reset message with token
                user.resetPasswordToken = token;
                user.resetPasswordExpiration = new Date(Date.now() + settings_1.PASSWORD_RESET_EXPIRATION);
                //await userRepository.updateUser(user.id, user);
                //alternatively,
                await userRepository.save(user);
                //construct and send email using nodemailer 
                const url = `${ctx.protocol}://${ctx.host}/v1/users/reset-password/${token}`;
                const mailText = settings_1.ResetPasswordMailOptionSettings.textTemplate.replace('{url}', url);
                console.log(mailText);
                //mailOptions
                const mailOptions = {
                    to: user.primaryEmailAddress,
                    from: settings_1.ResetPasswordMailOptionSettings.from,
                    subject: settings_1.ResetPasswordMailOptionSettings.subject,
                    text: mailText,
                };
                //send mail
                await settings_1.smtpTransport.sendMail(mailOptions, async (error) => {
                    if (error)
                        throw error; //throw error that will be caught at the end?
                });
            });
            //console.log('message successfully sent')
            ctx.status = 200;
            ctx.body = `${JSON.stringify({ "success": true, "info": { message: `email sending to ${user.primaryEmailAddress} is in progress` } })}`;
        }
        else { //email address not found
            ctx.status = 400;
            ctx.body = `${JSON.stringify({ "success": false, "error": { message: "email address not found", detail: "The email address sent cannot be found in the database" } })}`;
        }
    }
    catch (error) {
        console.log('inside error 500');
        ctx.status = 500;
        ctx.body = `${JSON.stringify({ "success": false, "error": { message: error.message } })}`;
    }
};
//for the url /v1/users/reset-password/:token
UserController.resetPassword = async (ctx, _next) => {
    //check for the token sent in the url
    const token = ctx.params.token;
    const newPassword = ctx.request.body.password; //Available if password has already been sent
    const renderTemplate = 'admin/user-management/password-reset.html';
    const userRepository = typeorm_1.getCustomRepository(user_repository_1.UserRepository);
    try {
        const user = await userRepository.findByResetPasswordToken(token);
        if (user) {
            if (user.resetPasswordExpiration.valueOf() > Date.now()) {
                if (newPassword) {
                    //proceed with saving
                    //console.log('proceeding with saving');
                    ctx.status = 201;
                    ctx.body = `${JSON.stringify({ "notificationClass": "is-success", "notificationMessage": "New password successfully saved" })}`; //only send JSON when form has already been sent
                }
                else { //no newPassword yet, send form for entering new password
                    ctx.status = 201;
                    ctx.body = await render_helper_1.default(renderTemplate, { sendForm: true, token: token }); //send form with token for submit url
                }
            }
            else { //expired token
                ctx.status = 400;
                //ctx.body = `${JSON.stringify({"success": false, "error": {message: "invalid token", detail: "The token sent has expired"}})}`;
                ctx.body = await render_helper_1.default(renderTemplate, { success: false, error: { message: 'expired token', detail: "The token sent has expired" } });
            }
        }
        else { //user with the sent token not found
            ctx.status = 400;
            ctx.body = await render_helper_1.default(renderTemplate, { success: false, error: { message: "invalid token", detail: "No valid token was sent" } });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = UserController;
