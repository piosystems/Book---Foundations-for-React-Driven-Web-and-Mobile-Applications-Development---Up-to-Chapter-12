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
const CourseOffering_entity_1 = require("../entity/CourseOffering.entity");
let CourseOfferingRepository = class CourseOfferingRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertCourseOfferings(courseOfferings) {
        return this.createQueryBuilder()
            .insert()
            .into(CourseOffering_entity_1.CourseOffering)
            .values(courseOfferings)
            .execute();
    }
    //update using query builder. Also more efficient
    updateCourseOffering(courseOfferingId, editedCourseOfferingData) {
        return this.createQueryBuilder()
            .update(CourseOffering_entity_1.CourseOffering)
            .set(editedCourseOfferingData)
            .where("id = :id", { id: courseOfferingId })
            .execute();
    }
    deleteCourseOffering(courseOfferingId) {
        return this.createQueryBuilder()
            .delete()
            .from(CourseOffering_entity_1.CourseOffering)
            .where("id = :id", { id: courseOfferingId })
            .execute();
    }
    //Set related data
    setAcademicSession(courseOfferingId, academicSessionId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "academicSession")
            .of(courseOfferingId)
            .set(academicSessionId);
    }
    unsetAcademicSession(courseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "academicSession")
            .of(courseOfferingId)
            .set(null);
    }
    setCourse(courseOfferingId, courseId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "course")
            .of(courseOfferingId)
            .set(courseId);
    }
    unsetCourse(courseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "course")
            .of(courseOfferingId)
            .set(null);
    }
    setPrimaryTeacher(courseOfferingId, primaryTeacherId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "primaryTeacher")
            .of(courseOfferingId)
            .set(primaryTeacherId);
    }
    unsetPrimaryTeacher(courseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "primaryTeacher")
            .of(courseOfferingId)
            .set(null);
    }
    setPrimaryCourseAdmin(courseOfferingId, primaryCourseAdminId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "primaryCourseAdmin")
            .of(courseOfferingId)
            .set(primaryCourseAdminId);
    }
    unsetPrimaryCourseAdmin(courseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "primaryCourseAdmin")
            .of(courseOfferingId)
            .set(null);
    }
    setDepartmentHOD(courseOfferingId, departmentHODUserId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "departmentHOD")
            .of(courseOfferingId)
            .set(departmentHODUserId);
    }
    unsetDepartmentHOD(courseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "departmentHOD")
            .of(courseOfferingId)
            .set(null);
    }
    addAdditionalTeacher(courseOfferingId, additionalTeacherId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "additionalTeachers")
            .of(courseOfferingId)
            .add(additionalTeacherId);
    }
    removeAdditionalTeacher(courseOfferingId, additionalTeacherId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "additionalTeachers")
            .of(courseOfferingId)
            .remove(additionalTeacherId);
    }
    addAdditionalCourseAdmin(courseOfferingId, additionalCourseAdminId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "additionalCourseAdmins")
            .of(courseOfferingId)
            .add(additionalCourseAdminId);
    }
    removeAdditionalCourseAdmin(courseOfferingId, additionalCourseAdminId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "additionalCourseAdmins")
            .of(courseOfferingId)
            .remove(additionalCourseAdminId);
    }
    addCourseOfferingEnrollment(courseOfferingId, courseOfferingEnrollmentId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "courseOfferingEnrollments")
            .of(courseOfferingId)
            .add(courseOfferingEnrollmentId);
    }
    removeCourseOfferingEnrollment(courseOfferingId, courseOfferingEnrollmentId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "courseOfferingEnrollments")
            .of(courseOfferingId)
            .remove(courseOfferingEnrollmentId);
    }
    addProgramCourseOffering(courseOfferingId, programCourseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "programCourseOfferings")
            .of(courseOfferingId)
            .add(programCourseOfferingId);
    }
    removeProgramCourseOffering(courseOfferingId, programCourseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseOffering_entity_1.CourseOffering, "programCourseOfferings")
            .of(courseOfferingId)
            .remove(programCourseOfferingId);
    }
    //finders
    findByIsActiveAndAcademicSessionIdAndCourseId_LeftJoinAndSelectAcademicSessionAndCourse(isActive, academicSessionId, courseId) {
        return this.createQueryBuilder("courseOffering")
            .innerJoinAndSelect("courseOffering.academicSession", "academicSession", "academicSession.id = :academicSessionId", { academicSessionId: academicSessionId })
            .innerJoinAndSelect("courseOffering.course", "course", "course.id = :courseId", { courseId: courseId })
            .where("courseOffering.isActive = :isActive", { isActive: isActive })
            .getMany();
    }
    findByCourseOfferingId_LeftJoinAndSelectCourseOfferingEnrollments(courseOfferingId) {
        return this.createQueryBuilder("courseOffering")
            .leftJoinAndSelect("courseOffering.courseOfferingEnrollments", "courseOfferingEnrollment")
            .where("courseOffering.id = :courseOfferingId", { courseOfferingId: courseOfferingId })
            .getOne();
    }
    findByCourseOfferingId_LeftJoinAndSelectProgramCourseOfferings(courseOfferingId) {
        return this.createQueryBuilder("courseOffering")
            .leftJoinAndSelect("courseOffering.programCourseOfferings", "programCourseOffering")
            .where("courseOffering.id = :courseOfferingId", { courseOfferingId: courseOfferingId })
            .getOne();
    }
};
CourseOfferingRepository = __decorate([
    typeorm_1.EntityRepository(CourseOffering_entity_1.CourseOffering)
], CourseOfferingRepository);
exports.CourseOfferingRepository = CourseOfferingRepository;
