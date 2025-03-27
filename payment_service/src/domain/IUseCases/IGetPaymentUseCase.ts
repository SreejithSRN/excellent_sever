import { paymentDetailsProps } from "../entities/paymentEntity";

export interface IgetPaymentUseCase{
    execute(data:{studentId:string,role:string}):Promise<paymentDetailsProps[]|[]>
}