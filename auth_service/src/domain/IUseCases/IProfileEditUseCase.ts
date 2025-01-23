import { UserEntity } from "../entities";

export interface IProfileEditUseCase{
    execute(data:UserEntity):Promise<boolean |null|UserEntity>
}