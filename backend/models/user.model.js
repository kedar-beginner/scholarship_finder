import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
       fullname:{
        type:String,
        required:true, 
       },
        email:{
        type:String,
        required:true,
        unique:true
       },
        phoneNumber:{
        type:Number,
        required:true, 
       },
        password:{
        type:String,
        required:true, 
       },
        role:{
        type:String,
        enum:['student','donar'],
        required:true, 
       }, 
       GPA:{
        type:Number, 
        min: 0,
        max: 10, 
        default:10,
       },
       course:{
        type:String,
        default:"B.tech",
       },
       location:{
        type:String,
        required:true, 
       },
       special_c: {
        type: [String],
        default: ["general"],
       },
       family_i:{
        type:Number, 
        default:300000, 
       }
       ,
        profile:{ 
          bio:{type:String},   
          profilePhoto:{
             type:String,
             default:"" 
          }
       },
},{timestamps:true});

export const User=mongoose.model('User',userSchema);