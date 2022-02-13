// Importing mongoose, a programming library that creates a connection between MongoDB and the Express web application framework.
const mongoose = require("mongoose");
// Importing dotenv, which allows us to create a .env file for environment variable such as passwords and database name
// .env can be hidden and added to gitignore to not allow the code to be pushed on github
const dotenv = require("dotenv");
dotenv.config();

// Connecting to the database
const connectDB = async () => {
  const PASSWORD = process.env.PASSWORD;
  const DATABASE_NAME = process.env.DATABASE_NAME;
  const conn = await mongoose.connect(
    `mongodb+srv://admin:${PASSWORD}@coded.xpn8k.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  console.log(`mongo connected: ${conn.connection.host}`);
};

// Exporting for use in app.js
module.exports = connectDB;
