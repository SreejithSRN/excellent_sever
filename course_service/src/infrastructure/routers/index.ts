import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";

export const routes=(dependencies:IDependencies)=>{
    const router= Router()
    const {addCategory,getCategories,blockUnblockCat}=controllers(dependencies)

    router.route("/addCategory").post(addCategory)
    router.route("/getCategories").get(getCategories)
    router.route("/blockUnblockCat").post(blockUnblockCat)

    return router
}