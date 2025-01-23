import { UserEntity } from "../../../domain/entities";
import { User } from "../models";

export const getStudents = async (
  page?: number,
  limit?: number
): Promise<{ data: UserEntity[]; totalCount: number } | null> => {
  try {
    const validPage = page && page > 0 ? page : 1;
    const validLimit = limit && limit > 0 ? limit : 10;
    const skipNo = (validPage - 1) * validLimit;
    const [data, totalCount] = await Promise.all([
      User.find({ role: "student" })
        .sort({ updatedAt: "descending" })
        .skip(skipNo)
        .limit(validLimit),
      User.countDocuments({ role: "student" }),
    ]);
    return { data, totalCount };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return null;
  }
};
