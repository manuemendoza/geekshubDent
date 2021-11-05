require('dotenv').config();

const express = require('express');

// const routerAppoinments = require('./appoinments/router');
const routerClients = require('./clients/router');

const app = express();

app.use(express.json());
// app.use("/appoinments", routerAppoinments);
app.use("/client", routerClients);

app.listen(9068, () => console.log('El servidor esta levantado en 9068'));