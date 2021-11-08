const moment = require('moment')
const { Appointment } = require('../../models/index.js');

const appoinmentCreate = async(req, res) => {
      try{
        if (!req.body.startsAt) {
          res.status(400).send({
            message: "El contenido no puede estar vacío"
          });
        } else{
            const startsAt = moment(req.body.startsAt);
            console.log(moment(req.body.startsAt))
            const appoinment = await Appointment.create({
              startsAt:startsAt
            });
            res.status(200).json({ appoinment, message: 'Su cita ha sido creada'}); 
          };
      }catch (error) {
         res.status(500).send({
            message: "Ha surgido algún error al intentar crear la cita."
          });
        };
};

const appoinmentGetAll = async (req, res) => {
      const user = moment(req.query.startsAt)
      try{
        const busqueda = await Appointment.findAll();
        res.json(busqueda);
      }
      catch{
        res.json({
          message: 'Something has gone wrong'
        });
      };  
};

const appoinmentGetById = async(req, res) => {
        const id = req.params.id;
        try{ 
        const busqueda = await Appointment.findByPk(id)
            if (busqueda) {
              res.json(busqueda);
            } else {
              res.status(404).send({
                message: `No existe la cita con el id ${id}.`
              });
            }}
        catch{
            res.status(500).send({
              message: "Ha surgido algún error al intentar acceder a la cita con el id " + id + "."
            });
          }
  };

  const appoinmentDelete = async(req, res) => {
    const appoinment = req.params.id
    const lookingForAppoinmet = await Appointment.findByPk(appoinment);
    try {
        if (lookingForAppoinmet) {
            await Appointment.destroy({
                where: {
                    id: lookingForAppoinmet.id
                }
            });
            res.json({
                message: 'appoinmet deleted'
            }, 200)
        } else {
            res.json({
                message: 'appoinmet not found'
            }, 404)
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

module.exports = {
  appoinmentCreate,
  appoinmentGetAll,
  appoinmentGetById,
  appoinmentDelete
};