const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());

//const dbURI = process.env.dbURI;
const dbURI = "mongodb://root:example@mongo/?retryWrites=true&w=majority";

mongoose.connect(dbURI)
    .then((result)=>console.log('Successfully connected to the database!'))
    .catch((err)=> console.log(err))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

app.use('/items', itemRoutes);
app.use('/users', userRoutes);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




