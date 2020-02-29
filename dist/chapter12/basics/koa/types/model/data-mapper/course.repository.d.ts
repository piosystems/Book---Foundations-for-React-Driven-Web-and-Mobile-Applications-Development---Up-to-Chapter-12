import { Repository } from "typeorm";
import { Course } from "../entity/Course.entity";
export declare class CourseRepository extends Repository<Course> {
    insertCourses(courses: Course[]): Promise<import("typeorm").InsertResult>;
    updateCourse(courseId: number, editedCourseData: Course): Promise<import("typeorm").UpdateResult>;
    deleteCourse(courseId: number): Promise<import("typeorm").DeleteResult>;
    findByCode(code: string): Promise<Course | undefined>;
    setDepartment(courseId: number, departmentId: number): Promise<void>;
    unsetDepartment(courseId: number): Promise<void>;
    findByCourseId_LeftJoinDepartment(courseId: number): Promise<Course | undefined>;
}
