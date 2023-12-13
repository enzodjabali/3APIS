const express = require('express');
const { createTrain , getAllTrains, getSingleTrain, updateTrain, deleteTrain } = require ('../controllers/trainController');
const router = express.Router();

const authenticateJWT = require('../middlewares/auth');

router.post('/', authenticateJWT, createTrain);
router.get('/', authenticateJWT, getAllTrains);
router.get('/:id',authenticateJWT, getSingleTrain);
router.put('/:id', authenticateJWT, updateTrain);
router.delete('/:id', authenticateJWT, deleteTrain);

module.exports = router;
