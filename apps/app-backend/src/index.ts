import express from 'express';
import rootRouter from './routes/root.js';
import cookieParse from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken';

const app = express();
app.use(express.json());

app.use('/v3/api', rootRouter);

app.listen(5000, () => { console.log('App is listening at PORT 5000.')});