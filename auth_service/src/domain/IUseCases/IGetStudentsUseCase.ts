import { UserEntity } from "../entities";

export interface IGetStudentsUseCase {
  execute(
    page?: number,
    limit?: number
  ): Promise<{ data: UserEntity[]; totalCount: number } | null>;
}
