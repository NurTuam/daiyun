const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let model = require('./db');
let g = model.getModel('g');
let router = express.Router();

router.get('/',bodyParser(),(req,res)=>{
//	console.log(req.query)
//  console.log(req.body);
//	let data = JSON.parse(fs.readFileSync('./geoZone.json').toString());
//	console.log(data)
//	console.log(req.query.geo_zone_id)
		let ar = [];
		ar = [
			{"delivery_methods":"空运",
		"contruc":[
					{
						"jiaqian":"1.0",
					"title":"Poslaju 普通货 (西马)"
					},
					{
						"jiaqian":"1.1",
					"title":"Poslaju 敏感货 (西马)"
					},
					{
						"jiaqian":"1.2",
					"title":"DHL 普通货 (西马)"
					},
					{
						"jiaqian":"1.3",
					"title":"DHL 敏感货 (西马)"
					}
		]},
		{"delivery_methods":"海运",
		"contruc":[
					{
						"jiaqian":"1.4",
					"title":"ABX 普通货 (西马)"
					},
					{
						"jiaqian":"1.5",
					"title":"ABX 普通货 (西马)"
					},
					{
						"jiaqian":"1.6",
					"title":"ABX 普通货 (西马)"
					},
					{
						"jiaqian":"1.7",
					"title":"ABX 普通货 (西马)"
					}
		]}
		];
		let ra = [];
		ra = [
			{"delivery_methods":"空运",
		"contruc":[
					{
						"jiaqian":"2.0",
					"title":"ABX 普通货 (东马)"
					},
					{
						"jiaqian":"2.1",
					"title":"ABX 敏感货 (东马)"
					}
		]},
		{"delivery_methods":"海运",
		"contruc":[
					{
						"jiaqian":"2.2",
					"title":"海运小包 普通货 (东马)"
					},
					{
						"jiaqian":"2.3",
					"title":"大货 普通货 (东马)"
					},
					{
						"jiaqian":"2.4",
					"title":"大货 敏感货 (东马)"
					}
		]}
		];
		if (!req.query.geo_zone_id) {
			g.create(ar,ra,(err,data)=>{
				res.json(data)
   			})
			return
		}
		if (req.query.geo_zone_id==3) {
			g.create(ar,(err,data)=>{
				res.json(data)
   			})
			return
		}
		if (req.query.geo_zone_id==4) {
			g.create(ra,(err,data)=>{
				res.json(data)
   			})
			return
		}
});


module.exports={
    router
}