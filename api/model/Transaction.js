import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  // your schema fields here
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  dateTime: { type: Date, required: true },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);

// export default Transaction; // Use default export
