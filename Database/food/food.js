import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    descript: {type: String, required: true},
    isVeg: {type: Boolean, required: true},
    isContainsEgg: {type: Boolean, required: true},
    category: {type: String, required: true},
    photos: {
        type: mongoose.Types.ObjectId,
        ref: "Images"
    },
    price: {type: Number, default: 150, required: true},
    addOns: [
        {
            // 11.30
        }
    ]
});

export const FoodModel = mongoose.model("Foods", FoodSchema);