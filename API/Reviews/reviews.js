import express from "express";

import { ReviewsModel } from "../../Database/allModels";

const Router = express.Router();

/* 
Route     /new
Des       get new review
Params    None
Access    Public
Method    POST
*/

Router.post("/new", async (req, res) => {
    try {
        const { reviewData } = req.body;
        await ReviewsModel.create(reviewData);

        return res.json({review: "Successfully created review"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/* 
Route     /delete
Des       Delete a review
Params    _id
Access    Public
Method    DELETE
*/

Router.delete("/delete/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        await ReviewsModel.findByIdAndDelete(_id);

        return res.json({review: "Successfully Deleted review"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;