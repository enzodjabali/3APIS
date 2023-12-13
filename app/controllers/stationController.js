const Station = require ('../models/Station');

const createStation = (req, res) => {
    const station = new Station({
        name: req.body.name,
        openHour: req.body.openHour,
        closeHour: req.body.closeHour
    });

    station.save()
        .then(result => {
         res.status(201).json(result);
       })
        .catch (err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
       });
};

const getAllStations = (req, res)=> {
    Station.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' })
        });
};

const getSingleStation = (req, res) => {
    const id = req.params.id;

    Station.findById(id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(404).json({ error: 'Station not found' });
        });
};

const updateStation = (req, res) => {
    const id = req.params.id;

    Station.findByIdAndUpdate(id , req.body)
        .then(result => {
            if (result) {
                res.status(200).send('Updated station successfully'); // 200 OK
            } else {
                res.status(404).json({ error: 'Station not found' }); // 404 Not Found
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
        });
};

const deleteStation = (req, res) => {
    const id = req.params.id;

    Station.findByIdAndDelete(id)
        .then(result => {
            res.send('Station deleted successful');
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = { createStation , getAllStations, getSingleStation ,updateStation, deleteStation };
