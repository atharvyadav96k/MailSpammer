const express = require('express');
const auth = express.Router();
const userSchema = require('../schema/user');
const bcrypt = require('bcrypt')


auth.get('/', (req,res)=>{
    res.send("Auth");
})

auth.post('/signup', async (req, res)=>{
    const {username, email, password} = req.body;
    try{
        const hashPassword = await bcrypt.hashSync(password, process.env.BCRYPT_SALT);
        const user = userSchema({
            username, email, password: hashPassword
        });
        await user.save();
        return res.status(201).json({
            message: "Successfully create",
            success: true
        });
    }catch(err){
        return res.status(500).json({
            message: "Unable to create account",
            error: err.message,
            success: false
        });
    }
});

auth.post('/signin', async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await userSchema.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password",
                success: false
            });
        }

        return res.status(200).json({
            message: "Sign-in successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: "Failed to sign-in",
            error: err.message,
            success: false
        });
    }
});

module.exports = auth;