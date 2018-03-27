
const mongoose=require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var url = 'mongodb://localhost:27017/local';
const secret_key='tudip_technology';

exports.signInController=function(req,res){
    var data=req.body;
	mongoose.connect(url,{useMongoClient:true},(err,db)=>{
			if(err){
				res.send("error");
			}
			else{
				db.collection("office_admin_management").findOne({"name":data.name},(err,user)=>{
 				if(err||!user){
					let result={};
					result.status=401;
					result.message="your username is incorrect";
					res.send(result);
 				}
 				else{
 					if(data.password===user.password){
						const token=jwt.sign(data.name,secret_key)				   
						let result={};
						result.status=200;
						result.token=token;
						result.name=data.name;
						result.message="successfull"
 						res.send(result)
	 				}
	 				else{
						let result={};
						result.status=401;
						result.message="password is incorrecct";
	 					res.send(result);
	 				}
 				}
 			})
		}
	})
}
