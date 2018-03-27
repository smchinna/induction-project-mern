
const mongoose=require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var url = 'mongodb://localhost:27017/local';
const secret_key='tudip_technology';

exports.signUpController=function(req,res){
    let data=req.body;
	mongoose.connect(url, {useMongoClient:true},(err,db)=>{
		if(err){
			res.send("error");
		}
		else{   
				db.collection("office_admin_management").findOne({"name":data.name},(err,user)=>{
					if(!user){
						db.collection('office_admin_management').insertOne({"name":data.name,"password":data.password,"email":data.email,"phone":data.phone})
						let detail={};
						detail.message="successfully detail inserted";
						detail.status=200;
						res.send(detail)
					}
					else{
						let detail={};
						detail.message="User name already exist";
						detail.status=401;
						res.send(detail)
					}
		    })
				
		}
	});
}
