import { CourseEntity } from "../../../../domain/entities/courseEntity";
import { Enrollment } from "../../models/enrollmentModel";
import { Types } from "mongoose";

export const getStudentMyCourses = async (
  page?: number,
  limit?: number,
  studentId?: string
): Promise<{ data: CourseEntity[]; totalCount: number } | null> => {
  try {
    const validPage = page && page > 0 ? page : 1;
    const validLimit = limit && limit > 0 ? limit : 10;
    const skipNo = (validPage - 1) * validLimit;

    if (!studentId || !Types.ObjectId.isValid(studentId)) {
      return { data: [], totalCount: 0 };
    }

    const objectId = new Types.ObjectId(studentId);

    const [rawData, totalCount] = await Promise.all([
      Enrollment.aggregate([
        { $match: { studentId: objectId } },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        { $unwind: "$courseDetails" },
        { $sort: { "courseDetails.updatedAt": -1 } },
        { $skip: skipNo },
        { $limit: validLimit },
        {
          $project: {
            _id: "$courseDetails._id",
            title: "$courseDetails.title",
            description: "$courseDetails.description",
            categoryRef: "$courseDetails.categoryRef",
            instructorRef: "$courseDetails.instructorRef",
            language: "$courseDetails.language",
            level: "$courseDetails.level",
            pricing: "$courseDetails.pricing",
            thumbnail: "$courseDetails.thumbnail",
            lessons: "$courseDetails.lessons",
            createdAt: "$courseDetails.createdAt",
            updatedAt: "$courseDetails.updatedAt",
            isTestCompleted: 1,
            mark: 1,
            isPassed: {
              $gte: ["$mark", 50],
            },
          },
        },
      ]),
      Enrollment.countDocuments({ studentId: objectId }),
    ]);

    const data: CourseEntity[] = rawData.map((course) => {
      // Sanitize lessons by removing video field
      const sanitizedLessons = Array.isArray(course.lessons)
        ? course.lessons.map((lesson: any) => ({
            ...lesson,
            video: "", // blank out video
            _id: lesson._id?.toString() || "", // convert _id if it exists
          }))
        : [];

      return {
        ...course,
        _id: (course._id as Types.ObjectId).toString(),
        categoryRef: course.categoryRef
          ? (course.categoryRef as Types.ObjectId).toString()
          : undefined,
        instructorRef: course.instructorRef
          ? (course.instructorRef as Types.ObjectId).toString()
          : undefined,
        lessons: sanitizedLessons,
      };
    });

    return { data, totalCount };
  } catch (error: unknown) {
    console.error("Error in getStudentMyCourses:", error);
    return null;
  }
};
