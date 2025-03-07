import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";

export const routes=(dependencies:IDependencies)=>{
    const router= Router()
    const {addCategory,getCategories,blockUnblockCat,addCourse,getCourses,getCoursesById,toggleBlockCourse,getCoursesForInstructor}=controllers(dependencies)

    router.route("/addCategory").post(addCategory)
    router.route("/getCategories").get(getCategories)
    router.route("/blockUnblockCat").post(blockUnblockCat)
    router.route("/addCourse").post(addCourse)
    router.route("/getCourses").get(getCourses)
    router.route("/getCoursesById/:id").get(getCoursesById)
    router.route("/toggleBlockCourse").put(toggleBlockCourse)
    router .route("/getCoursesForInstructor").get(getCoursesForInstructor)

    return router
}