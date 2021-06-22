const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

require("./db/conn");
const Register = require("./models/registers");

const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(__dirname + '/images'));
app.use(express.static(path.join(__dirname,'../public/css')));

app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",function(req,res){
  res.render("index");
});

app.get("/index",function(req,res){
  res.render("index");
});

app.get("/register",function(req,res){
  res.render("register");
});
 
app.get("/login",function(req,res){
  res.render("login");
});

app.get("/loginsuccess",function(req,res){
  res.render("loginsuccess");
});

app.get("/loginfail",function(req,res){
  res.render("loginfail");
});

app.get("/signups",function(req,res){
  res.render("signups");
});

app.get("/signupf",function(req,res){
  res.render("signupf");
});

app.get("/contact",function(req,res){
  res.render("contact");
});

app.get("/signuproll",function(req,res){
  res.render("signuproll");
});

app.post("/register",async function(req,res){
  try
  {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if(password === cpassword)
      {
        const r = new Register({
          roll: req.body.roll,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: password,
          confirmpassword: cpassword,
          gender:req.body.gender
        });
        const registered = await r.save();
        res.status(201).redirect("signups");
      }
    else
    {
    res.redirect("signupf");
    }
  }
  catch(error)
  {
    res.redirect("signuproll");
  }
});

app.post("/login",async function(req,res){
  try
  {
    const roll = req.body.roll;
    const password = req.body.password;
    const userroll = await Register.findOne({roll:roll});
    if(userroll.password === password)
    {
      res.status(201).redirect("loginsuccess");
    }
    else
    {
    res.redirect("loginfail");
    }
  }
  catch(error)
  {
    res.status(400).send("Invalid Roll Number");
  }
});

app.listen(3000);
