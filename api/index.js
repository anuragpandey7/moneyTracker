import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { Transaction } from "./model/Transaction.js";

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json("Test OKse");
});

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1);
//   }
// };

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, description, dateTime, price } = req.body;

  const transaction = await Transaction.create({
    name,
    description,
    dateTime,
    price,
  });

  res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(8000, () => {
  console.log("app is running on port 8000");
});
