import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

export const getPaymentController = (dependencies: IDependencies) => {
  const {
    useCases: { getPaymentUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentId = req.user?._id;
      const role = req.user?.role
      if (!studentId&&!role) {
        throw new Error("Student ID is missing");
      }
      const data = {studentId: studentId as string,role:role as string}

      const result = await getPaymentUseCase(dependencies).execute(data);

   
      if(!result){
        res.status(httpStatusCode.NOT_ACCEPTABLE).json({
            success: false,
            message: "All Payments fetch failed"
        })
    }

 res.status(httpStatusCode.OK).json({
        success: true,
        data: result,
        message: "all Payments fetched"
    })

      console.log(result, "iam in the sflbsfbjkbdfjbkf");

    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred in add Category");
    }
  };
};
