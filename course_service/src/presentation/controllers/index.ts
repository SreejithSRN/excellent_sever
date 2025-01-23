import { IDependencies } from "../../application/interfaces/IDependencies";
import { addCategoryController, getCategoriesController,blockUnblockCatController } from "./category";

export const controllers=(dependencies:IDependencies)=>{
    return {
       addCategory:addCategoryController(dependencies),
       getCategories:getCategoriesController(dependencies),
       blockUnblockCat:blockUnblockCatController(dependencies)
        
    }
}