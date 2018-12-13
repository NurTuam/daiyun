const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let model = require('./db');
let h = model.getModel('h');
let router = express.Router();

router.get('/', bodyParser(), (req, res) => {
//	console.log(req.query.delivery_method_id)
	let b = req.query.delivery_method_id;
	let a = [];
h.remove({},(err,data)=>{})
a = [{
		"delivery_method_id": "1.0",
		"display_weight": "1",
		"display_m3": "0"
	},
	{
		"delivery_method_id": "1.1",
		"display_weight": "1",
		"display_m3": "0"
	},
	{
		"delivery_method_id": "1.2",
		"display_weight": "1",
		"display_m3": "0"
	},
	{
		"delivery_method_id": "1.3",
		"display_weight": "1",
		"display_m3": "0"
	},
	{
		"delivery_method_id": "2.0",
		"display_weight": "1",
		"display_m3": "0"
	},
	{
		"delivery_method_id": "2.1",
		"display_weight": "1",
		"display_m3": "0"
	},
	{
		"delivery_method_id": "1.4",
		"display_weight": "0",
		"display_m3": "1"
	},
	{
		"delivery_method_id": "1.5",
		"display_weight": "0",
		"display_m3": "1"
	},
	{
		"delivery_method_id": "1.6",
		"display_weight": "0",
		"display_m3": "1"
	},
	{
		"delivery_method_id": "1.7",
		"display_weight": "0",
		"display_m3": "1"
	},
	{
		"delivery_method_id": "2.2",
		"display_weight": "0",
		"display_m3": "1"
	}, {
		"delivery_method_id": "2.3",
		"display_weight": "0",
		"display_m3": "1"
	}, {
		"delivery_method_id": "2.4",
		"display_weight": "0",
		"display_m3": "1"
	}
];

h.create(a, (err, data) => {
	h.find({
		delivery_method_id: b
	}, (err, data) => {
		if(err) {
			console.log(err);
			return
		}
//		console.log(data);
		res.json(data);
	})
});

	

});

module.exports = {
	router
}