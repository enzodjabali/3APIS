const Train = require('../models/Train');
const User = require('../models/User');
const { createTrainSchema, updateTrainSchema } = require('../middlewares/validationSchema');

const minioClient = require('../middlewares/minioClient');

const createTrain = async (req, res) => {
    try {
        await createTrainSchema.validateAsync(req.body);

        const currentUser = await User.findOne({ _id: req.userId });

        if (currentUser.role === "ADMIN") {
            const image = req.body.image;
            let imageReference = "none";

            if (image) {
                const matches = image.data.match(/^data:image\/([a-zA-Z0-9]+);base64,/);
                const imagesExtension = matches && matches[1] ? matches[1] : "jpeg";
                imageReference = Math.random().toString(36).substring(2, 20) + '.' + imagesExtension ?? "none";
            }

            const train = new Train({
                name: req.body.name,
                departureDate: new Date(req.body.departureDate),
                startStation: req.body.startStation,
                endStation: req.body.endStation,
                imageReference: imageReference,
            });

            train.save()
                .then(result => {
                    if (imageReference !== "none") {
                        const decodedFileContent = Buffer.from(image.data, 'base64');

                        minioClient.putObject("3apis", imageReference, decodedFileContent, function (error, etag) {
                            if (error) {
                                console.error(error);
                                res.status(500).json({ error: 'Error saving image to Minio' });
                            } else {
                                res.status(201).json(result);
                            }
                        });
                    } else {
                        res.status(201).json(result);
                    }
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ error: 'Error saving train to database' });
                });
        } else {
            res.status(403).json({ error: 'You do not have the sufficient privileges to perform this action' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getAllTrains = (req, res) => {
    switch (req.params.sortBy) {
        case "name":
            sortBy = { name: 1 }
            break;
        case "departureDate":
            sortBy = { departureDate: 1 }
            break;
        case "startStation":
            sortBy = { startStation: 1 }
            break;
        case "endStation":
            sortBy = { endStation: 1 }
            break;
        default:
            sortBy = { name: 1 }
            break;
    }

    const limit = req.params.limit ? parseInt(req.params.limit) : 10;
      
    Train.find().sort(sortBy).limit(limit)
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
        .catch(err => {
            console.log(err);
            res.status(404).json({ error: 'Train not found' });
        });
};

const updateTrain = async (req, res) => {
    try {
        await updateTrainSchema.validateAsync(req.body);

        const currentUser = await User.findOne({_id: req.userId});

        if (currentUser.role == "ADMIN") {
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
        } else {
            res.status(403).json({ error: 'You do not have the suffisant privilieges to perform this action'})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTrain = async (req, res) => {
    const currentUser = await User.findOne({_id: req.userId});

    if (currentUser.role == "ADMIN") {
        const id = req.params.id;

        Train.findByIdAndDelete(id)
            .then(result => {
                res.send('Train deleted successful');
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.status(403).json({ error: 'You do not have the suffisant privilieges to perform this action'})
    }
};

module.exports = { createTrain , getAllTrains, getSingleTrain, updateTrain, deleteTrain };
