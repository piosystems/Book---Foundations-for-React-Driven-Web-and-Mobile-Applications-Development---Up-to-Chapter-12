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
This is for holding basic department info. Related to HOD, Sec as users
Also related to courses and programs owned - lazily related.
*/
const typeorm_1 = require("typeorm");
const AuditColumn_entity_1 = require("./AuditColumn.entity");
const User_entity_1 = require("./User.entity");
const Course_entity_1 = require("./Course.entity");
const Program_entity_1 = require("./Program.entity");
const School_entity_1 = require("./School.entity");
const class_validator_1 = require("class-validator");
let Department = class Department extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], Department.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object
    //Below is a one-to-one relation between department and head as user. 
    //See https://github.com/typeorm/typeorm/blob/master/docs/one-to-one-relations.md
    )
], Department.prototype, "otherDepartmentalInfo", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_entity_1.User, { nullable: true }),
    typeorm_1.JoinColumn() //JoinColumn must be set only on one side. The side will contain the foreign key named here userId by default syntax
    ,
    __metadata("design:type", User_entity_1.User)
], Department.prototype, "currentHeadOfDepartment", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_entity_1.User, { nullable: true }),
    typeorm_1.JoinColumn() //JoinColumn must be set only on one side. The side will contain the foreign key named here userId by default syntax
    ,
    __metadata("design:type", User_entity_1.User)
], Department.prototype, "currentSecretaryOfDepartment", void 0);
__decorate([
    typeorm_1.ManyToOne(() => School_entity_1.School, school => school.departments, { nullable: true }),
    __metadata("design:type", School_entity_1.School)
], Department.prototype, "school", void 0);
__decorate([
    typeorm_1.OneToMany(() => Course_entity_1.Course, course => course.department, { nullable: true }),
    __metadata("design:type", Promise)
], Department.prototype, "courses", void 0);
__decorate([
    typeorm_1.OneToMany(() => Program_entity_1.Program, program => program.department, { nullable: true }),
    __metadata("design:type", Promise)
], Department.prototype, "programs", void 0);
Department = __decorate([
    typeorm_1.Entity() //You can change the table name
], Department);
exports.Department = Department;
