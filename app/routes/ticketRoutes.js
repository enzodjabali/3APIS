const express = require('express');
const { bookTicket, getMyTickets, getAllTickets, updateTicket, deleteTicket } = require ('../controllers/ticketController');
const router = express.Router();

const authenticateJWT = require('../middlewares/auth');

router.get('/', authenticateJWT, getAllTickets);
router.get('/me', authenticateJWT, getMyTickets);
router.post('/', authenticateJWT, bookTicket);
router.put('/:id', authenticateJWT, updateTicket);
router.delete('/:id', authenticateJWT, deleteTicket);

module.exports = router;
