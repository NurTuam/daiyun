const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let model = require('./db');
let router = express.Router();
let w = model.getModel('w');

w.remove({}, (err, data) => {});
let x = [];
x = [{
		"delivery_method_id": "1.0",
		"one": "14.8",
		"onee": "6.8",
		"two": "6",
		"three": "5.6"
	},
	{
		"delivery_method_id": "1.1",
		"one": "17",
		"onee": "8.5",
		"two": "7",
		"three": "6.8"
	},
	{
		"delivery_method_id": "1.2",
		"one": "17",
		"onee": "8.5",
		"two": "7",
		"three": "6.8"
	},
	{
		"delivery_method_id": "1.3",
		"one": "17",
		"onee": "8.5",
		"two": "7",
		"three": "6.8"
	},
	{
		"delivery_method_id": "1.4",
		"one": "14.8",
		"onee": "6.8",
		"two": "6",
		"three": "5.6"
	},
	{
		"delivery_method_id": "1.5",
		"one": "17",
		"onee": "8.5",
		"two": "7",
		"three": "6.8"
	},
	{
		"delivery_method_id": "1.6",
		"one": "17",
		"onee": "8.5",
		"two": "7",
		"three": "6.8"
	},
	{
		"delivery_method_id": "1.7",
		"one": "17",
		"onee": "9.5",
		"two": "7",
		"three": "6.0"
	},
	{
		"delivery_method_id": "2.0",
		"one": "14.8",
		"onee": "6.8",
		"two": "6",
		"three": "5.6"
	},
	{
		"delivery_method_id": "2.1",
		"one": "17",
		"onee": "8.5",
		"two": "7",
		"three": "6.8"
	},
	{
		"delivery_method_id": "2.2",
		"one": "17",
		"onee": "8.5",
		"two": "7",
		"three": "6.8"
	},
	{
		"delivery_method_id": "2.3",
		"one": "17",
		"onee": "8.5",
		"two": "7",
		"three": "6.8"
	},
	{
		"delivery_method_id": "2.4",
		"one": "17",
		"onee": "8.5",
		"two": "7",
		"three": "6.8"
	}
];

router.post('/', bodyParser(), (req, res) => {
	//	console.log(req.body)
	let p = 0;
	let {
		delivery_method,
		weight,
		m3
	} = req.body;
	w.create(x, (err, data) => {
		w.find({
			delivery_method_id: delivery_method
		}, (err, data) => {
			if(err) {
				console.log(err);
				return
			}
			console.log(data);
			if(weight) {
				if(weight >= 10.5) {
					p = Math.round(Math.ceil(weight * 2) * data[0].three)
					res.json(p);
					return
				}
				if(1 >= weight > 0) {
					p = Math.round(weight * data[0].one)
					res.json(p);
					return
				}
				if(3 > weight > 1) {
					p = Math.round((Math.ceil(weight * 2) - 2) * data[0].onee) + data[0].one
					res.json(p);
					return
				}
				if(10.5 > weight >= 3) {
					p = Math.round(Math.ceil(weight * 2) * data[0].two)
					res.json(p);
					return
				}
			}
			if(m3) {
				if(0 < m3 < 3) {
					p = ((m3*10).toFixed(1) - 0.1) * 30 + 60;
					res.json(p);
					return
				}
				p = (m3.toFixed(1)) * 30;
				res.json(p);
				return
			}
		})
	});

})

module.exports = {
	router
}