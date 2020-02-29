"use strict";
/**
 * Program Course Offerings is useful as a course enrollment guide for students in a give Program.
 * This is a kind of many-to-many relationship between Program and CourseOffering
 * Since it has additional fields, we need to implement it using many-to-one for ProgramCourse to Program
 * and another many-to-one for ProgramCourse to CourseOffering.
 * Both fields need to be set as primary key
 */
//This should relate programs, levels to courses as a guide to Course enrollment.
//This is a kind of custom many-to-many for guiding course enrollment.
//Todo: investigate where many-to-many between Program and CourseOffering will allow additional field of level
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
const typeorm_1 = require("typeorm");
const AuditColumn_entity_1 = require("./AuditColumn.entity");
const settings_1 = require("../../settings");
const Program_entity_1 = require("./Program.entity");
const CourseOffering_entity_1 = require("./CourseOffering.entity");
const class_validator_1 = require("class-validator");
let ProgramCourseOffering = class ProgramCourseOffering extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.ManyToOne(() => Program_entity_1.Program, program => program.programCourseOfferings, { primary: true }),
    __metadata("design:type", Program_entity_1.Program)
], ProgramCourseOffering.prototype, "program", void 0);
__decorate([
    typeorm_1.ManyToOne(() => CourseOffering_entity_1.CourseOffering, courseOffering => courseOffering.programCourseOfferings, { primary: true }),
    __metadata("design:type", CourseOffering_entity_1.CourseOffering)
], ProgramCourseOffering.prototype, "courseOffering", void 0);
__decorate([
    typeorm_1.Column({ type: "enum", enum: settings_1.Level }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], ProgramCourseOffering.prototype, "level", void 0);
__decorate([
    typeorm_1.Column({ type: "enum", enum: settings_1.TERM_OR_SEMESTER }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Number)
], ProgramCourseOffering.prototype, "termOrSemester", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined(),
    __metadata("design:type", Boolean)
], ProgramCourseOffering.prototype, "isCompulsory", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined(),
    __metadata("design:type", Boolean)
], ProgramCourseOffering.prototype, "isRequired", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined(),
    __metadata("design:type", Boolean)
], ProgramCourseOffering.prototype, "isElective", void 0);
ProgramCourseOffering = __decorate([
    typeorm_1.Entity()
], ProgramCourseOffering);
exports.ProgramCourseOffering = ProgramCourseOffering;
