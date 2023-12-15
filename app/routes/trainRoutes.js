const express = require('express');
const { createTrain , getAllTrains, getSingleTrain, updateTrain, deleteTrain, testImage } = require ('../controllers/trainController');
const router = express.Router();

const authenticateJWT = require('../middlewares/auth');

router.post('/', authenticateJWT, createTrain);
router.get('/all/:sortBy/:limit?', authenticateJWT, getAllTrains);
router.get('/:id',authenticateJWT, getSingleTrain);
router.put('/:id', authenticateJWT, updateTrain);
router.delete('/:id', authenticateJWT, deleteTrain);
router.post('/image', testImage);

module.exports = router;
