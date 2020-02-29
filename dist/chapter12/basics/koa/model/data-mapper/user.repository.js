"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Here we shall prepare a number of custom data mappers for our entities
//This is done by extending the base repository
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../entity/User.entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertUsers(users) {
        return this.createQueryBuilder()
            .insert()
            .into(User_entity_1.User)
            .values(users)
            .execute();
    }
    //update using query builder. Also more efficient
    updateUser(userId, editedUserData) {
        return this.createQueryBuilder()
            .update(User_entity_1.User)
            .set(editedUserData)
            .where("id = :id", { id: userId })
            .execute();
    }
    deleteUser(userId) {
        return this.createQueryBuilder()
            .delete()
            .from(User_entity_1.User)
            .where("id = :id", { id: userId })
            .execute();
    }
    //I am using the Select QueryBuilder here (see https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md).
    //Info on insert, update and delete querybuilder and even joining relations, are also in that page
    //Note that QueryBuilder does not work yet with Mongo. For info on Mongo see src https://github.com/typeorm/typeorm/blob/555cd69f46ae68d4686ba4a8e07a8d77a1ee3aad/src/repository/MongoRepository.ts#L56-L55
    //and doc https://github.com/typeorm/typeorm/blob/master/docs/mongodb.md
    findByName(firstName, lastName) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }
    findByConfirmedPrimaryEmailAddress(primaryEmailAddress) {
        return this.createQueryBuilder("user")
            .where("user.primaryEmailAddress = :primaryEmailAddress", { primaryEmailAddress })
            .andWhere("user.isPrimaryEmailAddressVerified = :isPrimaryEmailAddressVerified", { isPrimaryEmailAddressVerified: true })
            .getOne();
    }
    findByResetPasswordToken(resetPasswordToken) {
        return this.createQueryBuilder("user")
            .where("user.resetPasswordToken = :resetPasswordToken", { resetPasswordToken })
            .getOne();
    }
    /*
    findByValidResetPasswordToken(resetPasswordToken: string) {
        return this.createQueryBuilder("user")
            .where("user.resetPasswordToken = :resetPasswordToken", { resetPasswordToken })
            .andWhere("user.resetPasswordExpiration < :now", {now: Date.now()})
            .getOne();
    }
    */
    //relational query builder is used below. See https://github.com/typeorm/typeorm/blob/master/docs/relational-query-builder.md
    //An example. In practice, I may not really need this. 
    addRole(userId, roleId) {
        return this.createQueryBuilder()
            .relation(User_entity_1.User, "roles")
            .of(userId)
            .add(roleId);
    }
    //Note: Adding and removing related entities works in many-to-many and one-to-many relations. For one-to-one and many-to-one relations use set instead:
    //Source: https://github.com/typeorm/typeorm/blob/master/docs/relational-query-builder.md
    removeRole(userId, roleId) {
        return this.createQueryBuilder()
            .relation(User_entity_1.User, "roles")
            .of(userId)
            .remove(roleId);
    }
    //finders
    //find users that have a given role. Return only the user objects that have the roleId
    findByRoleId(roleId) {
        return this.createQueryBuilder("user")
            .innerJoin("user.roles", "role") //Only get the users that have the roleId
            .where("role.id = :roleId", { roleId: roleId })
            .getMany();
    }
    //find user and return user object with roles embedded.
    findByUserId_leftJoinAndSelectRoles(userId) {
        return this.createQueryBuilder("user")
            .leftJoinAndSelect("user.roles", "role") //Get the users that have the userId and also get roles indicating null if none exists
            .where("user.id = :userId", { userId: userId })
            .getOne();
    }
    //how to save in a transaction. see https://github.com/typeorm/typeorm/blob/master/docs/transactions.md
    //imagine a situation in which you want user to be saved only if photo is also successfully saved
    //alternatively, used queryRunner style shown after this function
    async saveUserAndPhoto(user, photo) {
        await typeorm_1.getManager().transaction(async (transactionalEntityManager) => {
            try {
                await transactionalEntityManager.save(user);
                await transactionalEntityManager.save(photo);
            }
            catch (error) {
                //role back here
                //how? not clear
            }
        });
    }
    //how to save in a transaction. see https://github.com/typeorm/typeorm/blob/master/docs/transactions.md
    //imagine a situation in which you want user to be saved only if photo is also successfully saved
    async saveUserAndPhotoUsingQueryRunner(user, photo) {
        // get a connection and create a new query runner
        const connection = typeorm_1.getConnection();
        const queryRunner = connection.createQueryRunner();
        // lets now open a new transaction:
        await queryRunner.startTransaction();
        try {
            // execute some operations on this transaction:
            await queryRunner.manager.save(user);
            await queryRunner.manager.save(photo);
            // commit transaction now:
            await queryRunner.commitTransaction();
        }
        catch (err) {
            // since we have errors lets rollback changes we made
            await queryRunner.rollbackTransaction();
        }
        finally {
            // you need to release query runner which is manually created:
            await queryRunner.release();
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(User_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
