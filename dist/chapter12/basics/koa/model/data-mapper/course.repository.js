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
const Course_entity_1 = require("../entity/Course.entity");
let CourseRepository = class CourseRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertCourses(courses) {
        return this.createQueryBuilder()
            .insert()
            .into(Course_entity_1.Course)
            .values(courses)
            .execute();
    }
    //update using query builder. Also more efficient
    updateCourse(courseId, editedCourseData) {
        return this.createQueryBuilder()
            .update(Course_entity_1.Course)
            .set(editedCourseData)
            .where("id = :id", { id: courseId })
            .execute();
    }
    deleteCourse(courseId) {
        return this.createQueryBuilder()
            .delete()
            .from(Course_entity_1.Course)
            .where("id = :id", { id: courseId })
            .execute();
    }
    //finders   
    findByCode(code) {
        return this.createQueryBuilder("course")
            .where("course.code = :code", { code })
            .getOne(); //code is set as unique. Otherwise, getMany()
    }
    //Create datamappers for relations
    setDepartment(courseId, departmentId) {
        return this.createQueryBuilder()
            .relation(Course_entity_1.Course, "department")
            .of(courseId)
            .set(departmentId); //Using set because it is a many-to-one relation
    }
    unsetDepartment(courseId) {
        return this.createQueryBuilder()
            .relation(Course_entity_1.Course, "department")
            .of(courseId)
            .set(null); //Using set because it is a many-to-one relation
    }
    //More finders
    findByCourseId_LeftJoinDepartment(courseId) {
        return this.createQueryBuilder()
            .leftJoinAndSelect("course.department", "department")
            .where("course.id = :courseId", { courseId: courseId })
            .getOne();
    }
};
CourseRepository = __decorate([
    typeorm_1.EntityRepository(Course_entity_1.Course)
], CourseRepository);
exports.CourseRepository = CourseRepository;
