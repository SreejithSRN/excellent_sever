import {
  IAddCategoryUseCase,
  IGetCategoriesUseCase,
  IBlockUnblockCatUseCase,
  IAddCourseUseCase,
  IGetCoursesUseCase,
  IGetCoursesByIdUseCase,
  IToggleBlockCourseUseCase,
  IGetCoursesForInstructorUseCase,IAddEnrollmentUseCase,
  ICheckEmrollmentUseCase,
  IStreamVideoUseCase,
  IGetMyCoursesByIdUseCase,
  ICreateAssessmentUseCase,
  IGetInstructorAssessmentsUseCase,
  IDeleteAssessmentUseCase,
  IGetTestAssessmentUseCase,
  ISubmitAssessmentUseCase,
  IStudentAssessmentsListUseCase
  
} from "../../domain/IUseCases";

import { IGetStudentMyCoursesUseCase } from "../../domain/IUseCases/ICourses/IGetStudentMyCoursesUseCase";

import { IDependencies } from "./IDependencies";

export interface IUseCases {
  addCategoryUseCase: (dependencies: IDependencies) => IAddCategoryUseCase;
  getCategoriesUseCase: (dependencies: IDependencies) => IGetCategoriesUseCase;
  blockUnblockCatUseCase: (dependencies: IDependencies) => IBlockUnblockCatUseCase;
  addCourseUseCase: (dependencies: IDependencies) => IAddCourseUseCase;
  getCoursesUseCase: (dependencies: IDependencies) => IGetCoursesUseCase;
  // getMyCoursesUseCase: (dependencies: IDependencies) =>IGetMyCoursesByIdUseCase ;




  getCoursesByIdUseCase: (dependencies: IDependencies) => IGetCoursesByIdUseCase;
  getMyCoursesByIdUseCase: (dependencies: IDependencies) => IGetMyCoursesByIdUseCase;

  toggleBlockCourseUseCase: (dependencies: IDependencies) => IToggleBlockCourseUseCase;
  getCoursesForInstructorUseCase: (dependencies: IDependencies) => IGetCoursesForInstructorUseCase;
  addEnrollmentUseCase:(dependencies:IDependencies)=>IAddEnrollmentUseCase
  getStudentMyCoursesUseCase:(dependencies:IDependencies)=>IGetStudentMyCoursesUseCase
  checkEnrollmentUseCase:(dependencies:IDependencies)=>ICheckEmrollmentUseCase
  streamVideoUseCase:(dependencies:IDependencies)=>IStreamVideoUseCase
  createAssessmentUseCase:(dependencies:IDependencies)=>ICreateAssessmentUseCase 
  getInstructorAssessmentsUseCase:(dependencies:IDependencies)=>IGetInstructorAssessmentsUseCase
  deleteAssessmentUseCase:(dependencies:IDependencies)=>IDeleteAssessmentUseCase
  getTestAssessmentUseCase :(dependencies:IDependencies)=>IGetTestAssessmentUseCase 
  submitAssessmentUseCase :(dependencies:IDependencies)=>ISubmitAssessmentUseCase

  studentAssessmentsListUseCase :(dependencies:IDependencies)=>  IStudentAssessmentsListUseCase 
}
