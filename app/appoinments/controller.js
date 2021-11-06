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

const createAppoinments = async (req, res) => {
    const user = Appointments.create(req.body);
    await user.save();
    console.log(user);
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

