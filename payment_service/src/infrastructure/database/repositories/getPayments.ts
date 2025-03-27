import mongoose, { Types } from "mongoose";
import { Payment } from "../models/paymentModel";
import { Role } from "../../../domain/entities";
import { paymentDetailsProps } from "../../../domain/entities/paymentEntity";

export const getPayments = async (data:{studentId:string,role:string}): Promise<paymentDetailsProps[]|[]> => {
    try {
        const {studentId,role}=data;
        const Id = new Types.ObjectId(studentId)     
        let payments;
        if(role == Role.student){
         payments = await Payment.aggregate([
            {$match:{studentId:Id}},
            {
                $lookup: {
                    from: "courses",
                    localField: "courseId",
                    foreignField: "_id",
                    as: "courseDetails",
                },
            },
            {
                $unwind: "$courseDetails",
            },
            {
                $lookup: {
                    from: "users",
                    localField: "instructorId",
                    foreignField: "_id",
                    as: "instructorDetails",
                },
            },
            {
                $unwind: "$instructorDetails",
            },
            {
                $sort: { createdAt: -1 } // Sorting in descending order
            },
            {
                $project: {
                    _id: 1,
                    courseTitle: "$courseDetails.title",
                    amount: 1,
                    dateOfPurchase: "$createdAt",
                    receipt: 1,
                    instructorName: "$instructorDetails.name",
                },
            },
        ]);
    }
    else if(role == Role.instructor){
        payments = await Payment.aggregate([
            {$match:{instructorId:Id}},
           {
               $lookup: {
                   from: "courses",
                   localField: "courseId",
                   foreignField: "_id",
                   as: "courseDetails",
               },
           },
           {
               $unwind: "$courseDetails",
           },
           {
               $lookup: {
                   from: "users",
                   localField: "studentId",
                   foreignField: "_id",
                   as: "instructorDetails",
               },
           },
           {
               $unwind: "$instructorDetails",
           },
           {
               $sort: { createdAt: -1 } // Sorting in descending order
           },
           {
               $project: {
                   _id: 1,
                   courseTitle: "$courseDetails.title",
                   amount: 1,
                   dateOfPurchase: "$createdAt",
                   receipt: 1,
                   studentName: "$instructorDetails.name",
               },
           },
       ]);
       
   }
        console.log(payments, " repo data ");
        return payments??[];
    } catch (error) {
        throw new Error((error as Error)?.message);
    }
};
