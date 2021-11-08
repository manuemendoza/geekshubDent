const { Client, sequelize: { Op }, Token } = require('../../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async(req, res) => {
    const name = req.query.fullName;
    let filters = {
        where: {}
    };

    if (req.role == 'client') {
        filters.where.id = req.id;
    }

    if (name) {
        filters.where.fullName = {
            [Op.like]: name
        };
    }

    try {
        const client = await Client.findAll(filters);
        res.json(client);
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    };
};

const getUser = async(req, res) => {
    const primaryK = req.params.id;
    try {
        const client = await Client.findByPk(primaryK);
        if (client) {
            res.json(client);
        } else {
            res.json({
                messege: 'client not found'
            }, 404)
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

const createUser = async(req, res) => {
    if (!req.body.password) {
        res.json({
            message: 'password is required'
        }, 400)
    } else {

        const clientData = req.body;

        const salt = bcrypt.genSaltSync(7);
        const hash = bcrypt.hashSync(req.body.password, salt);
        clientData.password = hash;

        try {
            const client = await Client.create(clientData);
            res.json({
                client
            }, 201);
        } catch (error) {
            console.error(error);
            if (error.message == "Validation error") { // @TODO: include mysql validation errors
                res.json({
                    message: error.original.message
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
        const client = await Client.findOne({ where: { email: req.query.email } });
        if (!client) {
            res.json({
                messege: 'invalid user or password'
            }, 400);
        } else {
            try {
                const validated = bcrypt.compareSync(req.body.password, client.password);
                if (validated) {
                    const token = jwt.sign({
                        id: client.id,
                        role: 'client'
                    }, process.env.PRIVATE_KEY, {
                        expiresIn: '24h'
                    });
                    const createToke = await Token.create({ token: token }); //@todo: crear base de datos y ver si esto es viable
                    const idAssignment = await Token.create({ userId: client.id });
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

const logoutUser = async(req, res) => {
    const client = await findOne({
        where: email //esto esta mal solo es para ver como puedo hacerlo
    });
    const usuarioToken = await Token.findOne(client.id)
    const borradoToken = await Token.destroy({
        token: usuarioToken.token
    })
};

const updateUser = async(req, res) => {

    try {
        const primaryK = req.params.id;
        const client = await Client.findByPk(primaryK);
        const newData = req.body;
        if (client) {
            if (req.body.password) {
                const salt = bcrypt.genSaltSync(7);
                const hash = bcrypt.hashSync(req.body.password, salt);
                newData.password = hash;
            };
            const clientUpdate = await client.update(newData);
            res.json(clientUpdate);
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

const deleteUser = async(req, res) => {
    const primaryK = req.params.id;
    try {
        const client = await Client.findByPk(primaryK);
        if (client) {
            await Client.destroy({
                where: { id: primaryK }
            });
            res.json({
                message: "client deleted"
            });
        } else {
            res.json({
                message: 'client not found'
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
    deleteUser
}