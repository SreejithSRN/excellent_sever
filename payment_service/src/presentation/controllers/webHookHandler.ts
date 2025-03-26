// import { NextFunction, Request, Response } from "express"
// import { env_variables } from "../../_boot/config"
// import { IDependencies } from "../../application/interfaces/IDependencies"

// const stripe = require('stripe')(env_variables.STRIPE_SECRET_KEY)

// export const stripeWebhookHandler = (dependencies: IDependencies)=> {
//     return async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
//       // console.log('Raw body:', req.body);
//       // console.log('Headers:', req.headers);
   
//       const endpointSecret = env_variables.STRIPE_WEBHOOK_SECRET;
//       const sig = req.headers['stripe-signature'] as string ;
//       // console.log(sig, "this is key of stripe header")
//       // console.log(endpointSecret, "this is  secret key from env key of stripe header")
//       let event;
//       try {
//         event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//     } catch (error) {
//         console.log(`⚠️  Webhook signature verification failed.`, (error as Error)?.message);
//        res.status(400).json({success: false, message: "Webhook signature verification failed"});
//        return 
//     }

//     console.log(event, "this is my payment event ")
//  debugger
//     switch (event.type) {
//       case 'checkout.session.completed':
//           const session = event.data.object;
//           console.log("🚀 ~ return ~ session:", session.metadata,"aaaaaaaaaaaaaa");
//           console.log(session,"me tooooooooooooooooooooo")
          
//           if (session.metadata.courseId) {
//               console.log("courseid present 999999999999999999999999999999999999")
//               // await handleCourseCheckoutSession(session, dependencies);
//               break;
//           } else {
//               console.log("Unknown checkout session type"); 
//               break;
//           }
          
//       default:
//           console.log(`Unhandled event type ${event.type}`);
//           break;
//   }
//   res.status(200).json({success: true, message: "Webhook received successfully"});
      
        
//     }
// }




// // try {
// //   event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  
  
    
// // }catch (error: unknown) {
// //     if (error instanceof Error) {
// //       throw new Error(error.message);
// //     }
// //     throw new Error("An unknown error occurred in add Course");
// //   }







import { NextFunction, Request, Response } from "express";

import { IDependencies } from "../../application/interfaces/IDependencies";
import Stripe from "stripe";
import { env_variables } from "../../_boot/config";

const stripe = require('stripe')(env_variables.STRIPE_SECRET_KEY)

export const stripeWebhookHandler = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const endpointSecret = env_variables.STRIPE_WEBHOOK_SECRET;
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret as string);
    } catch (error) {
      console.error("⚠️  Webhook signature verification failed:", (error as Error).message);
      res.status(400).json({ success: false, message: "Webhook signature verification failed" });
      return;
    }

    // Only process the required events
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Payment successful for session:", session.id);
      console.log("✅ Payment successful for sessiokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkn:", session);

      if (session.metadata?.courseId) {
        console.log("Processing course purchase:", session.metadata.courseId);
        // await handleCourseCheckoutSession(session, dependencies);
      } else {
        console.log("⚠️ No course ID found in session metadata");
      }
    } else if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("❌ Payment failed for session:", session.id);
      // You can handle the failure logic here, such as notifying the user
    } else {
      console.log(`Ignoring event: ${event.type}`);
       res.status(200).json({ success: true, message: "Event ignored" });
       return;
    }

    res.status(200).json({ success: true, message: "Webhook processed successfully" });
  };
};
