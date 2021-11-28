require('dotenv').config();

const express = require('express');

const routerAppoinments = require('./appoinments/router');
const routerClients = require('./clients/router');
const routerAdmins = require('./admins/router');
const routerPet = require('./pet/router')
const authMiddleWare = require("./auth");

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());
app.use("/appoinments", routerAppoinments);
app.use("/clients", routerClients);
app.use("/admins", routerAdmins);
app.use("/pet", routerPet)

app.listen(process.env.PORT, () => console.log('el servido esta en el puerto', process.env.PORT));
