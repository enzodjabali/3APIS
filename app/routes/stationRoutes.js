const express = require('express');
const { createStation , getAllStations, getSingleStation, updateStation, deleteStation } = require ('../controllers/stationController');
const router = express.Router();

const authenticateJWT = require('../middlewares/auth');

router.get('/all/:sortByName?', authenticateJWT, getAllStations);
router.post('/', authenticateJWT, createStation);
router.get('/:id',authenticateJWT, getSingleStation);
router.put('/:id', authenticateJWT, updateStation);
router.delete('/:id', authenticateJWT, deleteStation);

module.exports = router;
