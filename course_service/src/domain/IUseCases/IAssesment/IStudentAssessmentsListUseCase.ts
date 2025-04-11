import { AssessmentView } from "../../entities/assesmentEntity";




  
export interface IStudentAssessmentsListUseCase {
  execute(id: string): Promise<AssessmentView[]>;
}
