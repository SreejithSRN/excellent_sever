// import mongoose, { Types } from "mongoose";
// import { Payment } from "../models/paymentModel";
// import { Role } from "../../../domain/entities";
// import { paymentDetailsProps } from "../../../domain/entities/paymentEntity";

// export const getPayments = async (data:{studentId:string,role:string}): Promise<paymentDetailsProps[]|[]> => {
//     try {
//         const {studentId,role}=data;
//         const Id = new Types.ObjectId(studentId)     
//         let payments;
//         if(role == Role.student){
//          payments = await Payment.aggregate([
//             {$match:{studentId:Id}},
//             {
//                 $lookup: {
//                     from: "courses",
//                     localField: "courseId",
//                     foreignField: "_id",
//                     as: "courseDetails",
//                 },
//             },
//             {
//                 $unwind: "$courseDetails",
//             },
//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "instructorId",
//                     foreignField: "_id",
//                     as: "instructorDetails",
//                 },
//             },
//             {
//                 $unwind: "$instructorDetails",
//             },
//             {
//                 $sort: { createdAt: -1 } // Sorting in descending order
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     courseTitle: "$courseDetails.title",
//                     amount: 1,
//                     dateOfPurchase: "$createdAt",
//                     receipt: 1,
//                     instructorName: "$instructorDetails.name",
//                 },
//             },
//         ]);
//     }
//     else if(role == Role.instructor){
//         payments = await Payment.aggregate([
//             {$match:{instructorId:Id}},
//            {
//                $lookup: {
//                    from: "courses",
//                    localField: "courseId",
//                    foreignField: "_id",
//                    as: "courseDetails",
//                },
//            },
//            {
//                $unwind: "$courseDetails",
//            },
//            {
//                $lookup: {
//                    from: "users",
//                    localField: "studentId",
//                    foreignField: "_id",
//                    as: "instructorDetails",
//                },
//            },
//            {
//                $unwind: "$instructorDetails",
//            },
//            {
//                $sort: { createdAt: -1 } // Sorting in descending order
//            },
//            {
//                $project: {
//                    _id: 1,
//                    courseTitle: "$courseDetails.title",
//                    amount: 1,
//                    dateOfPurchase: "$createdAt",
//                    receipt: 1,
//                    studentName: "$instructorDetails.name",
//                },
//            },
//        ]);
       
//    }
//         console.log(payments, " repo data ");
//         return payments??[];
//     } catch (error) {
//         throw new Error((error as Error)?.message);
//     }
// };


// import mongoose, { Types } from "mongoose";
// import { Payment } from "../models/paymentModel";
// import { Role } from "../../../domain/entities";
// import { paymentDetailsProps } from "../../../domain/entities/paymentEntity";

// export const getPayments = async (data: {
//   studentId: string;
//   role: string;
//   page?: number;
//   limit?: number;
// }): Promise<{ payments: paymentDetailsProps[]; totalCount: number }> => {
//   try {
//     const { studentId, role, page = 1, limit = 10 } = data;
//     const skip = (page - 1) * limit;
//     const Id = new Types.ObjectId(studentId);

//     let matchStage = {};
//     let nameField = "";

//     if (role === Role.student) {
//       matchStage = { studentId: Id };
//       nameField = "instructorDetails.name";
//     } else if (role === Role.instructor) {
//       matchStage = { instructorId: Id };
//       nameField = "instructorDetails.name"; // this is actually the student's name
//     }

//     const aggregationPipeline: any[] = [
//       { $match: matchStage },
//       {
//         $lookup: {
//           from: "courses",
//           localField: "courseId",
//           foreignField: "_id",
//           as: "courseDetails",
//         },
//       },
//       { $unwind: "$courseDetails" },
//       {
//         $lookup: {
//           from: "users",
//           localField: role === Role.student ? "instructorId" : "studentId",
//           foreignField: "_id",
//           as: "instructorDetails",
//         },
//       },
//       { $unwind: "$instructorDetails" },
//       { $sort: { createdAt: -1 } },
//       {
//         $project: {
//           _id: 1,
//           courseTitle: "$courseDetails.title",
//           amount: 1,
//           dateOfPurchase: "$createdAt",
//           receipt: 1,
//           [role === Role.student ? "instructorName" : "studentName"]: "$instructorDetails.name",
//         },
//       },
//       {
//         $facet: {
//           paginatedResults: [{ $skip: skip }, { $limit: limit }],
//           totalCount: [{ $count: "count" }],
//         },
//       },
//     ];

//     const results = await Payment.aggregate(aggregationPipeline);
//     const payments = results[0]?.paginatedResults || [];
//     const totalCount = results[0]?.totalCount?.[0]?.count || 0;

//     return { payments, totalCount };
//   } catch (error) {
//     throw new Error((error as Error)?.message);
//   }
// };


import mongoose, { Types } from "mongoose";
import { Payment } from "../models/paymentModel";
import { Role } from "../../../domain/entities";
import { paymentDetailsProps } from "../../../domain/entities/paymentEntity";

export const getPayments = async (data: {
  studentId: string;
  role: string;
  page?: number;
  limit?: number;
}): Promise<{
  payments: paymentDetailsProps[];
  totalCount: number;
  totalAmount: number;
  totalCourses: number;
}> => {
  try {
    const { studentId, role, page = 1, limit = 10 } = data;
    const skip = (page - 1) * limit;
    const Id = new Types.ObjectId(studentId);

    let matchStage = {};
    if (role === Role.student) {
      matchStage = { studentId: Id };
    } else if (role === Role.instructor) {
      matchStage = { instructorId: Id };
    }

    const aggregationPipeline: any[] = [
      { $match: matchStage },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" },
      {
        $lookup: {
          from: "users",
          localField: role === Role.student ? "instructorId" : "studentId",
          foreignField: "_id",
          as: "instructorDetails",
        },
      },
      { $unwind: "$instructorDetails" },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          paginatedResults: [
            {
              $project: {
                _id: 1,
                courseTitle: "$courseDetails.title",
                amount: 1,
                dateOfPurchase: "$createdAt",
                receipt: 1,
                [role === Role.student
                  ? "instructorName"
                  : "studentName"]: "$instructorDetails.name",
              },
            },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [{ $count: "count" }],
          totalAmount: [{ $group: { _id: null, total: { $sum: "$amount" } } }],
          uniqueCourses: [
            {
              $group: {
                _id: null,
                uniqueCourses: { $addToSet: "$courseId" },
              },
            },
            {
              $project: {
                totalCourses: { $size: "$uniqueCourses" },
              },
            },
          ],
        },
      },
    ];

    const results = await Payment.aggregate(aggregationPipeline);
    const payments = results[0]?.paginatedResults || [];
    const totalCount = results[0]?.totalCount?.[0]?.count || 0;
    const totalAmount = results[0]?.totalAmount?.[0]?.total || 0;
    const totalCourses = results[0]?.uniqueCourses?.[0]?.totalCourses || 0;

    return { payments, totalCount, totalAmount, totalCourses };
  } catch (error) {
    throw new Error((error as Error)?.message);
  }
};


