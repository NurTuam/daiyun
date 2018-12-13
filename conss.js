const express = require('express');
const bodyParser = require('body-parser');


let router = express.Router();
let model = require('./db');
let cons = model.getModel('cons');


router.post('/conss',bodyParser(),(req,res)=>{
	console.log(req.body)
    let {name,email,conss}= req.body;
    cons.create({name:name,email:email,conss:conss},(err,data)=>{
        	if(err){
	            console.log(err);
	            res.json({code:0,msg:"后台出错了"});
	            return;
	        }else{
	        	res.json({code:1,msg:"提交成功！我们会尽快联系您"})
	        }
	        
   		}) 
    
    
});

module.exports={
    router
}