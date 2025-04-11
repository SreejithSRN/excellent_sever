import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";

export const studentAssessmentsListController = (dependencies: IDependencies) => {
  const {
    useCases: { studentAssessmentsListUseCase},
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studentId = req.user?._id as string; console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log(">>>>>>>>>>>>>>>>>>>>>",studentId)
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    

      if (!studentId) {
        res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Unauthorized access. Student ID not found.",
        });
        return;
      }

      const assessments = await studentAssessmentsListUseCase(dependencies).execute( studentId );

      res.status(httpStatusCode.OK).json({
        success: true,
        data: assessments,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "An unknown error occurred in studentAssessmentsListController.",
        });
      }
    }
  };
};
