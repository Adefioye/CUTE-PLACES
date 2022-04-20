import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRoutes from "./routes/postRoutes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;

// SET UP DATABASE CONNECTION
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
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
