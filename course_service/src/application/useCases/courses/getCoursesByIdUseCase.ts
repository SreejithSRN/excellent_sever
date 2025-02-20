import { constant } from "../../../_lib/common/constant";
import { CourseEntity } from "../../../domain/entities/courseEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const getCoursesByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getCoursesById },
  } = dependencies;
  return {
    execute: async (data: string): Promise<CourseEntity> => {
      try {
        const result = await getCoursesById(data);
        if (!result) {
          throw new Error(
            "Something went wrong while fetching the course details in usecase"
          );
        }      
        return result;
      } catch (error: constant) {
        throw new Error(error?.message || "Error in getCoursesById usecases");
      }
    },
  };
};
