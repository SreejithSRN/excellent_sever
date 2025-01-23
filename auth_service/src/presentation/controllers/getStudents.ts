import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getStudentsController = (dependencies: IDependencies) => {
    const { useCases } = dependencies;
    const { getStudentsUseCase } = useCases;

   
    const isValidNumber = (value: any) => !isNaN(parseInt(value, 10));

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // console.log(req.query, "Incoming request to getStudents...");

            const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

         
            if (!isValidNumber(page)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid page number",
                });
                return;
            }

            if (!isValidNumber(limit)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid limit number",
                });
                return;
            }

           
            const result = await getStudentsUseCase(dependencies).execute(page, limit);
            if (!result) {
                res.status(404).json({ success: false, message: "No students found" });
                return;
              }
            console.log(`Fetched result for page ${page} and limit ${limit}:`, result);

            const { data, totalCount } = result;
            res.status(200).json({
                success: true,
                data,totalCount,
                message: "All students fetched successfully",
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
          }
    };
};
