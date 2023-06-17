import express from 'express'
import mongoose from 'mongoose'
import { registerValidation } from "./validations/auth.js"
import checkAuth from "./utils/checkAuth.js"
import * as UserController from "./controllers/UserConsroller.js"


mongoose        // connect to database
    .connect(
    'mongodb+srv://admin:qwqwqw@cluster0.pxd6dsz.mongodb.net/blog')
    .then(() => console.log('DB - ok'))
    .catch(err => console.log('DB error', err))

const app = express()  // create express app

app.use(express.json())  // express learn how to work with json

app.post('/login', UserController.login)
app.post('/register', registerValidation, UserController.register)
app.get('/me', checkAuth, UserController.getMe)

app.listen(8080, (err) => {
    if(err) {
        return console.log(err)
    }
    console.log('Server working...')
})
