import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import placeRoutes from "./routes/placeRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

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

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/places", placeRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static("app/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "app", "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

// Working on fixing connectionto database
