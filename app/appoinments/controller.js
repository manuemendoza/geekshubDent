
const { Appoinment } = require('../../models/index');
const { Client } = require('../../models/index')

const appoinmentCont = {};

appoinmentCont.getAll = (req, res) => {
    try{
        Appoinment.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Ha surgido algún error al intentar acceder a las citas."
            });
        });
    }
    catch{
        res.json({
            message: 'Algo ha ido mal'
        })
    }
};

appoinmentCont.getById = (req, res) => {
    const id = req.params.id;
  
    Appoinment.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
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
};

appoinmentCont.update = (req, res) => {

    if (req.user.usuario.role == "admin") {
  
            const id = req.params.id;
  
            Appoinment.update(req.body, {
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

  appoinmentCont.delete = (req, res) => {

    if (req.body.Client.rol == "admin" || req.user.Client.id == req.body.clientId) {
  
          const id = req.params.id;
  
          Appoinment.destroy({
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

// const createAppoinment = async(req, res) => {
//     const appoinment = new Appoinments(req.body);
//     console.log(appoinment);
//     await appoinment.save()
//     res.json()
// };

// module.exports = {
//     createAppoinment,
//     appoinmentCont

// }