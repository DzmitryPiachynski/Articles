import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import userModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req)                    // check for errors
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password                      // password encryption
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        const doc = new userModel({                             // creating document for database
            email: req.body.email,
            username: req.body.username,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })
        const user = await doc.save()                           // saving user in db

        const token = jwt.sign(                                 // encrypting user id
            {
                id: user.id,
            },
            'secretKey',
        )

        const { passwordHash, ... userData } = user._doc         // user info from db without passHash

        res.json({                                          // response
            ... userData,
            token,
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Registration problem'
        })
    }
}

export const login = async (req, res) => {
    try{
        const user = await userModel.findOne({ email: req.body.email }) // trying to find user by email

        if(!user) {                                             // checking email
            return res.status(400).json({
                message: 'User do not exists'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isValidPass) {                                      // checking password
            return res.status(400).json({
                message: 'Email or password is incorrect'
            })
        }

        const token = jwt.sign(                                 // encrypting user id
            {
                id: user.id,
            },
            'secretKey',
        )

        const { passwordHash, ... userData } = user._doc         // user info from db without passHash

        res.json({                                          // response
            ... userData,
            token,
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Login problem'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'User not found'
            })
        }

        const { passwordHash, ... userData } = user._doc         // user info from db without passHash

        res.json({userData})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Permission denied'
        })
    }
}