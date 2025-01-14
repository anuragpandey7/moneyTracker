import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
 
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  dateTime: { type: Date, required: true },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);


