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


// const createAppoinment = async(req, res) => {
//     const appoinment = new Appoinments(req.body);
//     console.log(appoinment);
//     await appoinment.save()
//     res.json()
// };

// module.exports = {
//     createAppoinment
//     appoinmentCont
// }