import {Company} from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany =async(req,res)=>{
    try {
        const {companyName} =req.body;
        if(!companyName){
            return res.status(400).json({
                message:"company name is required",
                success:false
            }); 
        }
        let company =await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"You can't register same company",
                success:false
            });
        }
        company=   await Company.create({
            name:companyName,
            userId:req.id
        });
        return res.status(201).json({
            message:"company register successful",
            company,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getCompany =async (req,res) =>{
    try {
        const userId= req.id;
        const companies= await Company.find({userId});
        if(!companies){
            return res.status(400).json({
                message:"Companies not found",
                success:false
            });
        }
        return res.status(201).json({
            message:"companies found",
            companies,
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}

import mongoose from "mongoose";

export const getCompanyById = async (req, res) => {
    try {
        const  id  = req.params.id;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Company ID",
                success: false
            });
        }

        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({ 
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: "Server error",
            success: false
        });
    }
};

export const updateCompany =async(req,res)=>{
    try {
        const {name}=req.body;
        const file =req.file; 
        let cloudResponse=0;
        let logo="";
            if(file){
                const fileUri =getDataUri(file);
                cloudResponse =await cloudinary.uploader.upload(fileUri.content);
                logo = cloudResponse.secure_url; 
            }
            if(!file){
                 return res.status(400).json({
                message:"logo is required",
                success:false
            }); 
            }
        const updateData ={name,logo}; 
        const company= await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
       
        if(!company){
            return res.status(400).json({
                message:"Companies not found",
                success:false
            }); 
        }
        return res.status(201).json({ 
            message:"comapany data updated succefully",
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}