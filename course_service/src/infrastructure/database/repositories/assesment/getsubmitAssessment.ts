

import { AssessmentEntity } from "../../../../domain/entities/assesmentEntity";
import { Assessment } from "../../models/assesmentModel";
import { Enrollment } from "../../models/enrollmentModel";

export const getsubmitAssessment = async (
  courseId: string,
  answers: string[],
  studentId: string
) => {
  try {
    if (!courseId) {
      throw new Error("Course ID is required");
    }

    const assessment = await Assessment.findOne({ courseRef: courseId }).lean();

    if (!assessment || !assessment.questions || assessment.questions.length === 0) {
      throw new Error("No assessment found or it has no questions");
    }

    const totalQuestions = assessment.questions.length;
    const correctAnswers = assessment.questions.map((q: any) => q.answerKey);

    let score = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (answers[i] === correctAnswers[i]) {
        score++;
      }
    }

    const mark = parseFloat(((score / totalQuestions) * 100).toFixed(2));
    const isPassed = mark >= 50;

    // ✅ Update Enrollment only if passed
    if (isPassed) {
      await Enrollment.findOneAndUpdate(
        { courseId, studentId },
        {
          $set: {
            isTestCompleted: true,
            mark: mark,
          },
        },
        { new: true }
      );
    }

    return {
      assessment: assessment as AssessmentEntity,
      score,
      mark,
      isPassed,
    };
  } catch (err) {
    console.error("❌ Error in getsubmitAssessment:", err);
    throw err;
  }
};
