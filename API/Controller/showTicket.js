
const mongoose=require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var url = 'mongodb://localhost:27017/local';
const secret_key='tudip_technology';

exports.showTicketController=function(req,res){
    let data=req.body;
    let decoded = jwt.verify(data.token, secret_key);
    mongoose.connect(url,{useMongoClient:true},(err,db)=>{
        if(err){
            res.send("error in database");
        }
        else{
            db.collection("office_admin_management").findOne({"name":decoded},(err,user)=>{
                if(err||!user){
                    res.send("inavalid user")
                }
                else{
                    if(decoded==='Admin'){
                        let cursor=db.collection("tickets").find();
                        cursor.toArray((err,doc)=>{
                            res.send(doc);
                        })                        
                    }
                    else{
                            let cursor=db.collection("tickets").find({'name':decoded});
                            cursor.toArray((err,doc)=>{
                                res.send(doc);
                            })                        
                       
                    }
                }
            })
        }
    })
}
