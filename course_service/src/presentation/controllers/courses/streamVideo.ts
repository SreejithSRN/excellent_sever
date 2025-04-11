import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import axios from "axios";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { env_variables } from "../../../_boot/config";

export const streamVideoController = (dependencies: IDependencies) => {
  const {
    useCases: { streamVideoUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { courseId, lessonId } = req.params;

      const course = await streamVideoUseCase(dependencies).execute(courseId);

      if (!course || !course.lessons) {
        res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "No course found with this courseId",
          data: {},
        });
        return;
      }

      const lesson = course.lessons.find(
        (lesson) => lesson.lessonNumber === Number(lessonId)
      );

      if (!lesson || typeof lesson.video !== "string") {
        res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "No lesson found with this lessonId",
          data: {},
        });
        return;
      }

      const videoUrl = lesson.video;
      const range = req.headers.range;

      if (!range) {
        res.status(400).send("Requires Range header");
        return;
      }

      // Stream video from Cloudinary (or any CDN)
      const cloudinaryResponse = await axios.get(videoUrl, {
        headers: {
          Range: range,
        },
        responseType: "stream",
      });

      // Set appropriate CORS and streaming headers
      res.status(cloudinaryResponse.status);
      res.set({
        ...cloudinaryResponse.headers,
        "Access-Control-Allow-Origin":
          env_variables.FRONTEND_URL || "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Expose-Headers":
          "Content-Range, Content-Length, Accept-Ranges",
        "Accept-Ranges": "bytes",
      });

      cloudinaryResponse.data.pipe(res);
    } catch (error) {
      console.error("Streaming error:", error);
      next(error);
    }
  };
};







































// import { NextFunction, Request, Response } from "express";
// import { IDependencies } from "../../../application/interfaces/IDependencies";
// import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
// import axios from "axios";

// export const streamVideoController = (dependencies: IDependencies) => {
//   const {
//     useCases: { streamVideoUseCase },
//   } = dependencies;

//   return async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const { courseId, lessonId } = req.params;

//       const course = await streamVideoUseCase(dependencies).execute(courseId);
      

//       if (!course || !course.lessons) {
//         res.status(httpStatusCode.NOT_FOUND).json({
//           success: false,
//           message: "No course found with this courseId",
//           data: {},
//         });
//         return; // Return void, not the response object
//       }

//       const lesson = course.lessons.find(
//         (lesson) => lesson.lessonNumber == Number(lessonId)
//       );
 
//       if (!lesson) {
//         res.status(httpStatusCode.NOT_FOUND).json({
//           success: false,
//           message: "No lesson found with this lessonId",
//           data: {},
//         });
//         return; // Return void, not the response object
//       }

//       const videoUrl =
//         typeof lesson.video === "string" ? lesson.video : undefined;
//       console.log("Video URL:", videoUrl);
//       // Handle range requests
//       const range = req.headers.range;

   
//       if (!range) {
//         res.redirect(videoUrl as string);
//         return; // Return void, not the response object
//       }
//       // Get video info with a HEAD request
//       const headResponse = await axios({
//         method: "HEAD",
//         url: videoUrl,
//       });

//       const contentLength = headResponse.headers["content-length"];

//       console.log("............................>>>>>>>>>>>>>>>>>>>>>>>")
//       console.log("iam here with credentials in controller",contentLength)
//       console.log("............................>>>>>>>>>>>>>>>>>>>>>>>") 
//       console.log("............................>>>>>>>>>>>>>>>>>>>>>>>")

//       if (!contentLength) {
//         res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
//           success: false,
//           message: "Could not determine video size",
//           data: {},
//         });
//         return; // Return void, not the response object
//       }

//       const fileSize = parseInt(contentLength);
//       // Parse the range header
//       const parts = range.replace(/bytes=/, "").split("-");
//       const start = parseInt(parts[0]);
//       const end = parts[1] ? parseInt(parts[1]) : fileSize - 1;

//       // Calculate the chunk size
//       const chunkSize = end - start + 1;
//       res.writeHead(206, {
//         'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//         'Accept-Ranges': 'bytes',
//         'Content-Length': chunkSize,
//         'Content-Type': 'video/mp4'
//       });
      

//       // res.writeHead(206, {
//       //   "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       //   "Accept-Ranges": "bytes",
//       //   "Content-Length": chunkSize,
//       //   "Content-Type": "video/mp4",
      
//       //   // Proper CORS headers
//       //   "Access-Control-Allow-Origin": req.headers.origin || "http://localhost:3000",
//       //   "Access-Control-Allow-Credentials": "true",
//       //   "Access-Control-Expose-Headers": "Content-Range, Content-Length, Accept-Ranges",
//       // });
      

//       // res.writeHead(206, {
//       //   "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       //   "Accept-Ranges": "bytes",
//       //   "Content-Length": chunkSize,
//       //   "Content-Type": "video/mp4",
      
//       //   // Crucial CORS headers for video streaming
//       //   "Access-Control-Allow-Origin": "*", // or specific domain
//       //   "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
//       //   "Access-Control-Allow-Headers": "Range",
//       //   "Access-Control-Expose-Headers": "Content-Range, Content-Length, Accept-Ranges",
//       // });      


//       // Stream the video chunk
//       const videoResponse = await axios({
//         method: "get",
//         url: videoUrl,
//         responseType: "stream",
//         headers: {
//           Range: `bytes=${start}-${end}`,
//         },
//       });

//       // Pipe to response
//       videoResponse.data.pipe(res);
//       // No return statement needed after pipe() since it's handled asynchronously
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         throw new Error(error.message);
//       }
//       throw new Error("An unknown error occurred");
//     }
//   };
// };
