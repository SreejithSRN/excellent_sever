import { CategoryEntity, EnrollmentEntity } from "../../domain/entities";
import { AssessmentEntity, AssessmentView } from "../../domain/entities/assesmentEntity";
import { CourseEntity, CourseFilterEntity } from "../../domain/entities/courseEntity";

export interface  IRepositories{
    addCategory:(data:CategoryEntity)=>Promise<boolean|null|string>
    getCategories:(page?:number,limit?:number)=> Promise<{data:CategoryEntity[],totalCount:number} | null>
    blockUnblockCat:(id:string)=>Promise<boolean|null>
    addCourse:(data:CourseEntity)=>Promise<boolean>
    getCourses:(page?:number,limit?:number,filters?:CourseFilterEntity)=> Promise<{data:CourseEntity[],totalCount:number} | null>
    getMyCoursesById:(data:string)=>Promise<CourseEntity|null>



    getCoursesById:(data:string)=>Promise<CourseEntity|null>
    toggleBlockCourse:(id:string)=>Promise<boolean|null|string>
    getCoursesForInstructor:(page?:number,limit?:number,id?:string,filters?:CourseFilterEntity)=> Promise<{data:CourseEntity[],totalCount:number} | null>
    getStudentMyCourses:(page?:number,limit?:number,id?:string,filters?:CourseFilterEntity)=> Promise<{data:CourseEntity[],totalCount:number} | null>
    enrollmentCreated:(data:EnrollmentEntity)=>Promise<boolean>
    streamVideo:(courseId:string) => Promise<CourseEntity|null>;
    checkEnrollment:(studentId:string,courseId:string)=>Promise<boolean|string>


    createAssessment: (data: AssessmentEntity) => Promise<AssessmentEntity | null>
    getCoursesWithAssessments : (id:string) => Promise<any>
    getTestAssessment : (id:string) => Promise<AssessmentEntity | null>
    // getsubmitAssessment : (id:string) => Promise<AssessmentEntity|null>

    getsubmitAssessment: (courseId: string,answers: string[],studentId:string) => Promise<{ assessment: AssessmentEntity; score: number;mark:number;isPassed:boolean }>;
    deleteAssessmentById: (id:string) => Promise<boolean | null> 
    
    getStudentAssessments :(id:string)=>Promise<AssessmentView[]>
    getInstructorAssessments :(id:string)=>Promise<AssessmentView[]>
}


