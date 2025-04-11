import { Types } from "mongoose";
import { AssessmentView } from "../../../../domain/entities/assesmentEntity";
import { Enrollment } from "../../models";

export const getStudentAssessments = async (
  studentId: string
): Promise<AssessmentView[]> => {
  try {
    if (!studentId) throw new Error("Student ID is required");

    const enrollments = await Enrollment.find({
      studentId: new Types.ObjectId(studentId),
    })
      .populate({
        path: "courseId",
        select: "title instructorRef lessons",
        populate: {
          path: "instructorRef",
          select: "name",
        },
      })
      .populate({
        path: "studentId",
        select: "name",
      })
      .lean();

    if (!enrollments || enrollments.length === 0) {
      return [];
    }

    const formatted: AssessmentView[] = enrollments.map((enroll: any) => ({
      courseTitle: enroll.courseId?.title ?? "Untitled",
      instructorName: enroll.courseId?.instructorRef?.name ?? "N/A",
      lessonsCount: enroll.courseId?.lessons?.length ?? 0,
      status: enroll.isTestCompleted ?? false,
      mark: enroll.mark ?? 0,
      certificateUrl: enroll.certificateUrl ?? null,
      studentName: enroll.studentId?.name ?? "Student",
    }));

    return formatted;
  } catch (err) {
    console.error("Error in getStudentAssessments:", err);
    throw err;
  }
};
