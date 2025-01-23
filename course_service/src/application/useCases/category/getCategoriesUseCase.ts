import { constant } from "../../../_lib/common/constant";
import { CategoryEntity } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDependencies";

export const getCategoriesUseCase = (dependencies: IDependencies) => {
  const {repositories:{getCategories}} = dependencies;
  return {
    execute: async (
      page?: number,
      limit?: number
    ): Promise<{ data: CategoryEntity[]; totalCount: number } | null> => {
      try {
        console.log(page, limit);
        let result = await getCategories(page, limit);
        return result
      } catch (error: constant) {
        throw new Error(error?.message || "Error in getcategories usecases");
      }
    },
  };
};
