import { create, changePassword } from "../Controller/userControll.js";
import express from "express";

const route = express();

route.post("/insert",create);
route.put("/updatePass",changePassword);

export default route;