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
const Department_entity_1 = require("../entity/Department.entity");
let DepartmentRepository = class DepartmentRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertDepartments(departments) {
        return this.createQueryBuilder()
            .insert()
            .into(Department_entity_1.Department)
            .values(departments)
            .execute();
    }
    //update using query builder. Also more efficient
    updateDepartment(departmentId, editedDepartmentData) {
        return this.createQueryBuilder()
            .update(Department_entity_1.Department)
            .set(editedDepartmentData)
            .where("id = :id", { id: departmentId })
            .execute();
    }
    deleteDepartment(departmentId) {
        return this.createQueryBuilder()
            .delete()
            .from(Department_entity_1.Department)
            .where("id = :id", { id: departmentId })
            .execute();
    }
    //finders
    findByName(name) {
        return this.createQueryBuilder("department")
            .where("department.name = :name", { name })
            .getOne(); //Name is set as unique
    }
    //Create datamappers for relations
    setCurrentHeadOfDepartment(departmentId, userId) {
        return this.createQueryBuilder()
            .relation(Department_entity_1.Department, "currentHeadOfDepartment")
            .of(departmentId)
            .set(userId); //Using set because it is a one-to-one relation
    }
    unsetCurrentHeadOfDepartment(departmentId) {
        return this.createQueryBuilder()
            .relation(Department_entity_1.Department, "currentHeadOfDepartment")
            .of(departmentId)
            .set(null); //Using set because it is a one-to-one relation
    }
    //Create datamappers for relations
    setCurrentSecretaryOfDepartment(departmentId, userId) {
        return this.createQueryBuilder()
            .relation(Department_entity_1.Department, "currentSecretaryOfDepartment")
            .of(departmentId)
            .set(userId); //Using set because it is a one-to-one relation
    }
    unsetCurrentSecretaryOfDepartment(departmentId) {
        return this.createQueryBuilder()
            .relation(Department_entity_1.Department, "currentSecretaryOfDepartment")
            .of(departmentId)
            .set(null); //Using set because it is a one-to-one relation
    }
    setSchool(departmentId, schoolId) {
        return this.createQueryBuilder()
            .relation(Department_entity_1.Department, "school")
            .of(departmentId)
            .set(schoolId); //Using set because it is a many-to-one relation
    }
    unsetSchool(departmentId) {
        return this.createQueryBuilder()
            .relation(Department_entity_1.Department, "school")
            .of(departmentId)
            .set(null); //Using set because it is a many-to-one relation
    }
    addCourse(departmentId, courseId) {
        return this.createQueryBuilder()
            .relation(Department_entity_1.Department, "courses")
            .of(departmentId)
            .add(courseId); //Using add because it is a one-to-many relation
    }
    removeCourse(departmentId, courseId) {
        return this.createQueryBuilder()
            .relation(Department_entity_1.Department, "courses")
            .of(departmentId)
            .remove(courseId); //Using add because it is a one-to-many relation
    }
    addProgram(departmentId, programId) {
        return this.createQueryBuilder()
            .relation(Department_entity_1.Department, "programs")
            .of(departmentId)
            .add(programId); //Using add because it is a one-to-many relation
    }
    removeProgram(departmentId, programId) {
        return this.createQueryBuilder()
            .relation(Department_entity_1.Department, "programs")
            .of(departmentId)
            .remove(programId); //Using add because it is a one-to-many relation
    }
    //More finders
    findByDepartmentId_LeftJoinAndSelectAllRelations(departmentId) {
        return this.createQueryBuilder("department")
            .leftJoinAndSelect("department.currentHeadOfDepartment", "currentHeadOfDepartment")
            .leftJoinAndSelect("department.currentSecretaryOfDepartment", "currentSecretaryOfDepartment")
            .leftJoinAndSelect("department.currentSecretaryOfDepartment", "currentSecretaryOfDepartment")
            .leftJoinAndSelect("department.school", "school")
            .leftJoinAndSelect("department.courses", "course")
            .leftJoinAndSelect("department.programs", "program")
            .where("department.id = :departmentId", { departmentId: departmentId })
            .getOne();
    }
    findByDepartmentId_LeftJoinAndSelectAllRelations_ExceptCoursesAndPrograms(departmentId) {
        return this.createQueryBuilder("department")
            .leftJoinAndSelect("department.currentHeadOfDepartment", "currentHeadOfDepartment")
            .leftJoinAndSelect("department.currentSecretaryOfDepartment", "currentSecretaryOfDepartment")
            .leftJoinAndSelect("department.currentSecretaryOfDepartment", "currentSecretaryOfDepartment")
            .leftJoinAndSelect("department.school", "school")
            .where("department.id = :departmentId", { departmentId: departmentId })
            .getOne();
    }
    findByDepartmentId_LeftJoinAndSelectPrograms(departmentId) {
        return this.createQueryBuilder("department")
            .leftJoinAndSelect("department.programs", "program")
            .where("department.id = :departmentId", { departmentId: departmentId })
            .getOne();
    }
    findByDepartmentId_LeftJoinAndSelectCourses(departmentId) {
        return this.createQueryBuilder("department")
            .leftJoinAndSelect("department.courses", "course")
            .where("department.id = :departmentId", { departmentId: departmentId })
            .getOne();
    }
};
DepartmentRepository = __decorate([
    typeorm_1.EntityRepository(Department_entity_1.Department)
], DepartmentRepository);
exports.DepartmentRepository = DepartmentRepository;
