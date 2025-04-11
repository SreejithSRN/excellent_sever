import { CourseEntity } from "../../entities/courseEntity";

export interface IGetStudentMyCoursesUseCase{
   execute(
         page?: number,
         limit?: number,
         id?:string
       ): Promise<{ data: CourseEntity[]; totalCount: number } | null>;
}