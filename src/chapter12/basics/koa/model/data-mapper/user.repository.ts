//Here we shall prepare a number of custom data mappers for our entities
//This is done by extending the base repository
import {EntityRepository, Repository, getManager, getConnection} from "typeorm";
import {User} from "../entity/User.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertUsers(users: User[]){//users is an array of objects
        return this.createQueryBuilder()
        .insert()
        .into(User)
        .values(users)
        .execute();
    }
    //update using query builder. Also more efficient
    updateUser(userId: number, editedUserData: User){
        return this.createQueryBuilder()
        .update(User)
        .set(editedUserData)
        .where("id = :id", { id: userId })
        .execute();
    }
    deleteUser(userId: number){
        return this.createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: userId })
        .execute();
    }

    //I am using the Select QueryBuilder here (see https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md).
    //Info on insert, update and delete querybuilder and even joining relations, are also in that page
    //Note that QueryBuilder does not work yet with Mongo. For info on Mongo see src https://github.com/typeorm/typeorm/blob/555cd69f46ae68d4686ba4a8e07a8d77a1ee3aad/src/repository/MongoRepository.ts#L56-L55
    //and doc https://github.com/typeorm/typeorm/blob/master/docs/mongodb.md
       
    findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }

    findByConfirmedPrimaryEmailAddress(primaryEmailAddress: string) {
        return this.createQueryBuilder("user")
            .where("user.primaryEmailAddress = :primaryEmailAddress", { primaryEmailAddress })
            .andWhere("user.isPrimaryEmailAddressVerified = :isPrimaryEmailAddressVerified", { isPrimaryEmailAddressVerified: true })
            .getOne();
    }

    findByResetPasswordToken(resetPasswordToken: string) {
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
    addRole(userId: number, roleId: number){
        return this.createQueryBuilder()
        .relation(User, "roles")
        .of(userId)
        .add(roleId)
    }

    //Note: Adding and removing related entities works in many-to-many and one-to-many relations. For one-to-one and many-to-one relations use set instead:
    //Source: https://github.com/typeorm/typeorm/blob/master/docs/relational-query-builder.md
    removeRole(userId: number, roleId: number){
        return this.createQueryBuilder()
        .relation(User, "roles")
        .of(userId)
        .remove(roleId)
    }

    //finders
    //find users that have a given role. Return only the user objects that have the roleId
    findByRoleId(roleId: number){
        return this.createQueryBuilder("user")
        .innerJoin("user.roles", "role")//Only get the users that have the roleId
        .where("role.id = :roleId", {roleId: roleId})
        .getMany();
    }

    //find user and return user object with roles embedded.
    findByUserId_leftJoinAndSelectRoles(userId: number){
        return this.createQueryBuilder("user")
        .leftJoinAndSelect("user.roles", "role")//Get the users that have the userId and also get roles indicating null if none exists
        .where("user.id = :userId", {userId: userId})
        .getOne()
    }


    //how to save in a transaction. see https://github.com/typeorm/typeorm/blob/master/docs/transactions.md
    //imagine a situation in which you want user to be saved only if photo is also successfully saved
    //alternatively, used queryRunner style shown after this function
    async saveUserAndPhoto(user: User, photo: any){
        
        await getManager().transaction(async transactionalEntityManager => {
            try{
                await transactionalEntityManager.save(user);
                await transactionalEntityManager.save(photo);
            }catch(error){
                //role back here
                //how? not clear
            }
        });
        
    }

    //how to save in a transaction. see https://github.com/typeorm/typeorm/blob/master/docs/transactions.md
    //imagine a situation in which you want user to be saved only if photo is also successfully saved
    async saveUserAndPhotoUsingQueryRunner(user: User, photo: any){

        // get a connection and create a new query runner
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        // lets now open a new transaction:
        await queryRunner.startTransaction();

        try {
            // execute some operations on this transaction:
            await queryRunner.manager.save(user);
            await queryRunner.manager.save(photo);
            
            // commit transaction now:
            await queryRunner.commitTransaction();
        } catch (err) {
            // since we have errors lets rollback changes we made
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release query runner which is manually created:
            await queryRunner.release();
        }
    }

}