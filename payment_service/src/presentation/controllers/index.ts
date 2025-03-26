import { IDependencies } from "../../application/interfaces/IDependencies";
import { createCheckOutSessionController } from "./createCheckOutSessionController";
import { stripeWebhookHandler } from "./webHookHandler";

export const controllers=(dependencies:IDependencies)=>{
    return {
        createCheckOutSession: createCheckOutSessionController(dependencies),
        stripeWebhook: stripeWebhookHandler(dependencies)
    }
    
        
    }
