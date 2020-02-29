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
This is for holding basic school info. Related to Dean, Sec as users
Also related to courses and programs owned - lazily related.
*/
const typeorm_1 = require("typeorm");
const AuditColumn_entity_1 = require("./AuditColumn.entity");
const User_entity_1 = require("./User.entity");
const class_validator_1 = require("class-validator");
const Department_entity_1 = require("./Department.entity");
let School = class School extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], School.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], School.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object
    //Below is a one-to-one relation between department and head as user. 
    //See https://github.com/typeorm/typeorm/blob/master/docs/one-to-one-relations.md
    )
], School.prototype, "otherSchoolInfo", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_entity_1.User, { nullable: true }),
    typeorm_1.JoinColumn() //JoinColumn must be set only on one side. The side will contain the foreign key named here userId by default syntax
    ,
    __metadata("design:type", User_entity_1.User)
], School.prototype, "currentDean", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_entity_1.User, { nullable: true }),
    typeorm_1.JoinColumn() //JoinColumn must be set only on one side. The side will contain the foreign key named here userId by default syntax
    ,
    __metadata("design:type", User_entity_1.User)
], School.prototype, "currentDeputyDean", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_entity_1.User, { nullable: true }),
    typeorm_1.JoinColumn() //JoinColumn must be set only on one side. The side will contain the foreign key named here userId by default syntax
    ,
    __metadata("design:type", User_entity_1.User)
], School.prototype, "currentSecretaryOfSchool", void 0);
__decorate([
    typeorm_1.OneToMany(() => Department_entity_1.Department, department => department.school, { nullable: true }),
    __metadata("design:type", Promise)
], School.prototype, "departments", void 0);
School = __decorate([
    typeorm_1.Entity() //You can change the table name
], School);
exports.School = School;
