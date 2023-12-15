const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Train = require('../models/Train');
const { ticketSchema } = require('../middlewares/validationSchema');

const bookTicket = async (req, res) => {
    try {
        await ticketSchema.validateAsync(req.body);

        const currentUser = await User.findOne({_id: req.userId});

        const ticket = new Ticket({
            owner: currentUser,
            train: req.body.train,
            isValid: false
        });

        ticket.save()
            .then(result => {
            res.status(201).json(result);
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMyTickets = (req, res) => {
    Ticket.find({owner: req.userId, isValid: true})
        .populate('train')
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' })
        });
};

const getAllTickets = async (req, res) => {
    const currentUser = await User.findOne({_id: req.userId});

    if (currentUser.role == "EMPLOYEE" || currentUser.role == "ADMIN") {
        Ticket.find()
            .populate('owner')
            .populate('train')
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' })
            });
    } else {
        res.status(403).json({ error: 'You do not have the suffisant privilieges to perform this action'})
    }
};

const updateTicket = async (req, res) => {
    const currentUser = await User.findOne({_id: req.userId});

    if (currentUser.role == "EMPLOYEE" || currentUser.role == "ADMIN") {
        const id = req.params.id;

        Ticket.findByIdAndUpdate(id , req.body)
            .then(result => {
                if (result) {
                    res.status(200).send('Updated ticket successfully'); // 200 OK
                } else {
                    res.status(404).json({ error: 'Ticket not found' }); // 404 Not Found
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
            });
    } else {
        res.status(403).json({ error: 'You do not have the suffisant privilieges to perform this action'})
    }
};


const deleteTicket = async (req, res) => {
    const currentUser = await User.findOne({_id: req.userId});

    if (currentUser.role == "EMPLOYEE" || currentUser.role == "ADMIN") {
        const id = req.params.id;

        Ticket.findByIdAndDelete(id)
            .then(result => {
                res.send('Ticket deleted successful');
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.status(403).json({ error: 'You do not have the suffisant privilieges to perform this action'})
    }
};

module.exports = { bookTicket, getMyTickets, getAllTickets, updateTicket, deleteTicket };
