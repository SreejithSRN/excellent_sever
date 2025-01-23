import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

export const approveRejectController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;
  const {approveRejectUseCase } = useCases;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const result = await approveRejectUseCase(dependencies).execute(email);
      console.log(result, "iam in approveReject controller..........");

      res.status(httpStatusCode.OK).json({
        success: true,
        data: {},
        message: "Approved/reject successful",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };
};
