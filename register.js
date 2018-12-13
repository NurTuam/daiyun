const express = require('express');
const bodyParser = require('body-parser');


let router = express.Router();
let model = require('./db');
let userInfo = model.getModel('userInfo');


//userInfo.remove({},(err,data)=>{
//		
//	})
router.post('/register',bodyParser(),(req,res)=>{
	
    let {username,password,email}= req.body;
    userInfo.find({email},(err,data)=>{
        	if(err){
	            console.log(err);
	            res.json({code:0,msg:"服务器跑丢了，请稍后重试"});
	            return;
	        }
	        if(!data.length){
	            userInfo.create({username:username,password:password,email:email},(err,data)=>{
    			})
	            res.json({code:1,msg:"注册成功"});
	            return;
	        }
	        res.json({code:2,msg:"您的邮箱已被注册,请更换邮箱或者点击找回账号密码"});
   		}) 
    
    
});





module.exports={
    router
}