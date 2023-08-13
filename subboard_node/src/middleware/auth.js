const jwt = require('jsonwebtoken');
const { JWT_SECRET, ENV } = process.env;

/* Récupération du header bearer */
const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/* Vérification du token */
const checkTokenMiddleware = async (req, res, next) => {
    if(ENV === 'dev') {
        await sleep(750);
    }

    // Récupération du token
    const token = req.cookies.access_token;

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Error. Need a cookie' })
    }

    // Véracité du token
    jwt.verify(token, JWT_SECRET, (err) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad cookie' })
        } else {
            return next()
        }
    })
}
module.exports = checkTokenMiddleware;