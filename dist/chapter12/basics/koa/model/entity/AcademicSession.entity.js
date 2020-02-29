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
 * This is a registry for academic sessions. It has a one-to-many relationship with course offering
 */
const typeorm_1 = require("typeorm");
const AuditColumn_entity_1 = require("./AuditColumn.entity");
const CourseOffering_entity_1 = require("./CourseOffering.entity");
const class_validator_1 = require("class-validator");
let AcademicSession = class AcademicSession extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], AcademicSession.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], AcademicSession.prototype, "startDate", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], AcademicSession.prototype, "endDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], AcademicSession.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], AcademicSession.prototype, "isCurrent", void 0);
__decorate([
    typeorm_1.OneToMany(() => CourseOffering_entity_1.CourseOffering, courseOffering => courseOffering.academicSession, { nullable: true }),
    __metadata("design:type", Promise)
], AcademicSession.prototype, "courseOfferings", void 0);
AcademicSession = __decorate([
    typeorm_1.Entity() //You can change the table name
], AcademicSession);
exports.AcademicSession = AcademicSession;
