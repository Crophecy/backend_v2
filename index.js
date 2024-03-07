const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./controller/userRoute");
const app = express();
const nodemailer = require('nodemailer');

mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://manyrishabh:hack123@cluster0.r8nobs1.mongodb.net/");
var db = mongoose.connection;
db.on("open",()=>console.log("Connected to DB"));
db.on("error",()=>console.log("Error occurred"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/auth", userRoute);
app.post('/contact', async (req, res) => {
    let { name, email,contactNumber, query } = req.body;
  
    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7bc7663e0c74dc",
        pass: "ff961f48ffd607"
      }
    });
  
    let mailOptions = {
      from: 'abhi021102@gmail.com',
      to: 'abhi021102@gmail.com',
      subject: `Message from ${name}`,
      text: `From: ${email}\n\n${query}\n\n ${contactNumber}`
    };
  
    try {
      await transport.sendMail(mailOptions);
      res.status(200).send('Email sent');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    }
  });
  

app.listen(4000,()=>{
    console.log("Server connected at 4000");
})
