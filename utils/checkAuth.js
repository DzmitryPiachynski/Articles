import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secretKey')

            req.userId = decoded.id

            next()
        } catch (e) {
            return res.status(403).json({
                message: 'Permission denied'
            })
        }
    } else {
        return req.status(403).json({
            message: 'Permission denied'
        })
    }
}