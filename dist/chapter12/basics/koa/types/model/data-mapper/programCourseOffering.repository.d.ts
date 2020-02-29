import { Repository } from "typeorm";
import { ProgramCourseOffering } from "../entity/ProgramCourseOffering.entity";
import { TERM_OR_SEMESTER } from "../../settings";
export declare class ProgramCourseOfferingRepository extends Repository<ProgramCourseOffering> {
    insertProgramCourseOfferings(programCourseOfferings: ProgramCourseOffering[]): Promise<import("typeorm").InsertResult>;
    updateProgramCourseOffering(programCourseOfferingId: number, editedProgramCourseOfferingData: ProgramCourseOffering): Promise<import("typeorm").UpdateResult>;
    deleteProgramCourseOffering(programCourseOfferingId: number): Promise<import("typeorm").DeleteResult>;
    setProgram(programCourseOfferingId: number, programId: number): Promise<void>;
    unsetProgram(programCourseOfferingId: number): Promise<void>;
    setCourseOffering(programCourseOfferingId: number, courseOfferingId: number): Promise<void>;
    unsetCourseOffering(programCourseOfferingId: number): Promise<void>;
    findByProgramId_CourseOfferingId(programId: number, courseOfferingId: number): Promise<ProgramCourseOffering | undefined>;
    findByProgramId_AcademicSessionId_Semester_CourseOfferingIsActive(programId: number, academicSessionId: number, semester: TERM_OR_SEMESTER, courseOfferingActive: boolean): Promise<ProgramCourseOffering[]>;
    findByProgramId(programId: number): Promise<ProgramCourseOffering[]>;
    findByCourseOfferingId(courseOfferingId: number): Promise<ProgramCourseOffering[]>;
}
