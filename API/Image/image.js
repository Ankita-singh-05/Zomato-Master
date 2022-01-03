import express from "express";
import AWS from "aws-sdk";
import multer from "multer"; 

import { ImageModel } from "../../Database/allModels";

import { s3Upload } from "../../Utils/AWS/S3";

const Router = express.Router();

//Multer CONFIG
const storage = multer.memoryStorage();
const upload = multer({storage});

/* 
Route      /
Des        Uploading the given image to AWS S3 Bucket and then saving the file to mongoDB
Params     None
Access     Public
Method     POST
*/

Router.post("/", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        const bucketOptions = {
            Bucket: "shapeaifullstack123",
            Key: file.originalname,  // from multer
            Body: file.buffer,    //from multer
            ContentType: file.mimetype,  // mimetype -- it is the file type like .img, .png, .svg
            ACL: "public-read"
        };

        const uploadImage = await s3Upload(bucketOptions);
        return res.status(200).json({uploadImage});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;