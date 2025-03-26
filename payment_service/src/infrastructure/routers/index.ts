import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { roleAuthMiddleware } from "../../_lib/middleware/roleAuth";
import { Role } from "../../domain/entities";
import express from 'express';

export const routes=(dependencies:IDependencies)=>{
    const router= Router()

    const {createCheckOutSession,stripeWebhook}=controllers(dependencies)

    router.route("/create-checkout-session")
    .post(roleAuthMiddleware(Role.student),createCheckOutSession);

    router.route("/webhook")
    .post(roleAuthMiddleware(Role.student),express.raw({ type: 'application/json' }),stripeWebhook );

    return router

    
}