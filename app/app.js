const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const itemRoutes = require('./routes/itemRoutes');
const PORT = 3000;
const app = express();

app.use(express.json());

//const dbURI = process.env.dbURI;
const dbURI = "mongodb://root:example@mongo/?retryWrites=true&w=majority";

mongoose.connect(dbURI)
    .then((result)=>console.log('connected to the db'))
    .catch((err)=> console.log(err))

app.listen(PORT, () => {
    console.log(`First exercise app listening on port ${PORT}`);
});

app.use('/items', itemRoutes);





