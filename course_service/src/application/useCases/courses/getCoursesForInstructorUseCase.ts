import { constant } from "../../../_lib/common/constant";
import { CourseEntity } from "../../../domain/entities/courseEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const getCoursesForInstructorUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getCoursesForInstructor}}=dependencies
    return{
        execute: async (
            page?: number,
            limit?: number,
            id?:string
          ):Promise<{ data: CourseEntity[]; totalCount: number } | null>=>{
            try {
                let result = await getCoursesForInstructor(page, limit,id);
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