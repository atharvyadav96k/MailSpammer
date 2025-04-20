const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/token');
const userSchema = require('../schema/user');
const { isAuth } = require('../utils/isAuth');

const auth = express.Router();

auth.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Hello")
    try {
        const userName = await userSchema.findOne({username});
        console.log(userName)
        if(userName){
            return res.status(409).json({
                message: "Username already used",
                success: false,
                error: "duplication error"
            });
        }
        const userEmail = await userSchema.findOne({email});
        if(userEmail){
            return res.status(409).json({
                message: "Email is already used",
                success: false,
                error: "duplication error"
            })
        }
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
        const user = new userSchema({
            username,
            email,
            password: hashedPassword
        });
        await user.save();
        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to create account",
            success: false
        })
    }
});

auth.post('/signin',async (req, res) => {
    const { identity, password } = req.body;
    console.log(identity);
    try {
        const user = await userSchema.findOne({
            $or: [
                { username: identity },
                { email: identity }
            ]
        });

        if (!user) {
            return res.status(200).json({
                message: "User not found",
                error: "404",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect username or password",
                success: false,
            });
        }

        const token = generateToken();
        user.token = token;
        await user.save();

        const signedToken = jwt.sign({ token: token, user: user.email }, process.env.JWT_SECRET);

        return res.status(200).json({
            cookie : signedToken,
            message : "Login successful",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Login Failed",
            error: err.message,
            success: false
        })
    }
});

module.exports = auth;
