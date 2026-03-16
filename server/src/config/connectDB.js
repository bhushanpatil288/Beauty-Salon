const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI

const connectDB = async () =>{
  try{
    await mongoose.connect(DB_URI)
    console.log("Connected to Database successfully");
  }catch(e){
    console.log("Error occured during connecting to database")
    console.log(e.message);
  }
}

module.exports = connectDB;