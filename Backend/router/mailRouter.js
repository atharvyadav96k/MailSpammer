const express = require('express');
const mailRouter = express.Router();
const { isAuth } = require("../utils/isAuth");
const userSchema = require("../schema/user");
const { encrypt, decrypt } = require("../utils/encription");
const formSchema = require('../schema/forms');
const sendMail = require('../utils/sendMail');
const forms = require('../schema/forms');

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

mailRouter.post('/send-mail', isAuth, async (req, res) => {
  let { subject, to, templateId } = req.body;
  console.log(to, subject, templateId)
  if (!to || !templateId) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const userId = req.user._id;

    const user = await userSchema.findById(userId).select("mails");
    if (!user || !user.mails || user.mails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Please add your email first",
      });
    }

    // Load the template
    const template = await formSchema.findById(templateId);
    if (!template || !template.data) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    console.log("users: " + user.mails)
    const decryptedPass = decrypt(user.mails[0].password); // assuming decrypt function is defined
    const htmlCode = JSON.parse(template.data).code; // assuming template.data is HTML content
    console.log(htmlCode)
    // Send the email
    await sendMail({
      mail: user.mails[0].email,
      password: decryptedPass,
      to,
      subject: subject || "",
      code: htmlCode,
    });

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
});


module.exports = mailRouter;
