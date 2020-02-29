"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The base student registry. The student is related to program which is related to department.
 * A student also has course enrollments lazily related so that they are not loaded each time a student data is gotten.
 * Relationship with mentoring can be built. [To be done]
 */
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const AuditColumn_entity_1 = require("./AuditColumn.entity");
const CourseOfferingEnrollment_entity_1 = require("./CourseOfferingEnrollment.entity");
const Program_entity_1 = require("./Program.entity");
const settings_1 = require("../../settings");
let Student = class Student extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "admissionNumber", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "matriculationNumber", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Program_entity_1.Program, program => program.students),
    __metadata("design:type", Program_entity_1.Program)
], Student.prototype, "programOfStudy", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Student.prototype, "yearOfEntry", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: settings_1.Level, default: settings_1.Level.NOT_SPECIFIED }),
    __metadata("design:type", String)
], Student.prototype, "entryLevel", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: settings_1.Level, default: settings_1.Level.NOT_SPECIFIED }),
    __metadata("design:type", String)
], Student.prototype, "currentLevel", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Student.prototype, "entryQualifications", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Student.prototype, "schoolsAttended", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Student.prototype, "graduated", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_entity_1.User),
    typeorm_1.JoinColumn() //JoinColumn must be set only on one side. The side will contain the foreign key named here userId by default syntax
    ,
    __metadata("design:type", User_entity_1.User)
], Student.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment, courseOfferingEnrollment => courseOfferingEnrollment.student),
    __metadata("design:type", Promise)
], Student.prototype, "courseOfferingEnrollments", void 0);
Student = __decorate([
    typeorm_1.Entity()
], Student);
exports.Student = Student;
