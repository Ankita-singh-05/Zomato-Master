import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({

});

export const RestaurantModel = mongoose.model("Restaurants", RestaurantSchema);