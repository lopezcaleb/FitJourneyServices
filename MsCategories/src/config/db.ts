const mongoose = require("mongoose");

const string_connection_bd = process.env.DATA_BASE_STRING;

export const connectToDatabase = async() => {
  try {
    await mongoose.connect(string_connection_bd);
    console.log("Connection to the database established correctly.");
  } catch (error) {
    console.error("Error to connect the database:", error);
    throw new Error("Error to connect the database!");
  }
}
