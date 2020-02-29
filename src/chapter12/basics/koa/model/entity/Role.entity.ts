/**
 * Role is for many to many with users and also one to many with permissions
 */
import {Entity, Column, ManyToMany} from "typeorm";
import { AuditColumn } from "./AuditColumn.entity";
import { User } from "./User.entity";
import { IsDefined } from "class-validator";

@Entity()//You can change the table name
export class Role extends AuditColumn{//AuditColumns abstract class contains fields for audit info common to all tables

    @Column({unique: true})
    @IsDefined()
    name: string;

    @Column({nullable: true})//setting primary to true here means that this is unique
    description: string;

    //define many-to-many relationship with user. See https://github.com/typeorm/typeorm/blob/master/docs/many-to-many-relations.md
    //lazy
    @ManyToMany(_type => User, user => user.roles, {nullable: true, onDelete: 'CASCADE'})
    users: Promise<User[]>;

    //Todo permissions relationship for each role

}