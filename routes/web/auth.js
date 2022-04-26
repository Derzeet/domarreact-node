const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('/models/User');
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Please write your email').isEmail(),
        check('password', 'Minimum size of password is 8')
            .isLength({min: 8})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "You have used wrong input information"
            })
        }
        const {name, surname, email, password} = req.body
        const condidate = await User.findOne({email})
        if (condidate) {
            return res.status(400).json({message: 'This email is already in use'});
        }
        //ascynchronus
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({name, surname, email, password: hashedPassword});

        await user.save();

        res.status(201).json({message:'User has been created'});
    } catch (e) {
        res.status(500).json({message: 'Something is wrong, try again later...'})
    }
})
router.post(
    '/login',
    [
        check('email', 'Write an email').normalizeEmail().isEmail(),
        check('password', 'Write your password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "You have used wrong input information"
                })
            }

            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: 'No such user uses this email'})
            }
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Password is wrong'})
            }

            const token = jwt.sign(
                { userid: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id});
        } catch (e) {
            res.status(500).json({message: 'Something is wrong, try again later...'})
        }
} )

module.exports = router;