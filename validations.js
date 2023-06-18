import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password should be from 6 to 12 symbols').isLength({min: 6, max: 12}),
]

export const registerValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password should be from 6 to 12 symbols').isLength({min: 6, max: 12}),
    body('username', 'Password should be from 4 to 16 symbols').isLength({min: 4, max: 16}),
    body('avatarUrl', 'Wrong url').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Type correct title').isLength({min: 3}).isString(),
    body('text', 'Type text').isLength({min: 10}).isString(),
    body('tags', 'Wrong tags format(Should be array)').optional().isString(),
    body('imageUrl', 'Wrong image url').optional().isString(),
]