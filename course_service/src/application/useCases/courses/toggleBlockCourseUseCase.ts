import { constant } from "../../../_lib/common/constant";
import { IDependencies } from "../../interfaces/IDependencies";

export const toggleBlockCourseUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { toggleBlockCourse },
  } = dependencies;
  return {
    execute: async (id: string) => {
      try {
        console.log(id, "iam from toggleBlockCourse Usecase");
        const result = await toggleBlockCourse(id);
        return result;
      } catch (error: constant) {
        throw new Error(
          error?.message || "Error in toggleBlockCourse usecases"
        );
      }
    },
  };
};
