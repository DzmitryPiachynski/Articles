import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js"
import { UserController, PostController } from './controllers/index.js'
import { checkAuth, handleValidationErrors } from './utils/index.js'


mongoose        // connect to database
    .connect(
    'mongodb+srv://admin:qwqwqw@cluster0.pxd6dsz.mongodb.net/blog')
    .then(() => console.log('DB - ok'))
    .catch(err => console.log('DB error', err))

const app = express()  // create express app

app.use(express.json())  // express learn how to work with json
app.use('/uploads',express.static('uploads')) // express learn how to use uploads

const storage = multer.diskStorage({      //img storage
    destination: (_, __, cb) => {              //file path
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {               //file name
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.post('/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/me', checkAuth, UserController.getMe)

app.post('/upload',checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/upload/${req.file.originalname}`
    })
})


app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)



app.listen(8080, (err) => {
    if(err) {
        return console.log(err)
    }
    console.log('Server working...')
})
