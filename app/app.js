const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const APP = express();
const PORT = 3000;
const DB_URI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo/?retryWrites=true&w=majority`;

const trainRoutes = require('./routes/trainRoutes');
const stationRoutes = require('./routes/stationRoutes');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

APP.use(express.json());

mongoose.connect(DB_URI)
    .then((result) => console.log('Successfully connected to the database!'))
    .catch((err) => console.log(err));

APP.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

APP.use('/v1/trains', trainRoutes);
APP.use('/v1/stations', stationRoutes);
APP.use('/v1/users', userRoutes);
APP.use('/v1/tickets', ticketRoutes);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
APP.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
