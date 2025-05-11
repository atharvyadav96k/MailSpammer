const nodemailer = require('nodemailer');

async function sendMail({ mail, password, to, subject, code }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: mail,
      pass: password,
    },
  });

  const mailOptions = {
    from: mail,
    to,
    subject,
    html: `<h2>${code}</h2>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

// Call the function
module.exports = sendMail;
