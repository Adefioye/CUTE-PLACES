import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from "./routes/postRoutes.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const DB_URL =
  "mongodb+srv://koko_memories:idSLYsFXp36dBAGv@cluster0.3dece.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// db pwd: idSLYsFXp36dBAGv
// db username: koko_memories
const PORT = process.env.PORT || 5000;

// SET UP DATABASE CONNECTION
async function main() {
  await mongoose.connect(DB_URL);
}

try {
  main();
  console.log("Database is connected");
} catch (error) {
  console.log("Error connecting to the database");
  console.log(error.message);
}

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
