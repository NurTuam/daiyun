const express = require('express');
const bodyParser = require('body-parser');


let router = express.Router();
let model = require('./db');
let userInfo = model.getModel('userInfo');


router.post('/login',bodyParser(),(req,res)=>{
	
    let {username,password}= req.body;
    userInfo.find({username,password},(err,data)=>{
        	if(err){
	            console.log(err);
	            res.json({code:0,msg:"后台出错了"});
	            return;
	        }
	        if(!data.length){
	            res.json({code:0,msg:"用户名或者密码错误"});
	            return;
	        }
	        res.json({code:1,msg:"登录成功"})
   		}) 
    
    
});




module.exports={
    router
}