import express from 'express';
import zod from 'zod';
import users from '../../models/user.js';
import axios from 'axios';

const router = express.Router();
router.use(express.json());

const decisionBody = zod.object({
    rSender: zod.email(),
    rRecipient: zod.email(),
    decision: zod.string()
});

const userBody = zod.object({
    rRecipient: zod.email()
});

router.post('/pending', async (req, res) => {
    try {
        const parsed = userBody.safeParse(req.body);
        if(!parsed.success) {
            const formattedErrors = parsed.error.issues.map(err => ({
                path: err.path[0],
                message: err.message
            }));
            return res.json({
                status: 403, 
                msg: 'Invalid / Missing accept packet.',
                error: formattedErrors
            });
        }

        const recipient = await users.findOne({ "userDetails.email": req.body.rRecipient });
        const pendingUsers = recipient?.userDetails.pendingUsers.map(user => user);
        return res.json({
            status: 200,
            pendingUsers: pendingUsers
        });
    } catch(err) {
        res.json({
            status: 500,
            msg: 'Internal Server Error.'
        });
    }
    
});

router.post('/decision', async(req, res) => {
    try {
        const parsed = decisionBody.safeParse(req.body);
        if(!parsed.success) {
            const formattedErrors = parsed.error.issues.map(err => ({
                path: err.path[0],
                message: err.message
            }));
            return res.json({
                status: 403, 
                msg: 'Invalid / Missing accept packet.',
                error: formattedErrors
            });
        }
        const response = await axios({
            url: 'http://localhost:5000/v3/api/social/pending',
            method: 'POST',
            data: {
                rRecipient: req.body.rRecipient
            }
        });

        const pendingUsers: string[] = response.data.pendingUsers;
        if(!pendingUsers.includes(req.body.rSender)) {
            return res.json({
                status: 403,
                msg: `${req.body.rSender} is not present in the request list.`
            })
        }

        const recipient = await users.findOne({ "userDetails.email": req.body.rRecipient });
        if(!recipient) {
            return res.json({
                status: 404,
                msg: 'Invalid / Missing Recipient.'
            });
        }

        if(req.body.decision === "accept") {
            recipient.userDetails.pendingUsers = pendingUsers.filter(user => user != req.body.rSender);
            recipient.userDetails.acceptedUsers.push(req.body.rSender);
            await recipient.save();
            return res.json({
                status: 200,
                msg: `${req.body.rSender} has been accepted.`
            });

        } else if (req.body.decision === "reject") {
            recipient.userDetails.pendingUsers = pendingUsers.filter(user => user != req.body.rSender);
            await recipient.save();
            return res.json({
                status: 200,
                msg: `${req.body.rSender} has been rejected.`
            });

        } else {
            return res.json({
                status: '403',
                msg: 'Bad Request while accepting request'
            });
        }
    } catch(err) {
        return res.json({
            status: 500,
            msg: 'Internal Server Error.'
        });
    }
});

export default router;