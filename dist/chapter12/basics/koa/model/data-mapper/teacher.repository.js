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
const Teacher_entity_1 = require("../entity/Teacher.entity");
let TeacherRepository = class TeacherRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertTeachers(teachers) {
        return this.createQueryBuilder()
            .insert()
            .into(Teacher_entity_1.Teacher)
            .values(teachers)
            .execute();
    }
    //update using query builder. Also more efficient
    updateTeacher(teacherId, editedTeacherData) {
        return this.createQueryBuilder()
            .update(Teacher_entity_1.Teacher)
            .set(editedTeacherData)
            .where("id = :id", { id: teacherId })
            .execute();
    }
    deleteTeacher(teacherId) {
        return this.createQueryBuilder()
            .delete()
            .from(Teacher_entity_1.Teacher)
            .where("id = :id", { id: teacherId })
            .execute();
    }
    //functions to set/unset add/remove relations values
    setUser(teacherId, userId) {
        return this.createQueryBuilder()
            .relation(Teacher_entity_1.Teacher, "user")
            .of(teacherId)
            .set(userId); //Using add because it is a one-to-many relation
    }
    unsetUser(teacherId) {
        return this.createQueryBuilder()
            .relation(Teacher_entity_1.Teacher, "user")
            .of(teacherId)
            .set(null); //Using add because it is a one-to-many relation
    }
    addCourseOfferingAsPrimaryTeacher(teacherId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(Teacher_entity_1.Teacher, "asPrimaryTeacher_CourseOfferings")
            .of(teacherId)
            .add(courseOfferingId);
    }
    removeCourseOfferingAsPrimaryTeacher(teacherId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(Teacher_entity_1.Teacher, "asPrimaryTeacher_CourseOfferings")
            .of(teacherId)
            .remove(courseOfferingId);
    }
    addCourseOfferingAsAdditionalTeacher(teacherId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(Teacher_entity_1.Teacher, "asAdditionalTeacher_courseOfferings")
            .of(teacherId)
            .add(courseOfferingId);
    }
    removeCourseOfferingAsAdditionalTeacher(teacherId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(Teacher_entity_1.Teacher, "asAdditionalTeacher_courseOfferings")
            .of(teacherId)
            .remove(courseOfferingId);
    }
    //Use the select query builder to create selections as required by the business case
    //See https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md
    //Below is to find an teacher and return the teacher object with courseofferings as primary teacher embedded
    findByTeacherId_LeftJoinAndSelect_AsPrimaryTeacher_CourseOfferings(teacherId) {
        return this.createQueryBuilder("teacher")
            .leftJoinAndSelect("teacher.asPrimaryTeacher_CourseOfferings", "asPrimaryTeacher_CourseOffering")
            .where("teacher.id = :id", { id: teacherId })
            .getOne();
    }
    //from the above, you will get result like that below. If you don't want the relation embedded 
    //in the returned object, use only .leftJoin
    /*
    {
        id: 1,
        employeeNumber: ...,
        ...
        asPrimaryTeacher_CourseOfferings: [{
            id: 1,
            startDate: ...
            endDate: ...
            isActive: ...
            ...
        }, {
            id: 2,
            startDate: ...
            endDate: ...
            isActive: ...
            ...
        }]
    }
    */
    //Below is to return a teacher along with the course offerings as additional teacher embedded.
    findByTeacherId_LeftJoinAndSelect_AsAdditionalTeacher_CourseOfferings(teacherId) {
        return this.createQueryBuilder("teacher")
            .leftJoinAndSelect("teacher.asAdditionalTeacher_courseOfferings", "asAdditionalTeacher_courseOffering")
            .where("teacher.id = :id", { id: teacherId })
            .getOne();
    }
    //from the above, you will get result like
    /*
    {
        id: 1,
        employeeNumber: ...,
        ...
        asAdditionalTeacher_courseOfferings: [{
            id: 1,
            startDate: ...
            endDate: ...
            isActive: ...
            ...
        }, {
            id: 2,
            startDate: ...
            endDate: ...
            isActive: ...
            ...
        }]
    }
    */
    //Get a teacher along with his user info
    findByTeacherId_LeftJoinAndSelectUser(teacherId) {
        return this.createQueryBuilder("teacher")
            .leftJoinAndSelect("teacher.user", "user")
            .where("teacher.id = :teacherId", { teacherId: teacherId })
            .getOne();
    }
    //above will return a teach object that has the equivalent user object embedded for quick reference.
    //find orphan teachers. Anomally
    findTeachersWithNoUserIndentity() {
        return this.createQueryBuilder("teacher")
            .innerJoin("teacher.user", "user")
            .where("user.id = :userId", { userId: null })
            .getMany();
    }
    //find teacher and return full teacher object with the different relations joined embedded whether empty or not.
    findByTeacherId_LeftJoinAndSelectAll(teacherId) {
        return this.createQueryBuilder("teacher")
            .leftJoinAndSelect("teacher.user", "user")
            .leftJoinAndSelect("teacher.asPrimaryTeacher_CourseOfferings", "asPrimaryTeacher_CourseOffering")
            .leftJoinAndSelect("teacher.asAdditionalTeacher_courseOfferings", "asAdditionalTeacher_courseOffering")
            .where("teacher.id = :teacherId", { teacherId: teacherId })
            .getOne();
    }
};
TeacherRepository = __decorate([
    typeorm_1.EntityRepository(Teacher_entity_1.Teacher)
], TeacherRepository);
exports.TeacherRepository = TeacherRepository;
