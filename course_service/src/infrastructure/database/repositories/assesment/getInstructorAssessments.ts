
import mongoose from "mongoose";
import { AssessmentView } from "../../../../domain/entities/assesmentEntity";
import { Course, Enrollment } from "../../models";
import { Assessment } from "../../models/assesmentModel";

export const getInstructorAssessments = async (
  instructorId: string
): Promise<AssessmentView[]> => {
  try {
    if (!instructorId) throw new Error("Instructor Id is required");

    // Step 1: Get all courses by this instructor
    const courses = await Course.find({ instructorRef: instructorId });

    const courseIds = courses.map(course => new mongoose.Types.ObjectId(course._id));
    console.log("Course IDs for assessment query:", courseIds);
    
    const enrollments = await Enrollment.find({ courseId: { $in: courseIds } })
    .populate("studentId") // 👈 Will populate user object
    .populate({
        path: "courseId",
        populate: {
          path: "instructorRef", // this tells Mongoose to populate the user document inside course
          model: "User"
        }
      });
    
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(">>>>>>>>>>>>assesments in repo nowww...>>>>>>",enrollments,courseIds)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    // Step 3: Map to AssessmentView[]
    const result: AssessmentView[] = enrollments.map((enrollment: any) => {
     const course = enrollment.courseId;
      const student = enrollment.studentId;

      return {
        courseTitle: course?.title || "",
        instructorName: course?.instructorRef?.name || "N/A",
        lessonsCount: course?.lessons?.length || 0,
        status: enrollment.isTestCompleted,
        mark: enrollment.mark,
        certificateUrl: enrollment.certificateUrl || "",
        studentName: student?.name || "",
        studentEmail: student?.email || "",
      };
    });

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(">>>>>>>>>>>>Instructor id in repo nowww...>>>>>>",result)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    return result;
  } catch (err) {
    console.error("Error in getInstructorAssessments:", err);
    throw err;
  }
};
