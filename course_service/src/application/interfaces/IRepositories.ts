import { CategoryEntity } from "../../domain/entities";

export interface  IRepositories{
    addCategory:(data:CategoryEntity)=>Promise<boolean|null|string>
    getCategories:(page?:number,limit?:number)=> Promise<{data:CategoryEntity[],totalCount:number} | null>
    blockUnblockCat:(id:string)=>Promise<boolean|null>
    
}