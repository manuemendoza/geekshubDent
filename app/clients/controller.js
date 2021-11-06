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
        const deleteUser = async(req, res) => {
            const primaryK = req.params.id
            try {
                const user = await Client.findByPk(primaryK);
                if (user) {
                    res.json(user);
                    await user.destroy(
                    {
                        where: { id : primaryK}
                    }
                    );
                } else {
                    res.json({
                        messege: 'user not found'
                    }, 404)
                }
            } catch (error) {
                console.error(error);
                res.json({
                    message: error.message
                }, 500);
            }
        };
    };

    // const userData = req.body
    // console.log(typeof userData);
    // const prueba = Client.create(userData);
    // res.json(prueba);


}

module.exports = {
    createUser
}