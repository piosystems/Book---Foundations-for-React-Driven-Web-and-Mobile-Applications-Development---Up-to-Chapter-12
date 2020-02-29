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
 * Multiple grade entry for each course enrollment. Each grade entry has a category, score and maximum scorable
 */
const typeorm_1 = require("typeorm");
const AuditColumn_entity_1 = require("./AuditColumn.entity");
const CourseOfferingEnrollment_entity_1 = require("./CourseOfferingEnrollment.entity");
const class_validator_1 = require("class-validator");
let Grade = class Grade extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.Column({ type: "simple-json" }) //record each score as json in db
    ,
    class_validator_1.IsDefined(),
    __metadata("design:type", Object)
], Grade.prototype, "score", void 0);
__decorate([
    typeorm_1.ManyToOne(() => CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment, courseOfferingEnrollment => courseOfferingEnrollment.grades),
    __metadata("design:type", CourseOfferingEnrollment_entity_1.CourseOfferingEnrollment)
], Grade.prototype, "courseOfferingEnrollment", void 0);
Grade = __decorate([
    typeorm_1.Entity()
], Grade);
exports.Grade = Grade;
