const jwt = require('jsonwebtoken');
const { Token } = require('../models/index');

const checkToken = async(req, res, next, requiredRole) => {
    let token = null;
    if (req.headers['authorization']) {
        let splitToken = req.headers['authorization'].split(' ');
        if (splitToken.length === 2) {
            token = splitToken[1];
        }
    }


    if (token) {
        try {
            const userToken = jwt.verify(token, process.env.PRIVATE_KEY);
            // @TODO: find token in database, if it not exists: user not authorized
            //
            const databaseToken = await Token.findOne({
                where: {
                    token: userToken,
                    clientId: userToken.id,
                    adminId: userToken.id
                }
            });
            console.log(databaseToken);
            //if (databaseToken) {
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
                    message: 'user not authorizedm 1'
                }, 403);
            }
            // } else {
            //     res.json({
            //         message: 'user not authenticated 2'
            //     }, 401);
            // }
        } catch (error) {
            res.json({
                message: 'user not authenticated 3'
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