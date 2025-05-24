import express from 'express'
import { PORT } from './config/env.js';
const app = express();

app.get('/', (req, res) => {
   res.send('Welcome to subscription tracker');
})

app.listen(PORT, () => {
   console.log(`App running on http://localhost:${PORT}`);
})