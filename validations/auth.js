import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password should be from 6 to 12 symbols').isLength({min: 6, max: 12}),
    body('username', 'Password should be from 4 to 16 symbols').isLength({min: 4, max: 16}),
    body('avatarUrl', 'Wrong url').optional().isURL(),
]