const Station = require('../models/Station');
const User = require('../models/User');
const { createStationSchema, updateStationSchema } = require('../middlewares/validationSchema');

const createStation = async (req, res) => {
    try {
        await createStationSchema.validateAsync(req.body);

        const currentUser = await User.findOne({_id: req.userId});

        if (currentUser.role == "ADMIN") {
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
        } else {
            res.status(403).json({ error: 'You do not have the suffisant privilieges to perform this action'})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }     
};

const getAllStations = (req, res) => {
    const sortByName = req.params.sortByName == 'true' ? 1 : -1;

    Station.find().sort({ name: sortByName })
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

const updateStation = async (req, res) => {
    try {
        await updateStationSchema.validateAsync(req.body);
    
        const currentUser = await User.findOne({_id: req.userId});

        if (currentUser.role == "ADMIN") {
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
        } else {
            res.status(403).json({ error: 'You do not have the suffisant privilieges to perform this action'})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteStation = async (req, res) => {
    const currentUser = await User.findOne({_id: req.userId});

    if (currentUser.role == "ADMIN") {
        const id = req.params.id;

        Station.findByIdAndDelete(id)
            .then(result => {
                res.send('Station deleted successful');
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.status(403).json({ error: 'You do not have the suffisant privilieges to perform this action'})
    }
};

module.exports = { createStation , getAllStations, getSingleStation ,updateStation, deleteStation };
