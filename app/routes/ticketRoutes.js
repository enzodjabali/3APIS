const express = require('express');
const { bookTicket, getMyTickets } = require ('../controllers/ticketController');
const router = express.Router();

const authenticateJWT = require('../middlewares/auth');

router.get('/', authenticateJWT, getMyTickets);
router.post('/', authenticateJWT, bookTicket);

module.exports = router;
