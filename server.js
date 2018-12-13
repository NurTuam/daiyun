const express=require('express');
const xtpl=require('xtpl');
const app=express();

app.set('views','./public');
app.set('view engine','html');
app.engine('html',xtpl.renderFile);
app.use('', express.static('public'));
app.get('/',(req,res)=>{
	res.render('./public/index',{})
})
app.use('/register',require('./register').router);
app.use('/geoZone',require('./geoZone').router);
app.use('/geozon',require('./geozon').router);
app.use('/calculate',require('./calculate').router);
app.use('/tracking',require('./tracking').router);
app.use('/conts',require('./conts').router);
app.use('/login',require('./login').router);
app.use('/conss',require('./conss').router);



app.listen('8888');
