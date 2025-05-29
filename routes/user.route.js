import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

// userRouter.get('/', (req, res) => res.send({ message: 'GET - retrieve all users' }));

// userRouter.get('/:id', (req, res) => res.send({ message: 'GET - retrieve user by id' }));

// userRouter.post('/', (req, res) => res.send({ message: 'POST - create a user' }));

// userRouter.put('/:id', (req, res) => res.send({ message: 'PUT - update a user by id' }));

// userRouter.delete('/:id', (req, res) => res.send({ message: 'DELETE - a user by id' }));

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

export default userRouter;