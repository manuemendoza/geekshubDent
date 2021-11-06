const { Client, Appoinments } = require('../../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



        const deleteUser = async(req, res) => {
            const primaryK = req.params.id
            try {
                const user = await Client.findByPk(primaryK);
                if (user) {
                    res.json(user);
                    await user.destroy({
                        where: { id: primaryK }
                    });
                } else {
                    res.json('user not found');
                }
            } catch (error) {
                console.error(error);
                res.json({
                    message: error.message
                }, 500);
            }
        };

    // const userData = req.body
    // console.log(typeof userData);
    // const prueba = Client.create(userData);
    // res.json(prueba);




module.exports = {
    deleteUser
}