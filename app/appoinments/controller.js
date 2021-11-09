const moment = require('moment');
const { Appointment, Client, Admin, sequelize: { Op } } = require('../../models/index');

const appoinmentGetAll = async(req, res) => {
    const date = moment(req.query.startsAt);

    const filter = {
        where: {}
    };

    if (date) {
        filter.where.startsAt = {
            [Op.gte]: date
        };
    }

    if (req.role == 'client') {
        filters.where.id = req.id;
    }

    try {
        const busqueda = await Appointment.findAll(filter);
        res.json(busqueda);
    } catch (error) {
        res.json({
            message: error.message
        }, 500);
    };
};

const appoinmentGetById = async(req, res) => {
    const id = req.params.id;
    try {
        const busqueda = await Appointment.findByPk(id);
        if (busqueda) {
            res.json(busqueda);
        } else {
            res.status(404).send({
                message: `No existe la cita con el id ${id}.`
            });
        }
    } catch {
        res.status(500).send({
            message: "Ha surgido algún error al intentar acceder a la cita con el id " + id + "."
        });
    }
};
const appoinmentCreate = async(req, res) => {
    const startAt = moment(req.body.startsAt);
    const endsAt = startAt.clone().add(2, 'hours');
    try {
        if (!date) {
            res.status(400).send({
                message: "El contenido no puede estar vacío"
            });
        } else {
            /**
             * select * from appointments where
             * (appointments.startsAt > STARTSAT and appointments.startsAt < ENDSAT) or
             * (appointments.endsAt > STARTAT and appointments.endsAt < ENDSAT) or
             * (STARTSAT > appointment.startsAt and STARTSAT < appointments.endsAt) or
             * (ENDSAT > appointment.startsAt and ENDSAT < appointment.endsAt)
             */
            const matches = await Appointment.findAll({
                where: {
                    [Op.or]: [{
                            startsAt: {
                                [Op.gt]: startsAt,
                                [Op.lt]: endsAt
                            }
                        },
                        {
                            endsAt: {
                                [Op.gt]: startsAt,
                                [Op.lt]: endsAt
                            }
                        },
                        {
                            startsAt: {
                                [Op.lt]: startsAt
                            },
                            endsAt: {
                                [Op.gt]: startsAt
                            }
                        },
                        {
                            startsAt: {
                                [Op.lt]: endsAt
                            },
                            endsAt: {
                                [Op.gt]: endsAt
                            }
                        }
                    ]
                }
            });

            if (matches.length > 0) {
                res.json({
                    message: 'timeframe is already taken'
                }, 400);
            } else {
                const startsAt = moment(req.body.startsAt);
                const appoinment = await Appointment.create({
                    startsAt: startsAt,
                    endsAt: endsAt
                });
                res.status(200).json({ appoinment, message: 'Su cita ha sido creada' });
            }
        };
    } catch (error) {
        res.status(500).send({
            message: "Ha surgido algún error al intentar crear la cita."
        });
    };
};

const deleteAppoinmet = async(req, res) => {
    const appoinmentId = req.params.id;
    const appoinment = await Appoinment.findbyPk(appoinmentId);
    try {
        if (appoinment) {
            await Appoinment.destroy({
                where: {
                    id: appoinmentId
                }
            });
            res.json({
                message: 'appoinmet deleted'
            }, 200);
        } else {
            res.json({
                message: 'appoinmet not found'
            }, 404);
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};



// module.exports = {
//     createAppoinment
// }