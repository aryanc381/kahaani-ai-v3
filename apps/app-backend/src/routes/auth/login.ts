import express from 'express';
import zod from 'zod';
import bcrypt from 'bcrypt';
import users from '../../models/user.js';

const router = express.Router();
router.use(express.json());

const loginBody = zod.object({
    email: zod.email(),
    password: zod.string()
});

async function decoder(password: string, userHash: string) {
    const match = await bcrypt.compare(password, userHash);
    return match;
}

router.post('/login', async (req, res) => {
    const parsed = loginBody.safeParse(req.body);
    if(!parsed.success) {
        const formattedErrors = parsed.error.issues.map(err => ({
            path: err.path[0],
            message: err.message
        }));
        return res.json({
            status: 403,
            msg: 'Invalid / Missing credentials',
            errors: formattedErrors
        });
    }
    const existingUser = await users.findOne({"userDetails.email": req.body.email});
    if(!existingUser) {
        return res.json({
            status: 404,
            msg: 'User not found with email : ' + req.body.email
        });
    }
    
    const pass_target = existingUser?.userDetails.password;
    const isValid = await decoder(req.body.password, pass_target);
    if(!isValid) {
        return res.json({
            status: 401,
            msg: 'Invaid Password for email : ' + req.body.email
        });
    }

    return res.json({
        status: 200,
        msg: 'Login Successfull'
    });
});

export default router;