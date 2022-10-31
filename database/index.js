const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.connect(
    "mongodb+srv://divyansh:div21902@cluster0.bfbrp.mongodb.net/test-assignment",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Database"));
};

module.exports = connectToDB;
