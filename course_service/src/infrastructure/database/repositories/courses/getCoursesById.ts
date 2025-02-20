import { CourseEntity } from "../../../../domain/entities/courseEntity";
import { Course } from "../../models";


export const getCoursesById = async (data: string): Promise<any> => {
  try {
    let result = await Course.findOne({ _id: data })
      .populate("categoryRef")
      .populate("instructorRef")
      .lean();
    if (!result) {
      throw new Error("Something went wrong while fetching the course details in repository");
    } 
    return result
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
