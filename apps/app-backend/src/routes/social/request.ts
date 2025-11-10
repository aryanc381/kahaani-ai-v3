import express from 'express';
import zod from 'zod';
import users from '../../models/user.js';

const router = express.Router();

router.use(express.json());

const requestBody = zod.object({
    rSender: zod.email(),
    rReceiver: zod.email()
});

router.post('/request', async (req, res) => {
    try {
        const parsed = requestBody.safeParse(req.body);
        // checking if the req body is parsed correctly
        if(!parsed.success) {
            const formattedErrors = parsed.error.issues.map((err) => ({
                path: err.path[0],
                message: err.message
            }));
            return res.json({
                status: 403, 
                msg: 'Invalid / Missing packet while making request.',
                error: formattedErrors
            });
        }

        // checking if the user is sending req to himself / herself
        if(req.body.rReceiver === req.body.rSender) {
            return res.json({
                status: 400, // Bad Request
                msg: 'You cannot send request to yourself.'
            });
        }

        const existingUser = await users.findOne({ "userDetails.email": req.body.rReceiver });
        // checking if the user is sending a req to a recipient that does not exists
        if(!existingUser) {
            return res.json({
                status: 404,
                msg: 'User not found with email ' + req.body.rReceiver,
            });
        }

        // checking if user has already sent a request
        if(existingUser.userDetails.pendingUsers.includes(req.body.rSender)) {
            return res.json({
                status: 409, // conflict
                msg: 'Request already sent.'
            });
        }

        // checking if sender and recipient are already friends
        if(existingUser.userDetails.acceptedUsers.includes(req.body.rSender)) {
            return res.json({
                status: 409,
                msg: 'You are already friends.'
            });
        }
        
        existingUser.userDetails.pendingUsers.push(req.body.rSender);
        await existingUser.save();

        return res.json({
            status: 201,
            msg: 'Request has been sent.',
            sender: req.body.rSender,
            receiver: req.body.rReceiver
        });

    } catch(err) {
        return res.json({
            status: 500,
            msg: 'Internal Server Error.'
        });
    }
});

export default router;