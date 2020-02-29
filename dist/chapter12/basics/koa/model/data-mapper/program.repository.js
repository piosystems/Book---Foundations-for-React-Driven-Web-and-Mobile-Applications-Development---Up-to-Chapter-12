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
const Program_entity_1 = require("../entity/Program.entity");
let ProgramRepository = class ProgramRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertPrograms(programs) {
        return this.createQueryBuilder()
            .insert()
            .into(Program_entity_1.Program)
            .values(programs)
            .execute();
    }
    //update using query builder. Also more efficient
    updateProgram(programId, editedProgramData) {
        return this.createQueryBuilder()
            .update(Program_entity_1.Program)
            .set(editedProgramData)
            .where("id = :id", { id: programId })
            .execute();
    }
    deleteProgram(programId) {
        return this.createQueryBuilder()
            .delete()
            .from(Program_entity_1.Program)
            .where("id = :id", { id: programId })
            .execute();
    }
    setDepartment(programId, departmentId) {
        return this.createQueryBuilder()
            .relation(Program_entity_1.Program, "department")
            .of(programId)
            .set(departmentId);
    }
    unsetDepartment(programId) {
        return this.createQueryBuilder()
            .relation(Program_entity_1.Program, "department")
            .of(programId)
            .set(null);
    }
    addStudent(programId, studentId) {
        return this.createQueryBuilder()
            .relation(Program_entity_1.Program, "students")
            .of(programId)
            .add(studentId);
    }
    removeStudent(programId, studentId) {
        return this.createQueryBuilder()
            .relation(Program_entity_1.Program, "students")
            .of(programId)
            .remove(studentId);
    }
    addProgramCourseOffering(programId, programCourseOfferingId) {
        return this.createQueryBuilder()
            .relation(Program_entity_1.Program, "programCourseOfferings")
            .of(programId)
            .add(programCourseOfferingId);
    }
    removeProgramCourseOffering(programId, programCourseOfferingId) {
        return this.createQueryBuilder()
            .relation(Program_entity_1.Program, "programCourseOfferings")
            .of(programId)
            .remove(programCourseOfferingId);
    }
    //finders
    findByCode(code) {
        return this.createQueryBuilder("program")
            .where("program.code = :code", { code })
            .getOne(); //Code is set as unique
    }
    findByDepartmentId(departmentId) {
        return this.createQueryBuilder("program")
            .innerJoin("program.department", "department") //only return programs that have department. Hence inner join 
            .where("department.id = :departmentId", { departmentId: departmentId })
            .getMany(); //many programs belong to one department
    }
    findByStudentId(studentId) {
        return this.createQueryBuilder("program")
            .innerJoin("program.students", "student") //only return program that have students
            .where("student.id = :studentId", { studentId: studentId })
            .getOne(); //a student belongs to one program
    }
    //find programId and return object with students embedded. Using leftJoin will ensure that program is returned even if students are not found for the program
    findByProgramId_LeftJoinAndSelectStudents(programId) {
        return this.createQueryBuilder("program")
            .leftJoinAndSelect("program.students", "student")
            .where("program.id = :programId", { programId: programId })
            .getOne();
    }
};
ProgramRepository = __decorate([
    typeorm_1.EntityRepository(Program_entity_1.Program)
], ProgramRepository);
exports.ProgramRepository = ProgramRepository;
