require('dotenv').config();

const express = require('express');

const routerAppoinments = require('./appoinments/router');
const routerClients = require('./clients/router');

app = express();
app.use("/appoinments", routerAppoinments);
app.use("/client", routerClients);

app.listen(9068, () => console.log('El servidor esta levantado en 9068'));