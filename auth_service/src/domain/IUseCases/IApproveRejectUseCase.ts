export interface IApproveRejectUseCase{
    execute(email:string):Promise<boolean|null>
}