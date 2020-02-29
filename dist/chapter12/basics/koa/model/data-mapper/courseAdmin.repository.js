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
const CourseAdmin_entity_1 = require("../entity/CourseAdmin.entity");
let CourseAdminRepository = class CourseAdminRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertCourseAdmin(courseAdmins) {
        return this.createQueryBuilder()
            .insert()
            .into(CourseAdmin_entity_1.CourseAdmin)
            .values(courseAdmins)
            .execute();
    }
    //update using query builder. Also more efficient
    updateCourseAdmin(courseAdminId, editedCourseAdminData) {
        return this.createQueryBuilder()
            .update(CourseAdmin_entity_1.CourseAdmin)
            .set(editedCourseAdminData)
            .where("id = :id", { id: courseAdminId })
            .execute();
    }
    deleteCourseAdmin(courseAdminId) {
        return this.createQueryBuilder()
            .delete()
            .from(CourseAdmin_entity_1.CourseAdmin)
            .where("id = :id", { id: courseAdminId })
            .execute();
    }
    //functions to set/unset add/remove relations values
    setUser(courseAdminId, userId) {
        return this.createQueryBuilder()
            .relation(CourseAdmin_entity_1.CourseAdmin, "user")
            .of(courseAdminId)
            .set(userId); //Using add because it is a one-to-many relation
    }
    unsetUser(courseAdminId) {
        return this.createQueryBuilder()
            .relation(CourseAdmin_entity_1.CourseAdmin, "user")
            .of(courseAdminId)
            .set(null); //Using add because it is a one-to-many relation
    }
    addCourseOfferingAsPrimaryCourseAdmin(courseAdminId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseAdmin_entity_1.CourseAdmin, "asPrimaryCourseAdmin_CourseOfferings")
            .of(courseAdminId)
            .add(courseOfferingId);
    }
    removeCourseOfferingAsPrimaryCourseAdmin(courseAdminId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseAdmin_entity_1.CourseAdmin, "asPrimaryCourseAdmin_CourseOfferings")
            .of(courseAdminId)
            .remove(courseOfferingId);
    }
    addCourseOfferingAsAdditionalCourseAdmin(courseAdminId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseAdmin_entity_1.CourseAdmin, "asAdditionalCourseAdmin_CourseOfferings")
            .of(courseAdminId)
            .add(courseOfferingId);
    }
    removeCourseOfferingAsAdditionalTeacher(courseAdminId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(CourseAdmin_entity_1.CourseAdmin, "asAdditionalCourseAdmin_CourseOfferings")
            .of(courseAdminId)
            .remove(courseOfferingId);
    }
    //Use the select query builder to create selections as required by the business case
    //See https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md
    //Below is to find a courseAdmin and return the courseAdmin object with courseofferings as primary courseAdmin embedded
    findByCourseAdminId_LeftJoinAndSelect_AsPrimaryCourseAdmin_CourseOfferings(courseAdminId) {
        return this.createQueryBuilder("courseAdmin")
            .leftJoinAndSelect("courseAdmin.asPrimaryCourseAdmin_CourseOfferings", "asPrimaryCourseAdmin_CourseOffering")
            .where("courseAdmin.id = :id", { id: courseAdminId })
            .getOne();
    }
    //from the above, you will get result like that below. If you don't want the relation embedded 
    //in the returned object, use only .leftJoin
    /*
    {
        id: 1,
        employeeNumber: ...,
        ...
        asPrimaryCourseAdmin_CourseOfferings: [{
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
    findByCourseAdminId_LeftJoinAndSelect_AsAdditionalCourseAdmin_CourseOfferings(courseAdminId) {
        return this.createQueryBuilder("courseAdmin")
            .leftJoinAndSelect("courseAdmin.asAdditionalCourseAdmin_courseOfferings", "asAdditionalCourseAdmin_courseOffering")
            .where("courseAdmin.id = :id", { id: courseAdminId })
            .getOne();
    }
    //from the above, you will get result like
    /*
    {
        id: 1,
        employeeNumber: ...,
        ...
        asAdditionalCourseAdmin_courseOfferings: [{
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
    findByCourseAdminId_LeftJoinAndSelectUser(courseAdminId) {
        return this.createQueryBuilder("courseAdmin")
            .leftJoinAndSelect("courseAdmin.user", "user")
            .where("courseAdmin.id = :courseAdminId", { courseAdminId: courseAdminId })
            .getOne();
    }
    //above will return a courseAdmin object that has the equivalent user object embedded for quick reference.
    //find orphan courseAdmins. Anomally
    findCourseAdminsWithNoUserIndentity() {
        return this.createQueryBuilder("courseAdmin")
            .innerJoin("courseAdmin.user", "user")
            .where("user.id = :userId", { userId: null })
            .getMany();
    }
    //find courseAdmin and return full courseAdmin object with the different relations joined embedded whether empty or not.
    findByCourseAdminId_LeftJoinAndSelectAll(courseAdminId) {
        return this.createQueryBuilder("courseAdmin")
            .leftJoinAndSelect("courseAdmin.user", "user")
            .leftJoinAndSelect("courseAdmin.asPrimaryCourseAdmin_CourseOfferings", "asPrimaryCourseAdmin_CourseOffering")
            .leftJoinAndSelect("courseAdmin.asAdditionalCourseAdmin_courseOfferings", "asAdditionalCourseAdmin_courseOffering")
            .where("courseAdmin.id = :courseAdminId", { courseAdminId: courseAdminId })
            .getOne();
    }
};
CourseAdminRepository = __decorate([
    typeorm_1.EntityRepository(CourseAdmin_entity_1.CourseAdmin)
], CourseAdminRepository);
exports.CourseAdminRepository = CourseAdminRepository;
