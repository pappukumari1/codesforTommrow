const express=require("express");
const mongooose=require("mongoose")
const cors=require("cors");
const route = require("./APIS/Routes/routes");
require("dotenv").config();
const app=express();
mongooose.connect(process.env.DB_URL)
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/api",route);
app.listen(process.env.PORT,()=>{
    console.log(`server start at port ${process.env.PORT}`);
})