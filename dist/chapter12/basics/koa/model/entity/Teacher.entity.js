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
 * Teacher is a special role with respect to learning. Hence this entity is needed.
 * Teacher can be a primary teacher or additional teacher for courseoffering
 */
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const AuditColumn_entity_1 = require("./AuditColumn.entity");
const settings_1 = require("../../settings");
const CourseOffering_entity_1 = require("./CourseOffering.entity");
let Teacher = class Teacher extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "employeeNumber", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: settings_1.EmploymentStatus, default: settings_1.EmploymentStatus.FULLTIME_REGULAR }),
    __metadata("design:type", String)
], Teacher.prototype, "employmentStatus", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Teacher.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Teacher.prototype, "teacherProfile", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_entity_1.User),
    typeorm_1.JoinColumn() //JoinColumn must be set only on one side. The side will contain the foreign key named here userId by default syntax
    ,
    __metadata("design:type", User_entity_1.User)
], Teacher.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => CourseOffering_entity_1.CourseOffering, courseOffering => courseOffering.primaryTeacher),
    __metadata("design:type", Promise)
], Teacher.prototype, "asPrimaryTeacher_CourseOfferings", void 0);
__decorate([
    typeorm_1.ManyToMany(() => CourseOffering_entity_1.CourseOffering, { nullable: true }),
    __metadata("design:type", Promise)
], Teacher.prototype, "asAdditionalTeacher_courseOfferings", void 0);
Teacher = __decorate([
    typeorm_1.Entity()
], Teacher);
exports.Teacher = Teacher;
