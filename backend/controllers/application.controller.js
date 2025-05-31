import { application } from "express";
import { Application } from "../models/application.model.js";
import { Scholarship } from "../models/scholarship.model.js";
export const applyscholarship =async (req,res)=>{
    try {
        const userId=req.id;
        const scholarshipId = req.params.id;
        if(!scholarshipId){
            return res.status(400).json({
                message:"scholarship id is required.",
                success:false
            });
        }
        //check if the user has alredy applied for the scholarship
        const existingApplication =await Application.findOne({scholarship:scholarshipId,applicant:userId});
       if(existingApplication){
        return res.status(400).json({
            message:"You have already applied for this scholarship.",
            success:false
        });
       }
       const scholarship =await Scholarship.findById(scholarshipId);
      if(!scholarship){
        return res.status(400).json({
            message:"scholarship not found",
            success:false
        }); 
      } 

      const newApplication = await Application.create({
        scholarship: scholarshipId,
        applicant: userId
      });
 
    scholarship.applications.push(newApplication._id);
    await scholarship.save(); 

      return res.status(201).json({
        message:"scholarship applied succefully.",
        success:true
      });


    } catch (error) {
        console.log(error);
    }
};

export const getAppliedscholarships =async(req,res)=>{
    try {
        const userId =req.id;
        const application =await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'scholarship',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}}
            }
        });

        if(!application){
            return res.status(400).json({
                message:"no application",
                success:false
            }); 
        }
        return res.status(201).json({
            application,
            success:true
          });
    } catch (error) {
        console.log(error);
    }
};

//for admin to checj=k how many studests are applied for the scholarship
export const getApplicants = async(req,res)=>{
    try {
        const scholarshipId =req.params.id;
        const scholarship =await scholarship.findById(scholarshipId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!scholarship){
            return res.status(400).json({
                message:"scholarship not found",
                success:false
            }); 
        }
        return res.status(200).json({
            scholarship,
            success:true
        });

    } catch (error) {
        console.log(error);
    }
};

