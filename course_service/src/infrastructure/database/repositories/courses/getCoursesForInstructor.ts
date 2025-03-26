import { CourseEntity } from "../../../../domain/entities/courseEntity";
import { Course } from "../../models/courseModel";
import { Types } from "mongoose";

export const getCoursesForInstructor = async (
  page?: number,
  limit?: number,
  id?: string
): Promise<{ data: CourseEntity[]; totalCount: number } | null> => {
  try {
    const validPage = page && page > 0 ? page : 1;
    const validLimit = limit && limit > 0 ? limit : 10;
    const skipNo = (validPage - 1) * validLimit;

    console.log(`Page: ${validPage}, Limit: ${validLimit}, Skip: ${skipNo}, ID: ${id}`);

    if (!id || !Types.ObjectId.isValid(id)) {
      console.warn("Invalid or missing ID provided.");
      return { data: [], totalCount: 0 };
    }

    const objectId = new Types.ObjectId(id);

    const [rawData, totalCount] = await Promise.all([
      Course.find({ instructorRef: objectId }) 
        .populate("categoryRef")
        .populate("instructorRef")
        .sort({ updatedAt: "descending" })
        .skip(skipNo)
        .limit(validLimit)
        .lean(),
      Course.countDocuments({ instructorRef: objectId }), 
    ]);

    console.log(rawData, "data for the instructor courses")

    if (!rawData.length) {
      console.warn("No courses found for the given ID.");
      return { data: [], totalCount: 0 };
    }

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

    console.log("Fetched courses:", data);
    return { data, totalCount };
  } catch (error: unknown) {
    console.error("Error in getCoursesForInstructor:", error);
    return null;
  }
};

