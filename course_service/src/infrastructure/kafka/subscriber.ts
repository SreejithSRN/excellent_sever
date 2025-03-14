import { UserEntity } from "../../domain/entities"
import { userCreatedConsumer } from "./consumer"


export interface ISubscriber{
    userCreated:(data:UserEntity)=>Promise<void>
}

export interface ICourseSubscriber
	extends Pick<
		ISubscriber,
		| "userCreated"		
	> {}

export const createSubscriber=():ICourseSubscriber=>{
    return {
        userCreated:userCreatedConsumer
}
}