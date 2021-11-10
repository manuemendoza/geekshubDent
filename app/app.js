require('dotenv').config();

const express = require('express');

// const routerAppoinments = require('./app/appoinments/router');
const routerClients = require('./clients/router');
const routerAdmins = require('./admins/router');
const authMiddleWare = require("./auth");

const app = express();

app.use(express.json());
// app.use("/appoinments", routerAppoinments);
app.use("/clients", routerClients);
app.use("/admins", routerAdmins);

app.listen(process.env.PORT, () => console.log('el servido esta en el puerto', process.env.PORT));