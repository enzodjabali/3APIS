const User = require ('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, 10);
    let role = "USER";

    const user = new User({
        username: username,
        email: email,
        password: password,
        role: role,
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

const getAllUsers = async (req, res) => {
    const currentUser = await User.findOne({_id: req.userId});

    if (currentUser.role == "EMPLOYEE" || currentUser.role == "ADMIN") {
        User.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' })
        });
    } else {
        res.status(403).json({ error: 'You do not have the suffisant privilieges to perform this action'})
    }
};

const whoami = async (req, res) => {
    try {
        User.findOne({_id: req.userId}).then(function(currentUser) {
            res.status(200).json({ currentUser });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = (req, res) => {
    User.findByIdAndDelete({_id: req.userId})
        .then(result => {
            res.send('Your account has been successfully deleted');
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = { registerUser, loginUser, getAllUsers, whoami, deleteUser };
