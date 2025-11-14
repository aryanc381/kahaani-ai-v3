import express from 'express';
import signupRouter from './auth/signup.js';
import loginRouter from './auth/login.js';
import requestRouter from './social/request.js';
import socialDecisionRouter from './social/decision.js';
import socialSearchRouter from './social/search.js';
import paymentRouter from './payment/checkout.js';
const router = express.Router();
router.use(express.json());

router.use('/auth', signupRouter, loginRouter);
router.use('/social', requestRouter, socialDecisionRouter, socialSearchRouter);
router.use('/payment', paymentRouter);

export default router;