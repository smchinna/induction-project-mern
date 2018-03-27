const express = require('express')
const app = express();
const mongoose=require('mongoose');
var router=require("./Router/router.js")
var url = 'mongodb://localhost:27017/local';


function tickets_collection_creation(){
	mongoose.connect(url,{useMongoClient:true},(err,db)=>{
	if(err){
		console.log("database is not ");
	}
	else{		
		db.collection("tickets").findOne({"name":"Admin"},(err,user)=>{
			if(!user){
    			db.collection('tickets').insertOne({"name":"Admin","image":"","header":"welcome","description":"started","status":true})
				console.log("tickets collection created")
			}
			else{
				console.log("Already have a tickets collection")

			}
		})
	}
})
}
function user_collection_creation(){
	
	mongoose.connect(url,{useMongoClient:true},(err,db)=>{
	if(err){
		console.log("database is not required");
	}
	else{		
		db.collection("office_admin_management").findOne({"name":"Admin"},(err,user)=>{
			if(!user){
    			db.collection('office_admin_management').insertOne({"name":"Admin","password":"tudip123","email":"admin@tudip.com","phone":12345})
    			console.log("office_admin collection created")
			}
			else{
				console.log("Already have a office_admin collection")
			}
		})
	}
})
}
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
app.use("/",router);

app.listen(3030,()=>{
user_collection_creation();
tickets_collection_creation();
})
