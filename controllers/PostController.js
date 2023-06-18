import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Cant get all posts'
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        PostModel.findOneAndUpdate(
        {
            _id: postId
        },
        {
            $inc: { viewsCount: 1 }
        },
        {
            returnDocument: 'after'
        },)
        .then( doc => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Cant find post'
                })
            }

            res.json(doc)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'Cant get post'
            })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Post problem'
        })
    }
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findByIdAndRemove({
            _id: postId
        })
            .then(doc => {
                if(!doc) {
                    return res.status(404).json({
                        message: 'Cant delete non-existent post'
                    })
                }

                res.json({
                    success: true
                })
            })
            .catch( err => {
                console.log(err)
                return res.status(500).json({
                    message: 'Delete problem'
                })
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Post delete problem'
        })
    }
}
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Post creation problem'
        })
    }
}
export const update = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.updateOne({
            _id: postId
        },
        {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        }).then(
            res.json(
            {
                success: true
            })
        ).catch( err => {
            console.log(err)
            return res.status(500).json({
                message: 'Cant update post'
            })
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Post update problem'
        })
    }
}