import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"; 
import connectDB from "./utils/db.js"
import dotenv from "dotenv"; 
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/comapny.route.js"
import scholarshipRoute from "./routes/scholarship.route.js"
import applicationRoute  from "./routes/application.route.js";
import path from "path";
dotenv.config({});
const app=express();

const _dirname= path.resolve();
  
//middleware
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

const corOption ={
      origin:"https://scholarship-finder-1-71rx.onrender.com",
      credentials:true
}
app.use(cors(corOption));

const PORT=process.env.PORT || 3000;

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/scholarship",scholarshipRoute);
app.use("/api/v1/application",applicationRoute);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});

app.listen(PORT,()=>{
    connectDB();
    console.log(`sever is running at ${PORT}`);
    
})