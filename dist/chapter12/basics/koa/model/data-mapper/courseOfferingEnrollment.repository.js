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
const CourseOfferingEnrollment_entity_1 = require("../entity/CourseOfferingEnrollment.entity");
let CourseOfferingEnrollmentRepository = class CourseOfferingEnrollmentRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertCourseOfferingEnrollments(courseOfferingEnrollments) {
        return this.createQueryBuilder()
            .insert()
            .into(CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment)
            .values(courseOfferingEnrollments)
            .execute();
    }
    //update using query builder. Also more efficient
    updateCourseOfferingEnrollment(courseOfferingEnrollmentId, editedCourseOfferingEnrollmentData) {
        return this.createQueryBuilder()
            .update(CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment)
            .set(editedCourseOfferingEnrollmentData)
            .where("id = :id", { id: courseOfferingEnrollmentId })
            .execute();
    }
    deleteCourseOfferingEnrollment(courseOfferingEnrollmentId) {
        return this.createQueryBuilder()
            .delete()
            .from(CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment)
            .where("id = :id", { id: courseOfferingEnrollmentId })
            .execute();
    }
    //Set related data
    setCourseOffering(courseOfferingEnrollmentId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment, "courseOffering")
            .of(courseOfferingEnrollmentId)
            .set(courseOfferingId);
    }
    unsetCourseOffering(courseOfferingEnrollmentId) {
        return this.createQueryBuilder()
            .relation(CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment, "courseOffering")
            .of(courseOfferingEnrollmentId)
            .set(null);
    }
    setStudent(courseOfferingEnrollmentId, studentId) {
        return this.createQueryBuilder()
            .relation(CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment, "student")
            .of(courseOfferingEnrollmentId)
            .set(studentId);
    }
    unsetStudent(courseOfferingEnrollmentId) {
        return this.createQueryBuilder()
            .relation(CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment, "student")
            .of(courseOfferingEnrollmentId)
            .set(null);
    }
    addGrade(courseOfferingEnrollmentId, gradeId) {
        return this.createQueryBuilder()
            .relation(CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment, "grades")
            .of(courseOfferingEnrollmentId)
            .add(gradeId);
    }
    removeGrade(courseOfferingEnrollmentId, gradeId) {
        return this.createQueryBuilder()
            .relation(CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment, "grades")
            .of(courseOfferingEnrollmentId)
            .remove(gradeId);
    }
    //finders
    findByCourseOfferingId_LeftJoinAndSelectCourseOffering(courseOfferingId) {
        return this.createQueryBuilder("courseOfferingEnrollment")
            .leftJoinAndSelect("courseOfferingEnrollment.courseOffering", "courseOffering", "courseOffering.id = :courseOfferingId", { courseOfferingId: courseOfferingId })
            .getMany();
    }
};
CourseOfferingEnrollmentRepository = __decorate([
    typeorm_1.EntityRepository(CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment)
], CourseOfferingEnrollmentRepository);
exports.CourseOfferingEnrollmentRepository = CourseOfferingEnrollmentRepository;
