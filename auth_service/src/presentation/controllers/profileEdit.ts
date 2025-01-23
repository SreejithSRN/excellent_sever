import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

export const profileEditController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;
  const { profileEditUseCase } = useCases;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;      
      const result = await profileEditUseCase(dependencies).execute(data);
      if (result) {
        res.status(httpStatusCode.OK).json({
          success: true,
          data: null,
          message: "Profile Updated successfully",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };
};
