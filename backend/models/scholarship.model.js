import mongoose from "mongoose"; 

const scholarshipSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
    },
     special_cat:[
      { type: String }
     ],
    amount:{
        type:Number,
        required:true
    }, 
     location:{
       type:String,  
     },
      s_Type:{
        type:String, 
        required:true
      },
       grants:{
        type:Number , 
        required:true
      },
       gpa:{
        type:Number , 
        required:true
      },
        course:[
      { type: String }
     ],
        deadline:{
        type:Date , 
        required:true
      },
      apply_link:{
        type:String, 
        required:true
      },
       company:{
        type:mongoose.Schema.Types.ObjectId, 
         ref:'Company',
         required:true
      },
      created_by:{
         type:mongoose.Schema.Types.ObjectId, 
         ref:'User', 
      },
      applications:[
        {
            type:mongoose.Schema.Types.ObjectId, 
            ref:'Application'   
        }
      ]
},{timestamps:true});

export const Scholarship =mongoose.model("Scholarship",scholarshipSchema);