import express from "express";
import AWS from "aws-sdk";

import { ImageModel } from "../../Database/allModels";

const Router = express.Router();

/* 
Route      /
Des        Uploading the given image to AWS S3 Bucket and then saving the file to mongoDB
Params     None
Access     Public
Method     POST
*/

Router.post