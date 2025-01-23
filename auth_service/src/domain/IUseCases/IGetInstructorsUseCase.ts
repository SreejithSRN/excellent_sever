import { UserEntity } from "../entities";


export interface IGetInstructorsUseCase {
  execute(
    page?: number,
    limit?: number
  ): Promise<{ data: UserEntity[]; totalCount: number } | null>;
}
