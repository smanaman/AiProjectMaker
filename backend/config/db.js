import mongoose from "mongoose";

mongoose.connect("mongodb+srv://sanvatsman_db_user:6X0rikFfjvWN0PWg@aiprojectmaker.ynfinkv.mongodb.net/aiprojetmaker?appName=AIprojectmaker");

const db = mongoose.connection;

db.once("open", () => {
  console.log("server connect sucssesfuly");
});

export default db;