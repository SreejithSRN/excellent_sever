import { constant } from "../../_lib/common/constant";
import { IDependencies } from "../interfaces/IDependencies";

export const approveRejectUseCase=(dependencies:IDependencies)=>{
    const {repositories}=dependencies
    const {approveReject}=repositories
    return {
        execute:async(email:string)=>{
            try {
                return await approveReject(email)                
            } catch (error: constant) {
                    throw new Error(error?.message || "Error in approveReject usecases");
                  }
        }
    }
}