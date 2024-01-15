const { AdminLoginModel, StudentFormMOdel, studentLoginModel } = require("../model/model");

const  AdminLoginControlle=async(req,res)=>{
const data=await AdminLoginModel(req.body);
res.send(data);
}
const studentFormController=async(req,res)=>{
    const file=req?.file?.path;
    const bodyData={...req.body,file}
const data=await StudentFormMOdel(bodyData);
res.send(data)
}
const studentLoginController=async(req,res)=>{
const data=await studentLoginModel(req.body);
console.log("data=m=",data);
res.send(data)
}
module.exports={AdminLoginControlle,studentFormController,studentLoginController}