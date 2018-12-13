const express = require('express');
const bodyParser = require('body-parser');
let router = express.Router();


const arrs = [
{
	"text":"在吗？",
	"hu":"亲，在的呢，有什么可以帮您的吗？",
	"time":""
},
{
	"text":"查快递",
	"hu":"亲，请输入订单号",
	"time":""
}
]



router.post('/', bodyParser(), (req, res) => {
	for (var key in arrs) {
		if (req.body.cont == arrs[key].text) {
			var myDate = new Date();
			var h = myDate.getHours();
			var m = myDate.getMinutes();    
			arrs[key].time = h+':'+m;
			res.json(arrs[key]);
			return
		}
		
	}
})





module.exports={
    router
}