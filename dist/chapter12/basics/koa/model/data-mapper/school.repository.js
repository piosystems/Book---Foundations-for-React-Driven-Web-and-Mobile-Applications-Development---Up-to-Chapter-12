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
const School_entity_1 = require("../entity/School.entity");
let SchoolRepository = class SchoolRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertSchools(schools) {
        return this.createQueryBuilder()
            .insert()
            .into(School_entity_1.School)
            .values(schools)
            .execute();
    }
    //update using query builder. Also more efficient
    updateSchool(schoolId, editedSchoolData) {
        return this.createQueryBuilder()
            .update(School_entity_1.School)
            .set(editedSchoolData)
            .where("id = :id", { id: schoolId })
            .execute();
    }
    deleteSchool(schoolId) {
        return this.createQueryBuilder()
            .delete()
            .from(School_entity_1.School)
            .where("id = :id", { id: schoolId })
            .execute();
    }
    //finders
    findByName(name) {
        return this.createQueryBuilder("school")
            .where("school.name = :name", { name })
            .getOne(); //Name is set as unique
    }
    //Create datamappers for relations
    setCurrentDean(schoolId, userId) {
        return this.createQueryBuilder()
            .relation(School_entity_1.School, "currentDean")
            .of(schoolId)
            .set(userId); //Using set because it is a one-to-one relation
    }
    unsetCurrentDean(schoolId) {
        return this.createQueryBuilder()
            .relation(School_entity_1.School, "currentHeadOfDepartment")
            .of(schoolId)
            .set(null); //Using set because it is a one-to-one relation
    }
    setCurrentDeputyDean(schoolId, userId) {
        return this.createQueryBuilder()
            .relation(School_entity_1.School, "currentDeputyDean")
            .of(schoolId)
            .set(userId); //Using set because it is a one-to-one relation
    }
    unsetCurrentDeputyDean(schoolId) {
        return this.createQueryBuilder()
            .relation(School_entity_1.School, "currentDeputyDean")
            .of(schoolId)
            .set(null); //Using set because it is a one-to-one relation
    }
    setCurrentSecretaryOfSchool(schoolId, userId) {
        return this.createQueryBuilder()
            .relation(School_entity_1.School, "currentSecretaryOfSchool")
            .of(schoolId)
            .set(userId); //Using set because it is a one-to-one relation
    }
    unsetCurrentSecretaryOfSchool(schoolId) {
        return this.createQueryBuilder()
            .relation(School_entity_1.School, "currentSecretaryOfSchool")
            .of(schoolId)
            .set(null); //Using set because it is a one-to-one relation
    }
    addDepartment(schoolId, departmentId) {
        return this.createQueryBuilder()
            .relation(School_entity_1.School, "departments")
            .of(schoolId)
            .add(departmentId); //Using add because it is a one-to-many relation
    }
    removeDepartment(schoolId, departmentId) {
        return this.createQueryBuilder()
            .relation(School_entity_1.School, "departments")
            .of(schoolId)
            .remove(departmentId); //Using remove because it is a one-to-many relation
    }
    //More finders
    //Get school along with the departments
    findBySchoolId_LeftJoinAndSelectDepartments(schoolId) {
        return this.createQueryBuilder("school")
            .leftJoinAndSelect("school.departments", "department")
            .where("school.id = :schoolId", { schoolId: schoolId })
            .getOne();
    }
    //Get school along with all relations except departments
    findBySchoolId_LeftJoinAndSelectAllRelationsExceptDepartment(schoolId) {
        return this.createQueryBuilder("school")
            .leftJoinAndSelect("school.currentDean", "currentDean")
            .leftJoinAndSelect("school.currentDeputyDean", "currentDeputyDean")
            .leftJoinAndSelect("school.currentSecretaryOfSchool", "currentSecretaryOfSchool")
            .where("school.id = :schoolId", { schoolId: schoolId })
            .getOne();
    }
    //Get school along with all relations objects embedded
    findBySchoolId_LeftJoinAndSelectAllRelations(schoolId) {
        return this.createQueryBuilder("school")
            .leftJoinAndSelect("school.currentDean", "currentDean")
            .leftJoinAndSelect("school.currentDeputyDean", "currentDeputyDean")
            .leftJoinAndSelect("school.currentSecretaryOfSchool", "currentSecretaryOfSchool")
            .leftJoinAndSelect("school.departments", "department")
            .where("school.id = :schoolId", { schoolId: schoolId })
            .getOne();
    }
};
SchoolRepository = __decorate([
    typeorm_1.EntityRepository(School_entity_1.School)
], SchoolRepository);
exports.SchoolRepository = SchoolRepository;
