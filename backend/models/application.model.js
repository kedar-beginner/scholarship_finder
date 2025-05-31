import mongoose from "mongoose";

const applicationSchema =new mongoose.Schema({
      scholarship:{
        type:mongoose.Types.ObjectId,
        ref:'Scholarship',
        required:true
      },
      applicant:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
      },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{timestamps:true});
export const Application =mongoose.model("Application",applicationSchema);