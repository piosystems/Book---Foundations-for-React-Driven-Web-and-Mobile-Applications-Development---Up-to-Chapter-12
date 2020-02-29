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
 * Role is for many to many with users and also one to many with permissions
 */
const typeorm_1 = require("typeorm");
const AuditColumn_entity_1 = require("./AuditColumn.entity");
const User_entity_1 = require("./User.entity");
const class_validator_1 = require("class-validator");
let Role = class Role extends AuditColumn_entity_1.AuditColumn {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }) //setting primary to true here means that this is unique
    ,
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToMany(_type => User_entity_1.User, user => user.roles, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Promise)
], Role.prototype, "users", void 0);
Role = __decorate([
    typeorm_1.Entity() //You can change the table name
], Role);
exports.Role = Role;
