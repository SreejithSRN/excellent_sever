import { IDependencies } from "../../application/interfaces/IDependencies";
import { addCategoryController, getCategoriesController,blockUnblockCatController} from "./category";
import { getCoursesController,addCourseController,getCoursesByIdController,toggleBlockCourseController,getCoursesForInstructorController } from "./courses/index";


export const controllers=(dependencies:IDependencies)=>{
    return {
       addCategory:addCategoryController(dependencies),
       getCategories:getCategoriesController(dependencies),
       blockUnblockCat:blockUnblockCatController(dependencies),
       addCourse:addCourseController(dependencies),
       getCourses:getCoursesController(dependencies),
       getCoursesById:getCoursesByIdController(dependencies),
       toggleBlockCourse: toggleBlockCourseController(dependencies),
       getCoursesForInstructor:getCoursesForInstructorController(dependencies),             
    }
}