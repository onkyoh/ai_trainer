const jwt = require('jsonwebtoken')

//adding this to a route means that route required a token
const protect = async(req,res,next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded.exp > Date.now()) {
                //handle expired
                res.sendStatus(401)
            }
            req.user = decoded
            next()
        } catch (error) {
           res.sendStatus(401)
        }
    }
    if (!token) {
        res.sendStatus(401)
    }
}

module.exports = {
    protect
}