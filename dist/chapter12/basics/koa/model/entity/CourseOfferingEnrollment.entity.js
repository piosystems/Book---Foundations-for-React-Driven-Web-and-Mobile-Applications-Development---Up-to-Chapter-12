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
 * This is for capturing student enrollments for course offerings
 * Technically, this is a kind of many to many relationship between student and course offering
 * that has other fields added.
 * Such is implemented using the many-to-one for both student and course offering as shown below
 */
const typeorm_1 = require("typeorm");
const AuditColumn_entity_1 = require("./AuditColumn.entity");
const Student_entity_1 = require("./Student.entity");
const Grade_entity_1 = require("./Grade.entity");
const CourseOffering_entity_1 = require("./CourseOffering.entity");
let CourseOfferingEnrollment = class CourseOfferingEnrollment extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.ManyToOne(() => CourseOffering_entity_1.CourseOffering, courseOffering => courseOffering.courseOfferingEnrollments),
    __metadata("design:type", CourseOffering_entity_1.CourseOffering)
], CourseOfferingEnrollment.prototype, "courseOffering", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Student_entity_1.Student, student => student.courseOfferingEnrollments),
    __metadata("design:type", Student_entity_1.Student)
], CourseOfferingEnrollment.prototype, "student", void 0);
__decorate([
    typeorm_1.Column({ default: false }) //set to true when grading is complete.
    ,
    __metadata("design:type", Boolean)
], CourseOfferingEnrollment.prototype, "gradingComplete", void 0);
__decorate([
    typeorm_1.Column({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], CourseOfferingEnrollment.prototype, "scoreBreakDown", void 0);
__decorate([
    typeorm_1.Column({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], CourseOfferingEnrollment.prototype, "maxScorableBreakDown", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json", nullable: true }),
    __metadata("design:type", Object)
], CourseOfferingEnrollment.prototype, "totalScore", void 0);
__decorate([
    typeorm_1.OneToMany(() => Grade_entity_1.Grade, grade => grade.courseOfferingEnrollment),
    __metadata("design:type", Array)
], CourseOfferingEnrollment.prototype, "grades", void 0);
CourseOfferingEnrollment = __decorate([
    typeorm_1.Entity()
], CourseOfferingEnrollment);
exports.CourseOfferingEnrollment = CourseOfferingEnrollment;
