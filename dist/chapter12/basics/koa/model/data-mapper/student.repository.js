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
const Student_entity_1 = require("../entity/Student.entity");
let StudentRepository = class StudentRepository extends typeorm_1.Repository {
    //insert using query builder - more efficient than save. Can be used for single or bulk save. See https://github.com/typeorm/typeorm/blob/master/docs/insert-query-builder.md
    insertStudents(students) {
        return this.createQueryBuilder()
            .insert()
            .into(Student_entity_1.Student)
            .values(students)
            .execute();
    }
    //update using query builder. Also more efficient
    updateStudents(studentId, editedStudentData) {
        return this.createQueryBuilder()
            .update(Student_entity_1.Student)
            .set(editedStudentData)
            .where("id = :id", { id: studentId })
            .execute();
    }
    deleteStudent(studentId) {
        return this.createQueryBuilder()
            .delete()
            .from(Student_entity_1.Student)
            .where("id = :id", { id: studentId })
            .execute();
    }
    //functions to set/unset add/remove relations values
    setUser(studentId, userId) {
        return this.createQueryBuilder()
            .relation(Student_entity_1.Student, "user")
            .of(studentId)
            .set(userId); //Using add because it is a one-to-many relation
    }
    unsetUser(studentId) {
        return this.createQueryBuilder()
            .relation(Student_entity_1.Student, "user")
            .of(studentId)
            .set(null); //Using add because it is a one-to-many relation
    }
    setProgram(studentId, programId) {
        return this.createQueryBuilder()
            .relation(Student_entity_1.Student, "programOfStudy")
            .of(studentId)
            .set(programId); //Using add because it is a one-to-many relation
    }
    unsetProgram(studentId) {
        return this.createQueryBuilder()
            .relation(Student_entity_1.Student, "programOfStudy")
            .of(studentId)
            .set(null); //Using add because it is a one-to-many relation
    }
    addCourseOfferingEnrollments(studentId, courseOfferingEnrollmentId) {
        return this.createQueryBuilder()
            .relation(Student_entity_1.Student, "courseOfferingEnrollments")
            .of(studentId)
            .add(courseOfferingEnrollmentId);
    }
    removeCourseOfferingEnrollments(studentId, courseOfferingEnrollmentId) {
        return this.createQueryBuilder()
            .relation(Student_entity_1.Student, "courseOfferingEnrollments")
            .of(studentId)
            .remove(courseOfferingEnrollmentId);
    }
    //finders
    findByProgramId_LeftJoinAndSelectProgram(programId) {
        return this.createQueryBuilder("student")
            .leftJoinAndSelect("student.programOfStudy", "program")
            .where("program.id = :programId", { programId: programId })
            .getMany(); //a program has many students
    }
    //select a student along with his user info
    findByStudentId_LeftJoinAndSelectUser(studentId) {
        return this.createQueryBuilder("student")
            .leftJoinAndSelect("student.user", "user")
            .where("student.id = :studentId", { studentId: studentId })
            .getOne();
    }
    //above will return a teach object that has the equivalent user object embedded for quick reference.
    //get a student's enrollments and drill down to grades through courseOfferingEnrollment
    findByStudentId_LeftJoinAndSelectEnrollments(studentId) {
        return this.createQueryBuilder("student")
            .leftJoinAndSelect("student.courseOfferingEnrollments", "courseOfferingEnrollment")
            .leftJoinAndSelect("courseOfferingEnrollment.grades", "grade") //join grades on courseOfferingEnrollment
            .where("student.id = :studentId", { studentId: studentId });
    }
    //select a student along with his user info
    findByStudentId_LeftJoinAndSelect(studentId) {
        return this.createQueryBuilder("student")
            .leftJoinAndSelect("student.user", "user")
            .where("student.id = :studentId", { studentId: studentId })
            .getOne();
    }
    //select a student along with his user info
    findByUserId_LeftJoinAndSelectUser(userId) {
        return this.createQueryBuilder("student")
            .leftJoinAndSelect("student.user", "user")
            .where("user.id = :userId", { userId: userId })
            .getOne();
    }
    //find orphan students. Anomally
    findStudentsWithNoUserIndentity() {
        return this.createQueryBuilder("student")
            .innerJoin("student.user", "user")
            .where("user.id = :userId", { userId: null })
            .getMany();
    }
};
StudentRepository = __decorate([
    typeorm_1.EntityRepository(Student_entity_1.Student)
], StudentRepository);
exports.StudentRepository = StudentRepository;
