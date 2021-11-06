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

const createAppoinment = (req, res) => {
    const appoinment = Appoinment.create(req.body);
    console.log(appoinment);
    // await appoinment.save()
    // res.json()
};

module.exports = {
    createAppoinment
}