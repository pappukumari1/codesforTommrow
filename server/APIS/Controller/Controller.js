const { AdminLoginModel, StudentFormMOdel, studentLoginModel, getStudentModel, getStudentDateModel, selfiModel } = require("../model/model");

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
const postSelfiController=async(req,res)=>{
    const file=req?.file?.path;
    const bodyData={...req.body,file}
    console.log("body data",bodyData);
const data=await selfiModel(bodyData);
res.send(data);
}
const studentGetController=async(req,res)=>{
  const date=  req?.query?.date;
const data= date?await getStudentDateModel(date): await getStudentModel()
res.send(data);
}
module.exports={studentGetController, AdminLoginControlle,studentFormController,studentLoginController,postSelfiController}