const jwt = require('jsonwebtoken');

const checkToken = (req, res, next, requiredRole) => {
    let token = null;
    if (req.headers['authorization']) {
        let splitToken = req.headers['authorization'].split(' ');
        if (splitToken.length === 2) {
            token = splitToken[1];
        }
    }


    if (token) {
        let userToken = jwt.verify(token, process.env.PRIVATE_KEY);
        try {
            if (requiredRole == 'client' ||
                userToken.role == 'admin' ||
                (req.baseUrl === '/clients' && req.params.id == userToken.id) // perfil del propio cliente autenticado
            ) {
                req.auth = {
                    user: userToken,
                    token: token
                };
                next();

            } else {
                res.json({
                    message: 'user not authorized'
                }, 403);
            }
        } catch (error) {
            res.json({
                message: 'user not authenticated'
            }, 401);
        }
    } else {
        res.json({
            message: 'user not authenticated que te peines 2'
        }, 401);
    }
}

const checkClient = (req, res, next) => {
    checkToken(req, res, next, 'client');
};

const checkAdminOrOwn = (req, res, next) => {
    checkToken(req, res, next, 'admin');
}

module.exports = {
    checkClient,
    checkAdminOrOwn
};