import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, deleteSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({ title: "Get all subscriptions" });
});
subscriptionRouter.get('/:id', (req, res) => {
    res.send({ title: "Get subscriptions details" });
});
subscriptionRouter.post('/', authorize,createSubscription);
subscriptionRouter.put('/', (req, res) => {
    res.send({ title: "Update subscriptions" });
});
subscriptionRouter.delete('/', authorize,deleteSubscription);
subscriptionRouter.get('/user/:id', authorize,getUserSubscriptions);
subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ title: "Cancel subscriptions" });
});
subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ title: "Get upcoming renewals" });
});

export default subscriptionRouter;
