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
/*This entity contains base entry for courses available in the institution
It is related to Department on a Many-to-one basis. That is, many courses can belong
to one department and conversely, one department can have many courses.
Implication: a course cannot belong to more than one department.
See
*/
const typeorm_1 = require("typeorm");
const AuditColumn_entity_1 = require("./AuditColumn.entity");
const Department_entity_1 = require("./Department.entity");
const class_validator_1 = require("class-validator");
const CourseOffering_entity_1 = require("./CourseOffering.entity");
let Course = class Course extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], Course.prototype, "code", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined(),
    __metadata("design:type", Number)
], Course.prototype, "creditUnits", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", nullable: true }),
    __metadata("design:type", Array)
], Course.prototype, "recommendedPrerequiteCourses", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Department_entity_1.Department, department => department.courses),
    __metadata("design:type", Department_entity_1.Department)
], Course.prototype, "department", void 0);
__decorate([
    typeorm_1.OneToMany(() => CourseOffering_entity_1.CourseOffering, courseOffering => courseOffering.course),
    __metadata("design:type", Promise)
], Course.prototype, "courseOfferings", void 0);
Course = __decorate([
    typeorm_1.Entity()
], Course);
exports.Course = Course;
