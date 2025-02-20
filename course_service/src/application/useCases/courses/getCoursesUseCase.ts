import { constant } from "../../../_lib/common/constant";
import { CourseEntity } from "../../../domain/entities/courseEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const getCoursesUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getCourses}}=dependencies
    return {
        execute: async (
          page?: number,
          limit?: number
        ): Promise<{ data: CourseEntity[]; totalCount: number } | null> => {
          try {           
            let result = await getCourses(page, limit);
            return result
          } catch (error: constant) {
            throw new Error(error?.message || "Error in getCourses usecases");
          }
        },
      };

}