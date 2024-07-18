import User from "../Modell/userModell.js"
import {gentrateToken} from "../JwtToken/jwt.js"
import exp from "constants";
import bcrypt from "bcrypt"

export const create = async(req,res)=>{

    try {
        const {email, password} = req.body;

        const userExsist = await User.findOne({email});
        if(userExsist){
            return res.status(500).json({message:"user is already send"});
        }
        const token = gentrateToken(password);
        const user = new User(req.body);
        const save = await user.save();
    
        return res.status(200).json({token, save});
    } catch (error) {
        console.log(error)
         return res.status(500).json({message:error}); 
    }
}

export const changePassword = async(req,res)=>{
     try {
        
        const {password, newPassword, confirmPassword,email} = req.body;
        //const id = req.params.id;

        if(newPassword!=confirmPassword){
            return res.send("Password is not match");
        }

        const user = await User.findOne({email});
        if(!user){
            return res.send("user is not found");
        }
        const fillter = {email:email};
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword,salt);
       const set = {$set:{password:hash}};

       const update = await User.updateOne(fillter, set);
    //    update.save();

       return res.status(200).send("user password is changed successfully");


     } catch (error) {
        console.log(error);
     }
}