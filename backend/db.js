const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({});


const mongoose = require("mongoose");
const express = require("express");

const app = express();

// Connect to MongoDB
const MONGO_URL =  process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Define a schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  // email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

// Create a model
const User = mongoose.model("User", userSchema);

const userAccountSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'User',
      required: true
  },
  balance: {
      type: Number,
      required: true
  }
});

const userAccount = mongoose.model('Account', userAccountSchema);


module.exports = {
  User,
  userAccount,
}

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });