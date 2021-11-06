const { Client, Appoinments, Admin } = require('../../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//si no hay ningun usuario contenplar eso 
const getUsers = async(req, res) => {
    try {
        if (req.query.fullName) {
            const user = await Admin.findOne({ where: { fullName: req.query.fullName } });
            if (user === null) {
                res.json({
                    messege: 'User not found!'
                }, 404);
            } else {
                res.json(user);
            };
        } else {
            const users = Admin.findAll().then((results) => {
                res.json(results);
            });
        };
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    };
};

const getUser = async(req, res) => {
    const primaryK = req.params.id
    try {
        const user = await Admin.findByPk(primaryK);
        if (user) {
            res.json(user);
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

        try {
            const user = Admin.create(userData);
            res.json('Usuario Creado');
        } catch (error) {
            console.error(error);
            if (error.message == "ValidationError") {
                res.json({
                    message: error.message
                }, 400);
            } else {
                res.json({
                    message: error.message
                }, 500);
            }
        };
    };
};

const loginUser = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            messege: "invalid user or password"
        }, 400);
    } else {
        const user = await Admin.findOne({ where: { email: req.query.email } });
        if (!user) {
            res.json({
                messege: 'invalid user or password'
            }, 400);
        } else {
            try {
                const validated = bcrypt.compareSync(req.body.password, user.password);
                if (validated) {
                    const token = jwt.sign({
                        _id: user._id,
                        role: user.role
                    }, process.env.PRIVATE_KEY, {
                        expiresIn: '4h'
                    });
                    res.json(token);
                } else {
                    res.json({
                        message: "invalid user or password"
                    }, 400);
                }
            } catch (error) {
                console.error(error);
                res.json({
                    message: error.message
                }, 500);
            }
        }
    }
};

const updateUser = async(req, res) => {

    try {
        const primaryK = req.params.id;
        const user = await Admin.findByPk(primaryK)
        const newData = req.body;
        if (user) {

            if (req.body.password) {
                const salt = bcrypt.genSaltSync(7);
                const hash = bcrypt.hashSync(req.body.password, salt);
                newData.password = hash;
            };

            const userUpdate = Admin.findByPk(primaryK).then(Admin => {
                Admin.update(newData)
            });

            res.json('Usuario Modificado');

        } else {
            res.json({
                message: 'user not found'
            }, 404);
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    loginUser,

}