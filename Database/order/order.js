import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

});

export const OrderModel = mongoose.model("Order", OrderSchema);