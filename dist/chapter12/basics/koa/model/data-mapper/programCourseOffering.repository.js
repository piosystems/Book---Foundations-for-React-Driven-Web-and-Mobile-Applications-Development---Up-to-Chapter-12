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
const ProgramCourseOffering_entity_1 = require("../entity/ProgramCourseOffering.entity");
let ProgramCourseOfferingRepository = class ProgramCourseOfferingRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertProgramCourseOfferings(programCourseOfferings) {
        return this.createQueryBuilder()
            .insert()
            .into(ProgramCourseOffering_entity_1.ProgramCourseOffering)
            .values(programCourseOfferings)
            .execute();
    }
    //update using query builder. Also more efficient
    updateProgramCourseOffering(programCourseOfferingId, editedProgramCourseOfferingData) {
        return this.createQueryBuilder()
            .update(ProgramCourseOffering_entity_1.ProgramCourseOffering)
            .set(editedProgramCourseOfferingData)
            .where("id = :id", { id: programCourseOfferingId })
            .execute();
    }
    deleteProgramCourseOffering(programCourseOfferingId) {
        return this.createQueryBuilder()
            .delete()
            .from(ProgramCourseOffering_entity_1.ProgramCourseOffering)
            .where("id = :id", { id: programCourseOfferingId })
            .execute();
    }
    //Create datamappers for relations
    setProgram(programCourseOfferingId, programId) {
        return this.createQueryBuilder()
            .relation(ProgramCourseOffering_entity_1.ProgramCourseOffering, "program")
            .of(programCourseOfferingId)
            .set(programId); //Using set because it is a many-to-one relation
    }
    unsetProgram(programCourseOfferingId) {
        return this.createQueryBuilder()
            .relation(ProgramCourseOffering_entity_1.ProgramCourseOffering, "program")
            .of(programCourseOfferingId)
            .set(null); //Using set because it is a many-to-one relation
    }
    setCourseOffering(programCourseOfferingId, courseOfferingId) {
        return this.createQueryBuilder()
            .relation(ProgramCourseOffering_entity_1.ProgramCourseOffering, "courseOffering")
            .of(programCourseOfferingId)
            .set(courseOfferingId); //Using set because it is a many-to-one relation
    }
    unsetCourseOffering(programCourseOfferingId) {
        return this.createQueryBuilder()
            .relation(ProgramCourseOffering_entity_1.ProgramCourseOffering, "courseOffering")
            .of(programCourseOfferingId)
            .set(null); //Using set because it is a many-to-one relation
    }
    //finders
    //find by Program and Course Offering. Below will return programCourseOffering object with the program and courseOffering object embedded
    findByProgramId_CourseOfferingId(programId, courseOfferingId) {
        return this.createQueryBuilder("programCourseOffering")
            .innerJoin("programCourseOffering.program", "program", "program.id = :programId", { programId: programId })
            .innerJoin("programCourseOffering.courseOffering", "courseOffering", "courseOffering.id = :courseOfferingId", { courseOfferingId: courseOfferingId })
            .getOne(); //Both ids are primary keys
    }
    //Below is useful for info on registration for a given program, academic session and semester
    findByProgramId_AcademicSessionId_Semester_CourseOfferingIsActive(programId, academicSessionId, semester, courseOfferingActive) {
        return this.createQueryBuilder("programCourseOffering")
            .innerJoinAndSelect("programCourseOffering.program", "program", "program.id = :programId", { programId: programId })
            .innerJoinAndSelect("programCourseOffering.courseOffering", "courseOffering", "courseOffering.semester = :semester", { semester: semester }) //Note that the entity CourseOffering has some eager relationships
            .where("courseOffering.academicSession = :academicSessionId", { academicSessionId: academicSessionId })
            .andWhere("courseOffering.isActive = :isActive", { isActive: courseOfferingActive })
            .getMany();
    }
    findByProgramId(programId) {
        return this.createQueryBuilder("programCourseOffering")
            .innerJoin("programCourseOffering.program", "program", "program.id = :programId", { programId: programId })
            .getMany();
    }
    findByCourseOfferingId(courseOfferingId) {
        return this.createQueryBuilder("programCourseOffering")
            .innerJoin("programCourseOffering.courseOffering", "courseOffering", "courseOfferingId.id = :courseOfferingId", { courseOfferingId: courseOfferingId })
            .getMany();
    }
};
ProgramCourseOfferingRepository = __decorate([
    typeorm_1.EntityRepository(ProgramCourseOffering_entity_1.ProgramCourseOffering)
], ProgramCourseOfferingRepository);
exports.ProgramCourseOfferingRepository = ProgramCourseOfferingRepository;
