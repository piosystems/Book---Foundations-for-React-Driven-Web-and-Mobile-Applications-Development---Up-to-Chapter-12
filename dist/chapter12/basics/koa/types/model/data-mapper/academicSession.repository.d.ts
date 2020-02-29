import { Repository } from "typeorm";
import { AcademicSession } from "../entity/AcademicSession.entity";
export declare class AcademicSessionRepository extends Repository<AcademicSession> {
    insertAcademicSessions(academicSessions: AcademicSession[]): Promise<import("typeorm").InsertResult>;
    updateAcademicSessions(academicSessionId: number, editedAcademicSessionData: AcademicSession): Promise<import("typeorm").UpdateResult>;
    deleteAcademicSession(academicSessionId: number): Promise<import("typeorm").DeleteResult>;
    findByTitle(title: string): Promise<AcademicSession | undefined>;
    addCourseOffering(academicSessionId: number, courseOfferingId: number): Promise<void>;
    removeCourseOffering(academicSessionId: number, courseOfferingId: number): Promise<void>;
    findByAcademicSessionId_LeftJoinAndSelectCourseOfferings(academicSessionId: number): Promise<AcademicSession | undefined>;
    findByIsCurrent(isCurrent: boolean): Promise<AcademicSession[]>;
}
