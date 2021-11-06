// const express = require('express');
const {Appointments} = require('../../models/appointment')

// // const getAppoinments = (req, res) => {
// //     const appoinments
// // };

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

module.exports = {
    createAppoinments
}