const jwt = require('jsonwebtoken');
const userSchema = require('../schema/user');
const user = require('../schema/user');

exports.isAuth = async (req, res, next) => {
    console.log(req.cookies);
    const cookiesData = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const userToken = await userSchema.findOne({email: cookiesData.user});
    console.log(userToken)
    console.log(cookiesData)
    if(userToken.token != cookiesData.token) {
        return res.redirect(process.env.FRONTEND_ADDRESS+"/auth/signin.html");
    }
    console.log(cookiesData);
    console.log("isAuth");
    next();
};
