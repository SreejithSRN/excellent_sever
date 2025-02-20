import { CourseEntity } from "../../entities/courseEntity";


export interface IGetCoursesUseCase {
    execute(
      page?: number,
      limit?: number
    ): Promise<{ data: CourseEntity[]; totalCount: number } | null>;
  }