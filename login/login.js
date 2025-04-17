const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../model/accounts');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; 

exports.account_open = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await Account.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

        res.json({ message: "Login successful", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
