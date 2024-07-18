import jwt from "jsonwebtoken";

 export const gentrateToken = (payload)=>{

    return jwt.sign(payload, process.env.SCREATKey);
}