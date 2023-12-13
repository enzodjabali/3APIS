const Train = require('../models/Train');

const createTrain = (req, res) => {
    const train = new Train({
        name: req.body.name,
        departureTime: req.body.departureTime,
        startStation: req.body.startStation,
        endStation: req.body.endStation
    });

    train.save()
        .then(result => {
         res.status(201).json(result);
       })
        .catch (err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
       });
};

const getAllTrains = (req, res)=> {
    Train.find()
        .populate('startStation')
        .populate('endStation')
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' })
        });
};

const getSingleTrain = (req, res) => {
    const id = req.params.id;

    Train.findById(id)
        .populate('startStation')
        .populate('endStation')
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(404).json({ error: 'Train not found' });
        });
};

const updateTrain = (req, res) => {
    const id = req.params.id;

    Train.findByIdAndUpdate(id , req.body)
        .then(result => {
            if (result) {
                res.status(200).send('Updated train successfully'); // 200 OK
            } else {
                res.status(404).json({ error: 'Train not found' }); // 404 Not Found
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
        });
};

const deleteTrain = (req, res) => {
    const id = req.params.id;

    Train.findByIdAndDelete(id)
        .then(result => {
            res.send('Train deleted successful');
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = { createTrain , getAllTrains, getSingleTrain, updateTrain, deleteTrain };
