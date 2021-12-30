import express from "express";
//Models
import { FoodModel } from "../../Database/allModels";

const Router = express.Router();

/* 
Route     /
Des       get all the foods based on particular restaurant
Params    _id
Access    Public
Method    GET
*/

Router.get("/:_id", async (req, res) => {
    try {
        const {_id} = req.params;
        const foods = await FoodModel.find({restaurant: _id});
        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/* 
Route     /r
Des       get all the foods based on particular category
Params    category
Access    Public
Method    GET
*/

Router.get("/r/:category", async (req, res) => {
    try {
        // const myCategory = req.params.category --> if we do not destructured it
        const { category } = req.params;
        const foods = await FoodModel.find({
            category: {$regex: category, $options: "i"} //i stands for case insensitive 
        });
        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;