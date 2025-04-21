const jwt = require('jsonwebtoken');
const userSchema = require('../schema/user');
const user = require('../schema/user');

exports.isAuth = async (req, res, next) => {
    // console.log(req.body)
    if (req.body.cookies) {
        const cookiesData = jwt.verify(req.body.cookies, process.env.JWT_SECRET);
        const userToken = await userSchema.findOne({ email: cookiesData.user });
        if (userToken.token != cookiesData.token) {
            return res.status(401).json({
                message: "Please signin your account",
                success: false,
                error: "Request unauthorized "
            });
        }
        req.user = {
            username: userToken.username,
            email: userToken.email,
            _id: userToken._id
        }
    }else{
        console.log("Cookies not present")
        return res.status(401).json({
            message: "Please signin your account",
            success: false,
            error: "Request unauthorized "
        }) 
    }
    next();
};
