const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const adminSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const admin = mongoose.model("codesForDatabase", adminSchema);
const studentSchema = mongoose.Schema({
  firstName: String,
  email: String,
  password: String,
  lastName: String,
  phone: String,
  file: String,
  date:String,
});
const student = mongoose.model("codesForStudents", studentSchema);
const AdminLoginModel = async (body) => {
  try {
    console.log("body===",body);
    if (body.email && body.password) {
      const findEMail = await admin.findOne({ email: body.email });
      const { name, email, password, _id } = findEMail;
      console.log("findEMail==",findEMail);
      if (!findEMail) {
        return { message: "email does not exist " };
      } else {
        if (body.password == password) {
          const token = jwt.sign(
            { user:_id },
            process.env.Secret_Key
          );

          const data = { name, email, token };
          console.log("token",data);
          return { data, message: "Admin login succes", status: 200 };
        } else {
          return { message: "password did not matches" };
        }
      }
    } else {
      return { message: "email and password both required" };
    }
  } catch (error) {
    return { error, message: "admin login failed", status: 400 };
  }
};
const StudentFormMOdel = async (body) => {
  try {
    const data = await student.create(body);
    console.log("data",data);
    return { data, message: "user added succesfully", status: 200 };
  } catch (error) {
    return { error, message: "user can't added", status: 400 };
  }
};
const studentLoginModel = async(body) => {
  try {console.log("body==",body);
    if (body.email && body.password) {
      const findEMail =await student.findOne({ email: body.email });
      const { firstName, lastName, email, password, _id, file } = findEMail;
      console.log("findEMail==",findEMail);
      if (!findEMail) {
        return { message: "email does not exist " };
      } else {
        if (body.password == password) {
          const token = jwt.sign(
            {
              name: firstName + " " + lastName,
              email: email,
              userId: _id,
              file,
            
            },
            process.env.Secret_Key
          );
          const data = { firstName, lastName, file, email, token };
          return { data, message: "student login succes", status: 200 };
        } else {
          return { message: "password did not matches" };
        }
      }
    } else {
      return { message: "email and password both required" };
    }
  } catch (error) {
    return { error, message: "student login failed", status: 400 };
  }
};
const selfiModel=async(body)=>{

try {

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
    function formatDate(date) {
        return [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('-');
      }

      const date1=formatDate(new Date())
      body.date=date1;
    const data=await student.create(body);
    return {data,message:"present",status:200} 
} catch (error) {
    console.log("error",error);
    return {error,message:"error", status:400}
}
}
const getStudentModel=async()=>{
    try {
        const data=await student.find();
        return {data,message:"getData",status:200}
    } catch (error) {
        return {error,message:" can't data get",status:400}
    }
}
 const getStudentDateModel=async(date)=>{
    try {
        const data=await student.find({date});
        const length=data.length();
        return {length,data,message:"getData",status:200}
    } catch (error) {
        return {error,message:" can't data get",status:400}
    }
}
module.exports = {getStudentModel, AdminLoginModel, StudentFormMOdel, studentLoginModel,selfiModel,getStudentDateModel };
