const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/details",{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
}).then(function(){
  console.log('connection successful.');
}).catch(function(err){
  console.log('No connection.');
})
