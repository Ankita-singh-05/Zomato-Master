import express from "express";
import bcrypt from "bcryptjs";

//Models
import { UserModel } from "../../Database/user/user";

const Router = express.Router();

/*
        Route   /signup
        Des     Signup using email and password
        Params  None
        Access  Public
        Method  POST
*/

Router.post("/signup", async (req, res) => {
    try {
        const {email, password, fullName, phoneNumber} = req.body.credentials;

        const checkUserByEmail = await UserModel.findOne({email});
        const checkUserByPhone = await UserModel.findOne({phoneNumber});

        // to check whether the email & phone no. is registered before or not
        if(checkUserByEmail || checkUserByPhone){
            return res.json({error: "User Already Exists!!!"});
        }

        // hashing the password
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt)

        // save to DB
        await UserModel.create({
            ...req.body.credentials,
            password : hashedPassword
        });

        // JWT Token
        const token = jwt.sign({user: {fullName, email}}, "ZomatoApp");

        // Status code 200 -- The HTTP 200 OK success status response code indicates that the request has succeeded.
        return res.status(200).json({token, status: "Success"});

    } catch (error) {
        // Status code 500 -- HyperText Transfer Protocol (HTTP) 500 Internal Server Error server error response code
        return res.status(500).json({error: console(error.message)})
    }
});

// This conversion of password in different code is called salting
// xyz333- hgfrhj#$%5 - jhf2345&*89 - jfhj - jhr... 
// xyz333- hgfrhj#$%5 ----> 1 salt
// xyz333- hgfrhj#$%5 - jhf2345&*89 ---> 2 salt

