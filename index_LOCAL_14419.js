const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./controller/userRoute");
const app = express();
const ml = require("./controller/ml");
mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://manyrishabh:hack123@cluster0.r8nobs1.mongodb.net/");
var db = mongoose.connection;
db.on("open",()=>console.log("Connected to DB"));
db.on("error",()=>console.log("Error occurred"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/auth", userRoute);
app.use("/ml",ml);

app.listen(4000,()=>{
    console.log("Server connected at 4000");
})
