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
const Role_entity_1 = require("../entity/Role.entity");
let RoleRepository = class RoleRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertRoles(roles) {
        return this.createQueryBuilder()
            .insert()
            .into(Role_entity_1.Role)
            .values(roles)
            .execute();
    }
    //update using query builder. Also more efficient
    updateRole(roleId, editedRoleData) {
        return this.createQueryBuilder()
            .update(Role_entity_1.Role)
            .set(editedRoleData)
            .where("id = :id", { id: roleId })
            .execute();
    }
    deleteRole(roleId) {
        return this.createQueryBuilder()
            .delete()
            .from(Role_entity_1.Role)
            .where("id = :id", { id: roleId })
            .execute();
    }
    findByName(name) {
        return this.createQueryBuilder("role")
            .where("role.name = :name", { name })
            .getOne(); //Name is set as unique
    }
    addUser(roleId, userId) {
        return this.createQueryBuilder()
            .relation(Role_entity_1.Role, "users")
            .of(roleId)
            .add(userId);
    }
    removeUser(roleId, userId) {
        return this.createQueryBuilder()
            .relation(Role_entity_1.Role, "users")
            .of(roleId)
            .remove(userId);
    }
    //finders
    //find roles that belong to a given user
    findByUserId(userId) {
        return this.createQueryBuilder("role")
            .innerJoin("role.users", "user")
            .where("user.id = :userId", { userId: userId })
            .getMany();
    }
    //find role and join users
    findByRoleId_LeftJoinAndSelectUsers(roleId) {
        return this.createQueryBuilder("role")
            .leftJoinAndSelect("role.users", "user")
            .where("role.id = :roleId", { roleId: roleId })
            .getOne();
    }
};
RoleRepository = __decorate([
    typeorm_1.EntityRepository(Role_entity_1.Role)
], RoleRepository);
exports.RoleRepository = RoleRepository;
