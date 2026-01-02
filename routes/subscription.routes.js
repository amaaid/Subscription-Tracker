import { Router } from "express"
import authorize from "../middlewares/auth.middleware.js"
import { CreateSubscription, getUserSubscriptions, getAllSubscriptions, getSubscriptionDetails, updateSubscription, deleteSubscription, cancelSubscription, getUpcomingRenewals } from "../controllers/subscription.controller.js";
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes wait
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

const subscriptionRouter = Router()

subscriptionRouter.use(limiter);

subscriptionRouter.get('/', getAllSubscriptions);

subscriptionRouter.get('/:id', authorize, getSubscriptionDetails);

subscriptionRouter.post('/', authorize, CreateSubscription)

subscriptionRouter.put('/', authorize, updateSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);

export default subscriptionRouter;