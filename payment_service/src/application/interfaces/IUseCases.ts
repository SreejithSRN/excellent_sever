import { IgetPaymentUseCase, ISavePaymentUseCase } from "../../domain/IUseCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
    savePaymentUseCase:(dependencies:IDependencies) => ISavePaymentUseCase;
    getPaymentUseCase:(dependencies:IDependencies)=>IgetPaymentUseCase



}