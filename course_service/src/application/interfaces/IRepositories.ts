import { CategoryEntity } from "../../domain/entities";
import { CourseEntity } from "../../domain/entities/courseEntity";

export interface  IRepositories{
    addCategory:(data:CategoryEntity)=>Promise<boolean|null|string>
    getCategories:(page?:number,limit?:number)=> Promise<{data:CategoryEntity[],totalCount:number} | null>
    blockUnblockCat:(id:string)=>Promise<boolean|null>
    addCourse:(data:CourseEntity)=>Promise<boolean>
    getCourses:(page?:number,limit?:number)=> Promise<{data:CourseEntity[],totalCount:number} | null>
    getCoursesById:(data:string)=>Promise<CourseEntity|null>
    toggleBlockCourse:(id:string)=>Promise<boolean|null|string>
    getCoursesForInstructor:(page?:number,limit?:number,id?:string)=> Promise<{data:CourseEntity[],totalCount:number} | null>
    
}