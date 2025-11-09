import express from 'express';
import signupRouter from './auth/signup.js';
import loginRouter from './auth/login.js';

const router = express.Router();
router.use(express.json());

router.use('/auth', signupRouter, loginRouter);

export default router;