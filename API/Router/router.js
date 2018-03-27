
var express = require('express');

var router = express.Router();

var path=require('path');

var bodyParser = require('body-parser');

var showTicket=require('../Controller/showTicket.js')

var signUp=require('../Controller/signUp.js')

var signIn=require('../Controller/signIn.js')

var update=require('../Controller/update.js')

var upload=require('../Controller/upload.js')

router.use(bodyParser({limit: '50mb'}));

router.use(bodyParser.urlencoded({ extended: true, parameterLimit:500000}));


router.post('/signup', (req,res)=>{
    signUp.signUpController(req,res);
})
  
router.post('/signin', (req,res)=>{
signIn.signInController(req,res);
})

router.post('/upload',(req,res)=>{
upload.uploadController(req,res);
})

router.post('/update',(req,res)=>{
    update.updateController(req,res);
})

router.post('/showticket',(req,res)=>{
    showTicket.showTicketController(req,res);
})

module.exports = router;
