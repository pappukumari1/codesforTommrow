const express=require("express");
const { AdminLoginControlle, studentFormController, studentLoginController } = require("../Controller/Controller");
const { upload } = require("../midle/midleware");
const route=express.Router();
route.use("/fileData",express.static("file"))
route.post("/post",AdminLoginControlle);
route.post("/studentForm",upload.single("file"),studentFormController)
route.post("/studentLogin",studentLoginController)
module.exports=route;