import express from 'express'
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.route.js';
import subsRouter from './routes/subs.routes.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subsRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
   res.send('Welcome to subscription tracker');
})

app.listen(PORT, () => {
   console.log(`App running on http://localhost:${PORT}`);
   connectDB();
})