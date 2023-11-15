const express = require('express');
const {createPostItems, getAllItems, getSingleItem, updateItems, deleteItem} = require ('../controllers/itemController');
const router = express.Router();

const { verifyToken } = require('../security/verifyToken');

router.post('/', verifyToken, createPostItems);
router.get('/', verifyToken, getAllItems);
router.get('/:id',verifyToken, getSingleItem);
router.put('/:id', verifyToken, updateItems);
router.delete('/:id', verifyToken, deleteItem);

module.exports = router;
