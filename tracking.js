const express = require('express');
const bodyParser = require('body-parser');
let router = express.Router();

let model = require('./db');
let t = model.getModel('t');

router.get('/',bodyParser(),(req,res)=>{
//		console.log(req.query.a)
		t.remove({},(err,data)=>{})
		let y = [];
		y = [
				{
					"idd":"400500600700",
					"conten":[
								{
									"city":"【上海市】",
									"name":"已揽件"
								},
								{
									"city":"【上海市】",
									"name":"发往广州航站"
								},
								{
									"city":"【上海市】",
									"name":"抵达广州航站"
								},
								{
									"city":"【上海市】",
									"name":"已签收"
								}
							]
				}
			];
		t.create(y,(err,data)=>{
			t.find({idd:req.query.a},(err,data)=>{
				if (err) {
					console.log(err);
					return
				}
				res.json(data)
			})
		})
		
		
})


module.exports={
    router
}
