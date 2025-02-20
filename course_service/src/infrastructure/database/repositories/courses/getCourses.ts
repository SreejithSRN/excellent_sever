import { CourseEntity } from "../../../../domain/entities/courseEntity";
import { Course } from "../../models/courseModel";

import { Types } from "mongoose";
import { User } from "../../models/userModel";
import { Category } from "../../models";

export const getCourses = async (
  page?: number,
  limit?: number
): Promise<{ data: CourseEntity[]; totalCount: number } | null> => {
  try {
    const validPage = page && page > 0 ? page : 1;
    const validLimit = limit && limit > 0 ? limit : 10;
    const skipNo = (validPage - 1) * validLimit;

    const [rawData, totalCount] = await Promise.all([
      Course.find({})
        .populate("categoryRef") // Get full category data
        .populate("instructorRef") // Get full instructor data
        .sort({ updatedAt: "descending" })
        .skip(skipNo)
        .limit(validLimit)
        .lean(), // Convert to plain JavaScript objects
      Course.countDocuments({}),
    ]);   
    const data: CourseEntity[] = rawData.map((course) => ({
      ...course,
      _id: (course._id as Types.ObjectId).toString(),
      categoryRef: course.categoryRef
        ? (course.categoryRef as { _id: Types.ObjectId })._id.toString()
        : undefined,
      instructorRef: course.instructorRef
        ? (course.instructorRef as { _id: Types.ObjectId })._id.toString()
        : undefined,
    }));
    

    return { data, totalCount };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return null;
  }
};
