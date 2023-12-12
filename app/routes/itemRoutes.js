const express = require('express');
const { createPostItems, getAllItems, getSingleItem, updateItems, deleteItem} = require ('../controllers/itemController');
const router = express.Router();

const authenticateJWT = require('../middlewares/auth');

router.post('/', authenticateJWT, createPostItems);
router.get('/', authenticateJWT, getAllItems);
router.get('/:id',authenticateJWT, getSingleItem);
router.put('/:id', authenticateJWT, updateItems);
router.delete('/:id', authenticateJWT, deleteItem);

module.exports = router;
