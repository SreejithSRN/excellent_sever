import { model, Schema } from "mongoose";
import { EnrollmentEntity } from "../../../domain/entities";

const enrollmentSchema = new Schema ({
   studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    enrolledAt: {
        type: Schema.Types.Date,
        default: function () {
            return Date.now();
        }
    }
    
})

export const Enrollment = model<EnrollmentEntity>("Enrollment",enrollmentSchema)