
const mongoose=require('mongoose');
var jwt = require('jsonwebtoken');
var url = 'mongodb://localhost:27017/local';
const secret_key='tudip_technology';

exports.uploadController=function(req,res){
    let data=req.body;
    let decode = jwt.verify(data.token, secret_key);
    mongoose.connect(url,{useMongoClient:true},(err,db)=>{
        if(err){
            res.send("error in ticket");
        }
        else{
            db.collection('tickets').insertOne({"name":decode,"image":data.image,"header":data.header,"description":data.description,"status":data.status})	
            res.send("ticket created");
        }
    })
}

