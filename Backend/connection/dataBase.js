const mongoose = require('mongoose');

module.exports = async ()=>{
   await mongoose.connect(process.env.DB_URL+"/fluxmailer");
   console.log("DB Connected Successfully");
}