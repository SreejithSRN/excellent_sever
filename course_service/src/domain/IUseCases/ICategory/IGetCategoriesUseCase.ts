import { CategoryEntity } from "../../entities";

export interface IGetCategoriesUseCase {
    execute(
      page?: number,
      limit?: number
    ): Promise<{ data: CategoryEntity[]; totalCount: number } | null>;
  }