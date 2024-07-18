import exp from "constants";
import mongoose from "mongoose";
import { type } from "os";
import bcrypt from "bcrypt"

const schema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
});

schema.pre('updateOne',async function(next){
    try {
        
        const user = this;

        if(!user.isModified('password')){
            next();
        }

        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password;
        next(); 
    } catch (error) {
          console.log(error);
    }
});


schema.pre('save',async function(next){
    try {
        
        const user = this;

        if(!user.isModified('password')){
            next();
        }

        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password;
        next(); 
    } catch (error) {
          console.log(error);
    }
})




export default mongoose.model("NodeRevise",schema);