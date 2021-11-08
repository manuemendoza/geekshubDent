const { Appointment, sequelize: {Op} } = require('../../models/index.js');
const { Client } = require('../../models/index.js')
const { Admin } = require('../../models/index.js')


const appoinmentCreate = async(req, res) => {
      try{
        if (!req.body.date) {
          res.status(400).send({
            message: "El contenido no puede estar vacío"
          });
        } else{
            const newAppoinment = req.body.date;
            
            const appoinment = await Appointment.create(newAppoinment);
            res.status(200).json({ appoinment, message: 'Su cita ha sido creada'}); 

            // Dice que está deprecado el método res.json() que usemos res.status.json
          };
      }catch (error) {
         res.status(500).send({
            message: "Ha surgido algún error al intentar crear la cita."
          });
        };
};

const appoinmentGetAll = async (req, res) => {
      const user = req.query.date
 //   try{
        let data = {
          where:{}
        };
        if(user){
          data.where.date = {[Op.like]: date}
        }
        const buscar = await Appointment.findAll(data);
        res.json(buscar);
  }
 //   catch{
  //      res.json({
  //          message: 'Algo ha ido mal'
   //     })
    //}
//};

const appoinmentGetById = (req, res) => {
    const id = req.params.id;
  
    Appointment.findByPk(id)
      .then(data => {
        if (id) {
          res.json(data);
        } else {
          res.status(404).send({
            message: `No existe la cita con el id ${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ha surgido algún error al intentar acceder a la cita con el id " + id + "."
        });
      });

const appoinmentUpdate = (req, res) => {

    if (req.user.Admin.role == "admin") {
  
            const id = req.params.id;
  
            Appointment.update(req.body, {
              where: { id: id }
            })
              .then(num => {
                if (num == 1) {
                  res.send({
                    message: "La cita ha sido actualizada correctamente."
                  });
                } else {
                  res.send({
                    message: `No se ha podido actualizar la cita con el id ${id}`
                  });
                }
              })
              .catch(err => {
                res.status(500).send({
                  message: "Ha surgido algún error al intentar actualizar la cita con el id " + id + "."
                });
              });
    }else{
      res.send({
        message: `No tienes permisos para actualizar la información de la cita. Contacta con un administrador.`
      });
    }
  };

const appoinmentDelete = (req, res) => {

    if (req.body.Client.rol == "admin" || req.user.Client.id == req.body.clientId) {
  
          const id = req.params.id;
  
          Appointment.destroy({
              where: { id: id }
          })
              .then(num => {
                  if (num == 1) {
                      res.send({
                          message: `La cita con id ${id} ha sido eliminada correctamente.`
                      });
                  } else {
                      res.send({
                          message: `No se ha podido eliminar la cita con id ${id}.`
                      });
                  }
              })
              .catch(err => {
                  res.status(500).send({
                      message: "Ha surgido algún error al intentar borrar la cita con el id " + id
                  });
              });
    }else{
      res.send({
        message: `No tienes permisos para borra la cita.`
      });
    }
  };

module.exports = {
  appoinmentCreate,
  appoinmentGetAll,
  appoinmentGetById,
  appoinmentUpdate,
  appoinmentDelete
}}