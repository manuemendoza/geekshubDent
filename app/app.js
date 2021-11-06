require('dotenv').config();

const express = require('express');

// const routerAppoinments = require('./appoinments/router');
const routerClients = require('./clients/router');
const routerAdmins = require('./admins/router');

const app = express();

app.use(express.json());
// app.use("/appoinments", routerAppoinments);
app.use("/client", routerClients);
app.use("/admin", routerAdmins);

app.listen(process.env.PORT, () => console.log('El servidor esta levantado en', process.env.PORT));