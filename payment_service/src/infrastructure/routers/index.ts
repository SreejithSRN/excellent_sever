import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { roleAuthMiddleware } from "../../_lib/middleware/roleAuth";
import { Role } from "../../domain/entities";
import express from 'express';

export const routes=(dependencies:IDependencies)=>{
    const router= Router()

    const {createCheckOutSession,stripeWebhook,getPayment}=controllers(dependencies)

    router.route("/create-checkout-session")
    .post(roleAuthMiddleware(Role.student),createCheckOutSession);
    
    router.route("/getpayment").get(roleAuthMiddleware(),getPayment)

    router.route("/webhook")
    .post(express.raw({ type: 'application/json' }),stripeWebhook );

    return router

    
}