import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./Route/userRoute.js"
import { url } from "inspector"
import { error } from "console"
const app = express();

app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;

mongoose.connect(URL).then((req,res)=>{
    app.listen(PORT)
    console.log("database connected successfully");
}).catch((error)=>{
    console.log(error);
});

app.use("/api", route);

