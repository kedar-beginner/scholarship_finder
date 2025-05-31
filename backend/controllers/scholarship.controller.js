import { Scholarship } from "../models/scholarship.model.js";

export const postscholarship =async (req,res)=>{
    try {
        const {title,description ,special_cat,amount,location,s_Type,grants,gpa,course, deadline,apply_link,companyId} =req.body;
        const userId =req.id;
        if(!title || !description || !special_cat || !amount || !location || !s_Type || !grants|| !gpa|| !course ||!deadline|| !apply_link || !companyId){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        }
        const scholarship= await Scholarship.create({
            title,
            description,
            special_cat:special_cat.split(","),
            amount:Number(amount),
            location,
            s_Type, 
            grants,
            gpa,
            course:course.split(","),
            deadline,
            apply_link,
            company:companyId,
            created_by:userId
        });
        return res.status(201).json({
            message:"new scholarship created",
            scholarship,
            success:true
        });
    } catch (error) {
         console.log(error);
    }
}

export const getAllscholarships =async (req,res)=>{
    try{
        const keyword=req.query.keyword ||"";
     
        const query ={
            $or:[
                {title:{$regex:keyword,$options:"i"}},  // here i is use so that it become case sensetive
                {description:{$regex:keyword,$options:"i"}},
                { course: { $elemMatch: { $regex: keyword, $options: "i" } } },
                { course: { $elemMatch: { $regex: "All courses", $options: "i" } } }
            ]
        };
      const scholarships =await Scholarship.find(query).populate({
        path:"company"
      }).sort({createdAt:-1});
      if(!scholarships){
        return res.status(400).json({
            message:"scholarship not found",
            success:false
        });
      }
      return res.status(201).json({ 
        scholarships,
        success:true
    });
    }catch(error){
        console.log(error);
    }
}

export const getscholarshipById =async(req,res)=>{
    try {
        const scholarshipId =req.params.id;
        const scholarship =await Scholarship.findById(scholarshipId).populate({
            path:"applications"
        });
        if(!scholarship){
            return res.status(400).json({
                message:"scholarship not found",
                success:false
            });
        }
        return res.status(201).json({ 
            scholarship,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}


export const getAdminscholarships =async(req,res)=>{
    try {
       const adminId=req.id;
       const scholarships =await Scholarship.find({created_by:adminId}).populate({
          path:'company',
          createdAt:-1
       });  
       if(!scholarships){
        return res.status(400).json({
            message:"scholarship not found",
            success:false
        });
       }
       return res.status(201).json({ 
        scholarships,
        success:true
       });
    } catch (error) {
        console.log(error);
    }
}