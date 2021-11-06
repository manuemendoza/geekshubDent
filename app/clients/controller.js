const {Appointments} = require('../../models/appointment')

const createUser = async (req, res) => {
    const user = Appointments.create(req.body);
    await user.save();
    console.log(user);
};

module.exports = {
    createUser
}