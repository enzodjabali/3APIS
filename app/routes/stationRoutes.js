const express = require('express');
const { createStation , getAllStations, getSingleStation, updateStation, deleteStation } = require ('../controllers/stationController');
const router = express.Router();

const authenticateJWT = require('../middlewares/auth');

router.post('/', authenticateJWT, createStation);
router.get('/', authenticateJWT, getAllStations);
router.get('/:id',authenticateJWT, getSingleStation);
router.put('/:id', authenticateJWT, updateStation);
router.delete('/:id', authenticateJWT, deleteStation);

module.exports = router;
