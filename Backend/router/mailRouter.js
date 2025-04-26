const express = require('express');
const mailRouter = express.Router();
const { isAuth } = require("../utils/isAuth");
const userSchema = require("../schema/user");
const { encrypt, decrypt } = require("../utils/encription");

mailRouter.post('/get-mails', isAuth, async (req, res) => {
  try {
    const user = await userSchema.findById(req.user._id).select("mails");

    return res.status(200).json({
      data: user.mails,
      message: "All mails",
      success: true
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to get messages",
      error: err.message,
      success: false
    });
  }
});

mailRouter.post('/add', isAuth, async (req, res) => {
  try {
    const { mail, password } = req.body;
    console.log(mail, password)
    if (!mail || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    }

    const user = await userSchema.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    // Check for duplicate email
    const duplicate = user.mails.some(m => m.email === mail);
    if (duplicate) {
      return res.status(409).json({
        message: "Duplicate Email",
        success: false
      });
    }

    console.log("h1");
    const hashedPassword = encrypt(password);
    console.log("h2");
    user.mails.push({ email: mail, password: hashedPassword });
    await user.save();
    console.log("h3");
    return res.status(200).json({
      message: "Mail added successfully",
      success: true,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
      success: false
    });
  }
}); 

mailRouter.post('/delete', isAuth, async (req, res) => {
  try {
    const { mail } = req.body;

    const user = await userSchema.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    const initialLength = user.mails.length;

    user.mails = user.mails.filter(m => m.email !== mail);
    if (user.mails.length === initialLength) {
      return res.status(404).json({
        message: "Email not found",
        success: false
      });
    }

    await user.save();

    return res.status(200).json({
      message: `${mail} deleted successfully`,
      success: true
    });

  } catch (err) {
    return res.status(500).json({
      message: "Unable to delete mail",
      error: err.message,
      success: false
    });
  }
});

module.exports = mailRouter;
