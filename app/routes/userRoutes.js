const express = require('express');
const { registerUser, loginUser, whoami, getAllUsers } = require ('../controllers/userController');
const router = express.Router();

const authenticateJWT = require('../middlewares/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authenticateJWT, getAllUsers);
router.get('/whoami', authenticateJWT, whoami);

module.exports = router;
