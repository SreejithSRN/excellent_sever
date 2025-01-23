import { constant } from "../../../_lib/common/constant";
import { IDependencies } from "../../interfaces/IDependencies";

export const blockUnblockCatUseCase=(dependencies:IDependencies)=>{
    const{repositories:{blockUnblockCat}}=dependencies
    return {
        execute:async(id:string)=>{
            try {
                return await blockUnblockCat(id)
            }  catch (error: constant) {
                throw new Error(error?.message || "Error in blockUnblock usecases");
              }
        }
    }
}