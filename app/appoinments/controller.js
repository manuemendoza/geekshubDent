const moment = require('moment')
const { Appointment, sequelize:{Op}, Clients, Admins } = require('../../models/index.js');

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

// const appoinmentDelete = (req, res) => {

//     if (req.body.Client.rol == "admin" || req.user.Client.id == req.body.clientId) {
  
//           const id = req.params.id;
  
//           Appointment.destroy({
//               where: { id: id }
//           })
//               .then(num => {
//                   if (num == 1) {
//                       res.send({
//                           message: `La cita con id ${id} ha sido eliminada correctamente.`
//                       });
//                   } else {
//                       res.send({
//                           message: `No se ha podido eliminar la cita con id ${id}.`
//                       });
//                   }
//               })
//               .catch(err => {
//                   res.status(500).send({
//                       message: "Ha surgido algún error al intentar borrar la cita con el id " + id
//                   });
//               });
//     }else{
//       res.send({
//         message: `No tienes permisos para borra la cita.`
//       });
//     }
//   };

module.exports = {
  appoinmentCreate,
  appoinmentGetAll,
  appoinmentGetById
  // appoinmentDelete
};