const { where } = require('sequelize/types');
const { Appoinment } = require('../../models/index');
const { Client } = require('../../models/index')

// appoinmentCont.getAll = (req, res) => {
//     try{
//         Appoinment.findAll()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//             message:
//                 err.message || "Ha surgido algún error al intentar acceder a las citas."
//             });
//         });
//     }
//     catch{
//         res.json({
//             message: 'Algo ha ido mal'
//         })
//     }
// };

// appoinmentCont.getById = (req, res) => {
//     const id = req.params.id;

//     Appoinment.findByPk(id)
//       .then(data => {
//         if (data) {
//           res.send(data);
//         } else {
//           res.status(404).send({
//             message: `No existe la cita con el id ${id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Ha surgido algún error al intentar acceder a la cita con el id " + id + "."
//         });
//       });
//   };

const createAppoinment = async(req, res) => {
    const appoinment = await Appoinment.create(req.body);
    console.log(appoinment);

    res.json('su numero de cita es', appoinment.id);
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



module.exports = {
    createAppoinment
}