import { Router } from "express";

const authRouter = Router();

// new resource request
authRouter.post('/sign-up', (res, req) => res.send({ message: 'POST: Sign up' }));
authRouter.post('/sign-in', (res, req) => res.send({ message: 'POST: Sign in' }));
authRouter.post('/sign-out', (res, req) => res.send({ message: 'POST: Sign out' }));

export default authRouter;