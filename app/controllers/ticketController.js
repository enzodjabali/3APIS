const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Train = require('../models/Train');

const bookTicket = async (req, res) => {
    const currentUser = await User.findOne({_id: req.userId});

    const ticket = new Ticket({
        owner: currentUser,
        train: req.body.train,
    });

    ticket.save()
        .then(result => {
        res.status(201).json(result);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
    });
};

const getMyTickets = (req, res) => {
    Ticket.find({owner: req.userId})
        .populate('train')
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' })
        });
};

module.exports = { bookTicket , getMyTickets };
