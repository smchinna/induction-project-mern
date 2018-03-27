
const mongoose=require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var url = 'mongodb://localhost:27017/local';
const secret_key='tudip_technology';

function getdetails(data){
	var obj={};
	if(data.name!=undefined){
		obj.name=data.name;
	}	
	if(data.image!=undefined){
		obj.image=data.image;
	}
	if(data.description!=undefined){
		obj.description=data.description;
	}
	if(data.status!=undefined){
		obj.status=data.status;
	}
	if(data.header!=undefined){
		obj.header=data.header;
	}
	return obj;
}

exports.updateController=function(req,res){
    var data=req.body;
    let id={"_id":ObjectId(data._id)};
    let newValue=getdetails(data);
    mongoose.connect(url,{useMongoClient:true},(err,db)=>{
        if(err){
            res.send("error");
        }
        else{	
            db.collection("tickets").updateOne(id,{$set:newValue},(err,doc)=>{
                if(err){
                    res.send("cannot update");
                }
                else{
                    res.send("updated");
                }
            })
        }
    })
}
