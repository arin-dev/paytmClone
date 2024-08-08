const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({});


const mongoose = require("mongoose");
const express = require("express");

const app = express();

// Connect to MongoDB
MONGO_URL =  process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Define a schema
const userSchema = new mongoose.Schema({
  username: String,
//   email: String,
  password: String,
  fistName: String,
  lastName: String
});

// Create a model
const User = mongoose.model("User", userSchema);

// ... existing code ...
module.exports = {
    User
}

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });