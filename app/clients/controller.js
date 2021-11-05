const { Client, Appoinments } = require('../../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



const createUser = (req, res) => {
    if (!req.body.password) {
        res.json({
            messege: 'password is required'
        }, 400)
    } else {
        const userData = req.body;

        if (!req.toke || req.toke.role == 'user') {
            delete userData.role
        };

        const salt = bcrypt.genSaltSync(7);
        const hash = bcrypt.hashSync(req.body.password, salt);
        userData.password = hash;

        const user = Client.create(userData);

        res.json('creado el usuario: ', userData.fullName);
        // try {
        //     res.json('creado el usuario: ', userData.fullName);
        // } catch (error) {
        //     console.error(error);
        //     if (error.messege == 'ValidationError') {
        //         res.json({
        //             messege: error.messege
        //         }, 400);
        //     } else {
        //         res.json({
        //             messege: error.messege
        //         }, 500);
        //     }
        // }
    };

    // const userData = req.body
    // console.log(typeof userData);
    // const prueba = Client.create(userData);
    // res.json(prueba);
}

module.exports = {
    createUser
}