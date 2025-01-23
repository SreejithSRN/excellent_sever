
import { IAddCategoryUseCase,IGetCategoriesUseCase,IBlockUnblockCatUseCase } from "../../domain/IUseCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases{
    addCategoryUseCase:(dependencies:IDependencies)=>IAddCategoryUseCase;
    getCategoriesUseCase:(dependencies:IDependencies)=>IGetCategoriesUseCase;
    blockUnblockCatUseCase:(dependencies:IDependencies)=>IBlockUnblockCatUseCase

    
}