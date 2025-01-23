import { CategoryEntity } from "../../../../domain/entities";
import { Category } from "../../models";

export const getCategories = async (
    page?: number,
    limit?: number
  ): Promise<{ data: CategoryEntity[]; totalCount: number } | null> => {
    try {

      // console.log("iam here in repository of getcategories")
      const validPage = page && page > 0 ? page : 1;
      const validLimit = limit && limit > 0 ? limit : 10;
      const skipNo = (validPage - 1) * validLimit;
      const [data, totalCount] = await Promise.all([
        Category.find({  })
          .sort({ updatedAt: "descending" })
          .skip(skipNo)
          .limit(validLimit),
        Category.countDocuments({  }),
      ]);
      return { data, totalCount };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      return null;
    }
  };