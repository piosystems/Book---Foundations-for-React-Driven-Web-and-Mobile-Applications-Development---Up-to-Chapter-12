"use strict";
/**
 * This maintains a list of programs by the institution.
 * Columns are degree, title, owningDepartment, numberOfLevel, entryRequirements, etc.
 * This should guide admissions and programCourse setup
 */
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
const Department_entity_1 = require("./Department.entity");
const Student_entity_1 = require("./Student.entity");
const settings_1 = require("../../settings");
const ProgramCourseOffering_entity_1 = require("./ProgramCourseOffering.entity");
const class_validator_1 = require("class-validator");
let Program = class Program extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], Program.prototype, "code", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], Program.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Program.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "enum", enum: settings_1.QualificationInView }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], Program.prototype, "qualificationInView", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Program.prototype, "noOfAcademicYears", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Program.prototype, "durationInDays", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Program.prototype, "expectedEntryQualification", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Department_entity_1.Department, department => department.programs),
    __metadata("design:type", Department_entity_1.Department)
], Program.prototype, "department", void 0);
__decorate([
    typeorm_1.OneToMany(() => Student_entity_1.Student, student => student.programOfStudy),
    __metadata("design:type", Promise)
], Program.prototype, "students", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Program.prototype, "isActive", void 0);
__decorate([
    typeorm_1.OneToMany(() => ProgramCourseOffering_entity_1.ProgramCourseOffering, programCourseOffering => programCourseOffering.program, { nullable: true }),
    __metadata("design:type", Promise)
], Program.prototype, "programCourseOfferings", void 0);
Program = __decorate([
    typeorm_1.Entity()
], Program);
exports.Program = Program;
