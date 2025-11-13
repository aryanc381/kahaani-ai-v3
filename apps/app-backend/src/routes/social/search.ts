import express from 'express';
import users from '../../models/user.js';

const router = express.Router();
router.use(express.json());

router.get('/search', async (req, res) => {
    try {
        const keyword = req.query.keyword;
        if(typeof keyword !== 'string' || !keyword || keyword.trim() === '') {
            return res.json({
            status: 403,
            msg: 'Invalid / Missing Email-ID.'
            });
        }
        const keywordEmails = await users.find(
            { 'userDetails.email': { $regex: keyword, $options: 'i'}, },
            { 'userDetails.fullName':1, 'userDetails.email': 1, _id: 0 }
        );

        const filteredEmails = keywordEmails.map(user => ({
            name: user.userDetails.fullName || '',
            email: user.userDetails.email || ''
        }));

        return res.json({
            status: 201,
            msg: 'User search complete.',
            users: filteredEmails
        });
    } catch(err) {
        return res.json({
            status: 500,
            msg: 'Internal Server Error.'
        });
    }
});

export default router;