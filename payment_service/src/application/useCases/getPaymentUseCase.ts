import { IDependencies } from "../interfaces/IDependencies";

export const getPaymentUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getPayments}}=dependencies
    return {
        execute:async(data:{studentId:string,role:string})=>{
            try {
                const response=await getPayments(data)

                return response
                
            } catch(error){
                throw new Error((error as Error)?.message);
            }
        }
    }
}