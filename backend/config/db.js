import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/projectmaker");

const db = mongoose.connection;

db.once("open", () => {
  console.log("server connect sucssesfuly");
});

export default db;