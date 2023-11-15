const User = require ('../models/User');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    let username = req.body.username;
    let password = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        username: username,
        password: password,
    });

    user.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Internal Server Error'});
        })
};

const loginUser = async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        // Find the user in the database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Create and send a JWT token
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser };
