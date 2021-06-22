const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  roll:
  {
     type:String,
     required:true,
     unique:true
  },
   firstname:
   {
      type:String,
      required:true
   },
   lastname:
   {
      type:String,
      required:true
   },
   password:
   {
      type:String,
      required:true
   },
   confirmpassword:
   {
      type:String,
      required:true
   },
   gender:
   {
      type:String,
      required:true
   }
});

const Register = new mongoose.model("Register",studentSchema);
module.exports = Register;
