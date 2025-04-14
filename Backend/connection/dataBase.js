const mongoose = require('mongoose');

module.exports = async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("DB Connected Successfully");
};
