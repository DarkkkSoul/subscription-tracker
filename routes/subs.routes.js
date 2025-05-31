import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubs, getSubs } from "../controllers/subs.controller.js";

const subsRouter = Router();

// subsRouter.get('/', (req, res) => res.send({ message: 'GET - retrieve all subscriptions' }));
// subsRouter.post('/', (req, res) => res.send({ message: 'POST - create new subscription' }));
// subsRouter.put('/:id', (req, res) => res.send({ message: 'PUT - update all subscriptions of user-id' }));
// subsRouter.delete('/:id', (req, res) => res.send({ message: 'DELETE - subscriptions of user-id' }));

// subsRouter.get('/user/:id', (req, res) => res.send({ message: 'GET - subscriptions of user-id' }));
// subsRouter.put('/:id/cancel', (req, res) => res.send({ message: 'UPDATE - cancel subscriptions of user-id' }));
// subsRouter.get('/upcoming-renewals', (req, res) => res.send({ message: 'GET - get upcoming subscriptions' }));

subsRouter.post('/',authorize, createSubs);
subsRouter.get('/user/:id', authorize, getSubs);

export default subsRouter;