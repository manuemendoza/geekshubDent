const { Client, Appoinments } = require('../../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const getUsers = async(req, res) => {
    if (req.query.fullName) {
        const user = await Client.findOne({ where: { fullName: req.query.fullName } });
        if (user === null) {
            res.json({
                messege: 'User not found!'
            }, 404)
        } else {
            res.json(user);
        }
    } else {
        const user = Client.findAll().then((results) => {
            res.json(results);
        });
    }


    // try {
    //     if (req.query.fullName) {
    //         const users = await Client.find({ name: { $regex: new RegExp(req.query.fullName, 'i') } });
    //         res.json({
    //             user: users
    //         });
    //     } else {
    //         res.json({
    //             users: await User.find()
    //         });
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.json({
    //         message: error.message
    //     }, 500);
    // }
};

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
    createUser,
    getUsers
}