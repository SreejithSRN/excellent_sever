import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { roleAuthMiddleware } from "../../_lib/middleware/roleAuth";
import { Role } from "../../domain/entities";

export const routes=(dependencies:IDependencies)=>{
    const router= Router()
    const {addCategory,getCategories,blockUnblockCat,addCourse,getCourses,getCoursesById,toggleBlockCourse,getCoursesForInstructor,createEnrollment}=controllers(dependencies)

    router.route("/addCategory").post(roleAuthMiddleware(Role.admin),addCategory)
    router.route("/getCategories").get(roleAuthMiddleware(),getCategories)
    router.route("/blockUnblockCat").post(roleAuthMiddleware(Role.admin),blockUnblockCat)
    router.route("/addCourse").post(roleAuthMiddleware(Role.instructor),addCourse)
    router.route("/getCourses").get(roleAuthMiddleware(),getCourses)
    router.route("/getCoursesById/:id").get(roleAuthMiddleware(),getCoursesById)
    router.route("/toggleBlockCourse").put(roleAuthMiddleware(Role.instructor),toggleBlockCourse)
    router .route("/getCoursesForInstructor").get(roleAuthMiddleware(Role.instructor),getCoursesForInstructor)
    router.route("/createEnrollment").post(roleAuthMiddleware(Role.student),createEnrollment)

    return router

    
}