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
/*
This entity is for indicating the courses available for enrollment during a given peroid.
It contains the academic session in which it is taken, the semester, etc.
It is related to teachers, admins, HOD at the period of offering.
*/
const typeorm_1 = require("typeorm");
const AuditColumn_entity_1 = require("./AuditColumn.entity");
const Course_entity_1 = require("./Course.entity");
const User_entity_1 = require("./User.entity");
const Teacher_entity_1 = require("./Teacher.entity");
const settings_1 = require("../../settings");
const AcademicSession_entity_1 = require("./AcademicSession.entity");
const CourseOfferingEnrollment_entity_1 = require("./CourseOfferingEnrollment.entity");
const CourseAdmin_entity_1 = require("./CourseAdmin.entity");
const ProgramCourseOffering_entity_1 = require("./ProgramCourseOffering.entity");
const class_validator_1 = require("class-validator");
let CourseOffering = class CourseOffering extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.ManyToOne(() => AcademicSession_entity_1.AcademicSession, academicSession => academicSession.courseOfferings, { nullable: true }),
    __metadata("design:type", AcademicSession_entity_1.AcademicSession)
], CourseOffering.prototype, "academicSession", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: settings_1.TERM_OR_SEMESTER, nullable: true }),
    __metadata("design:type", Number)
], CourseOffering.prototype, "term_or_semester", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined(),
    __metadata("design:type", Date)
], CourseOffering.prototype, "startDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], CourseOffering.prototype, "endDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], CourseOffering.prototype, "isTermOrSemesterIndependent", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: true }),
    __metadata("design:type", Boolean)
], CourseOffering.prototype, "isActive", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Course_entity_1.Course, course => course.courseOfferings, { eager: true }),
    __metadata("design:type", Course_entity_1.Course)
], CourseOffering.prototype, "course", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Teacher_entity_1.Teacher, teacher => teacher.asPrimaryTeacher_CourseOfferings, { nullable: true, eager: true }),
    __metadata("design:type", Teacher_entity_1.Teacher)
], CourseOffering.prototype, "primaryTeacher", void 0);
__decorate([
    typeorm_1.ManyToOne(() => CourseAdmin_entity_1.CourseAdmin, courseAdmin => courseAdmin.asPrimaryCourseAdmin_CourseOfferings, { nullable: true, eager: true }),
    __metadata("design:type", CourseAdmin_entity_1.CourseAdmin)
], CourseOffering.prototype, "primaryCourseAdmin", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Teacher_entity_1.Teacher, { nullable: true, eager: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], CourseOffering.prototype, "additionalTeachers", void 0);
__decorate([
    typeorm_1.ManyToMany(() => CourseAdmin_entity_1.CourseAdmin, { nullable: true, eager: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], CourseOffering.prototype, "additionalCourseAdmins", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_entity_1.User, { nullable: true, eager: true }),
    typeorm_1.JoinColumn() //JoinColumn must be set only on one side. The side will contain the user id of current department HOD when the course was offerred.
    ,
    __metadata("design:type", User_entity_1.User)
], CourseOffering.prototype, "departmentHOD", void 0);
__decorate([
    typeorm_1.OneToMany(() => CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment, courseOfferingEnrollment => courseOfferingEnrollment.courseOffering),
    __metadata("design:type", Promise)
], CourseOffering.prototype, "courseOfferingEnrollments", void 0);
__decorate([
    typeorm_1.OneToMany(() => ProgramCourseOffering_entity_1.ProgramCourseOffering, programCourseOffering => programCourseOffering.courseOffering, { nullable: true }),
    __metadata("design:type", Promise)
], CourseOffering.prototype, "programCourseOfferings", void 0);
CourseOffering = __decorate([
    typeorm_1.Entity()
], CourseOffering);
exports.CourseOffering = CourseOffering;
