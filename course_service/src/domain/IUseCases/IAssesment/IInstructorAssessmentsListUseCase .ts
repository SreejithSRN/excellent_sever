import { AssessmentView } from "../../entities/assesmentEntity";




  
export interface IInstructorAssessmentsListUseCase {
  execute(id: string): Promise<AssessmentView[]>;
}