import {
  IAddCategoryUseCase,
  IGetCategoriesUseCase,
  IBlockUnblockCatUseCase,
  IAddCourseUseCase,
  IGetCoursesUseCase,
  IGetCoursesByIdUseCase,
  IToggleBlockCourseUseCase,
  IGetCoursesForInstructorUseCase,IAddEnrollmentUseCase
} from "../../domain/IUseCases";

import { IDependencies } from "./IDependencies";

export interface IUseCases {
  addCategoryUseCase: (dependencies: IDependencies) => IAddCategoryUseCase;
  getCategoriesUseCase: (dependencies: IDependencies) => IGetCategoriesUseCase;
  blockUnblockCatUseCase: (dependencies: IDependencies) => IBlockUnblockCatUseCase;
  addCourseUseCase: (dependencies: IDependencies) => IAddCourseUseCase;
  getCoursesUseCase: (dependencies: IDependencies) => IGetCoursesUseCase;
  getCoursesByIdUseCase: (dependencies: IDependencies) => IGetCoursesByIdUseCase;
  toggleBlockCourseUseCase: (dependencies: IDependencies) => IToggleBlockCourseUseCase;
  getCoursesForInstructorUseCase: (dependencies: IDependencies) => IGetCoursesForInstructorUseCase;
  addEnrollmentUseCase:(dependencies:IDependencies)=>IAddEnrollmentUseCase
}
