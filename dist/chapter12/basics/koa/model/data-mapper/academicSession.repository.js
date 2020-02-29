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
const AcademicSession_entity_1 = require("../entity/AcademicSession.entity");
let AcademicSessionRepository = class AcademicSessionRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertAcademicSessions(academicSessions) {
        return this.createQueryBuilder()
            .insert()
            .into(AcademicSession_entity_1.AcademicSession)
            .values(academicSessions)
            .execute();
    }
    //update using query builder. Also more efficient
    updateAcademicSessions(academicSessionId, editedAcademicSessionData) {
        return this.createQueryBuilder()
            .update(AcademicSession_entity_1.AcademicSession)
            .set(editedAcademicSessionData)
            .where("id = :id", { id: academicSessionId })
            .execute();
    }
    deleteAcademicSession(academicSessionId) {
        return this.createQueryBuilder()
            .delete()
            .from(AcademicSession_entity_1.AcademicSession)
            .where("id = :id", { id: academicSessionId })
            .execute();
    }
    //finders   
    findByTitle(title) {
        return this.createQueryBuilder("academicSession")
            .where("academicSession.title = :title", { title })
            .getOne(); //Name is set as unique
    }
    addCourseOffering(academicSessionId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(AcademicSession_entity_1.AcademicSession, "courseOfferings")
            .of(academicSessionId)
            .add(courseOfferingId); //Using add because it is a one-to-many relation
    }
    removeCourseOffering(academicSessionId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(AcademicSession_entity_1.AcademicSession, "courseOfferings")
            .of(academicSessionId)
            .remove(courseOfferingId); //Using remove because it is a one-to-many relation
    }
    //More finders
    findByAcademicSessionId_LeftJoinAndSelectCourseOfferings(academicSessionId) {
        return this.createQueryBuilder("academicSession")
            .leftJoinAndSelect("academicSession.courseOfferings", "courseOffering")
            .where("academicSession.id = :academicSessionId", { academicSessionId: academicSessionId })
            .getOne();
    }
    findByIsCurrent(isCurrent) {
        return this.createQueryBuilder("academicSession")
            .where("academicSession.isCurrent = :isCurrent", { isCurrent: isCurrent })
            .getMany();
    }
};
AcademicSessionRepository = __decorate([
    typeorm_1.EntityRepository(AcademicSession_entity_1.AcademicSession)
], AcademicSessionRepository);
exports.AcademicSessionRepository = AcademicSessionRepository;
