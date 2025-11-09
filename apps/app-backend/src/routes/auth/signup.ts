import express from 'express';
import zod from 'zod';
import users from '../../models/user.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const saltRounds = parseInt(process.env.SALT_VAL as string, 10);

const router = express.Router();
router.use(express.json());

const signUpBody = zod.object({
    fullName: zod.string(),
    phone: zod.string(),
    email: zod.email(),
    password: zod.string()
});

export const hashPassword = async (password: any) => {
    return await bcrypt.hash(password, saltRounds);
}

router.post('/signup', async(req, res) => {
    try {
        const parsed = signUpBody.safeParse(req.body);
        if(!parsed.success) {
            const formattedErrors = parsed.error.issues.map(err => ({
                path: err.path[0],
                message: err.message
            }));
            return res.json({
                status: 403, // Forbidden -> Denied Access.
                msg: 'Invalid / Missing credentials',
                error: formattedErrors
            });
        }
        const existingUser = await users.findOne({ "userDetails.email": req.body.email });
        if(existingUser) {
            return res.json({
                status: 409, // Conflict -> Multiple clients
                msg: 'User already exists, try logging in instead.'
            });
        }

        const hashedPassword = await hashPassword(req.body.password);
        const jwt_token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET!)
        
        const user = await users.create({
            userDetails: {
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPassword,
                token: jwt_token
            }
        });

        return res.json({
            status: 201,
            msg: 'User created successfully!',
            name: user.userDetails.fullName,
            phone: user.userDetails.phone,
            password: user.userDetails.password,
            token: jwt_token
        });

        
        
    } catch(err) {
        return res.json({
            status: 500, // Internal Server Error
            msg: 'Internal Server Error.'
        });
    }
    
});

export default router;