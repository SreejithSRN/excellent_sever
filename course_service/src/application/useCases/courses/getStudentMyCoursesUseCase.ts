import { constant } from "../../../_lib/common/constant";
import { CourseEntity } from "../../../domain/entities/courseEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const getStudentMyCoursesUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getStudentMyCourses}}=dependencies
    return{
        execute: async (
            page?: number,
            limit?: number,
            id?:string
          ):Promise<{ data: CourseEntity[]; totalCount: number } | null>=>{
            try {
                let result = await getStudentMyCourses(page, limit,id);
                return result
                
            } catch (error: unknown) {
                if (error instanceof Error) {
                  throw new Error(error.message);
                }
                throw new Error("An unknown error occurred");
              }
        }
    }
}