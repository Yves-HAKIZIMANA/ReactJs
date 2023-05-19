const jwt = require("jsonwebtoken")

const verifyToken  = (req, res, next) => {
    try {
        let token = req.header("Authorization")
        token = token.split(" ")[1]

        if(token) {
            const verifiedToken = jwt.verify(token, process.env.JWT_KEY)

            if(verifiedToken) {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                req.user = decoded;
                return next()
            }
            return res.status(403).json({error: "Access Denied"})
        }
        return res.status(403).json({error: "Access Denied"})
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports =  verifyToken