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
const Grade_entity_1 = require("../entity/Grade.entity");
let GradeRepository = class GradeRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertGrades(grades) {
        return this.createQueryBuilder()
            .insert()
            .into(Grade_entity_1.Grade)
            .values(grades)
            .execute();
    }
    //update using query builder. Also more efficient
    updateGrade(gradeId, editedGradeData) {
        return this.createQueryBuilder()
            .update(Grade_entity_1.Grade)
            .set(editedGradeData)
            .where("id = :id", { id: gradeId })
            .execute();
    }
    deleteGrade(gradeId) {
        return this.createQueryBuilder()
            .delete()
            .from(Grade_entity_1.Grade)
            .where("id = :id", { id: gradeId })
            .execute();
    }
    //Set related data
    setCourseOfferingEnrollment(gradeId, courseOfferingEnrollmentId) {
        return this.createQueryBuilder()
            .relation(Grade_entity_1.Grade, "courseOfferingEnrollment")
            .of(gradeId)
            .set(courseOfferingEnrollmentId);
    }
    unsetCourseOfferingEnrollment(gradeId) {
        return this.createQueryBuilder()
            .relation(Grade_entity_1.Grade, "courseOfferingEnrollment")
            .of(gradeId)
            .set(null);
    }
    //finders
    findByCourseOfferingEnrollmentId_InnerJoinAndSelect(courseOfferingEnrollmentId) {
        return this.createQueryBuilder("grade")
            .innerJoinAndSelect("grade.courseOfferingEnrollment", "courseOfferingEnrollment", "courseOfferingEnrollment.id = :courseOfferingEnrollmentId", { courseOfferingEnrollmentId: courseOfferingEnrollmentId })
            .getMany();
    }
    findByStudentId(studentId) {
        return this.createQueryBuilder("grade")
            .innerJoin("grade.courseOfferingEnrollment", "courseOfferingEnrollment")
            .innerJoin("courseOfferingEnrollment.student", "student", "student.id = :studentId", { studentId: studentId })
            .getMany();
    }
};
GradeRepository = __decorate([
    typeorm_1.EntityRepository(Grade_entity_1.Grade)
], GradeRepository);
exports.GradeRepository = GradeRepository;
