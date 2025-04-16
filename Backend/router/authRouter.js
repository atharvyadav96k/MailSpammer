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
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
        const user = new userSchema({
            username,
            email,
            password: hashedPassword
        });
        await user.save();
        return res.redirect("https://www.fluxmailer.sbs"+"/auth/signin.html");
    } catch (err) {
        return res.redirect("https://www.fluxmailer.sbs"+"error-500.html")
    }
});

auth.post('/signin', isAuth,async (req, res) => {
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
            return res.redirect("https://www.fluxmailer.sbs"+"/error-404.html")
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect username or password",
                success: false,
            });
        }

        // Generate random token and save it
        const token = generateToken();
        user.token = token;
        await user.save();

        // Create a JWT from the token
        const signedToken = jwt.sign({ token: token, user: user.email }, process.env.JWT_SECRET);

        // Send JWT in cookie
        res.cookie("token", signedToken, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000
        }); 

        return res.redirect("https://www.fluxmailer.sbs"+'/dashboard')
    } catch (err) {
        return res.redirect("https://www.fluxmailer.sbs"+"/error-500.html");
    }
});

module.exports = auth;
