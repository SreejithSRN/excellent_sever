import { NextFunction, Request, Response } from "express"
import { env_variables } from "../../_boot/config"
import { IDependencies } from "../../application/interfaces/IDependencies"

const stripe = require('stripe')(env_variables.STRIPE_SECRET_KEY)

export const stripeWebhookHandler = (dependencies: IDependencies) => {
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            
        }catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in add Course");
          }
    }
}
