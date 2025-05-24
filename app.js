import express from 'express'
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.route.js';
import subsRouter from './routes/subs.routes.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subsRouter);

app.get('/', (req, res) => {
   res.send('Welcome to subscription tracker');
})

app.listen(PORT, () => {
   console.log(`App running on http://localhost:${PORT}`);
})