const express = require('express');
const { registerUser, loginUser, whoami, getAllUsers, deleteUser, updateMyself, updateUser } = require ('../controllers/userController');
const router = express.Router();

const authenticateJWT = require('../middlewares/auth');

router.get('/', authenticateJWT, getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/whoami', authenticateJWT, whoami);
router.put('/', authenticateJWT, updateMyself);
router.put('/:id', authenticateJWT, updateUser);
router.delete('/', authenticateJWT, deleteUser);

module.exports = router;
