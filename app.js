const express = require("express");
const cors = require("cors");
const connectToDB = require("./database/index");

const Alphabets = require("./models/alphabet");
const Operators = require("./models/operator");

const app = express();
app.use(cors());
app.use(express.json());

// app.get("/", async (req, res) => {
//   try {
//     //add alphabets and operators to database
//     await Alphabets.insertMany([
//         { value: "A", numericalValue: 1 },
//         { value: "B", numericalValue: 2 },
//         { value: "C", numericalValue: 3 },
//         { value: "D", numericalValue: 4 },
//         { value: "E", numericalValue: 5 },
//         { value: "F", numericalValue: 6 },
//         { value: "G", numericalValue: 7 },
//         { value: "H", numericalValue: 8 },
//         { value: "I", numericalValue: 9 },
//         { value: "J", numericalValue: 10 },
//     ]);

//     await Operators.insertMany([
//         { value: "+" },
//         { value: "-" },
//         { value: "*" },
//         { value: "/" },
//     ]);

//     res.send("Alphabets and Operators added to database");

//   } catch (err) {
//     console.log(err);
//   }
// });

app.get("/content", async (req, res) => {
  try {
    let alphabets = await Alphabets.find({}, {_id: 0, __v: 0});
    let operators = await Operators.find({}, {_id: 0, __v: 0});

    res.json({
      alphabets,
      operators,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

async function startServer() {
  await connectToDB();
  app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
}

startServer();
