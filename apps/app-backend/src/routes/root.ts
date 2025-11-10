import express from 'express';
import signupRouter from './auth/signup.js';
import loginRouter from './auth/login.js';
import requestRouter from './social/request.js';

const router = express.Router();
router.use(express.json());

router.use('/auth', signupRouter, loginRouter);
router.use('/social', requestRouter);

export default router;