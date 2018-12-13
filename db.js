const mongoose = require('mongoose');
mongoose.connect('mongodb://47.107.47.190:27017/admin');

let db = {
    "userInfo":{
        username:String,
        password:String,
        email:String
    },
    "bookInfo":{
        username:String,
        productName:String
    },
    "g":{
    	delivery_methods:String,
    	contruc:Array
    },
    "h":{
    	delivery_method_id:String,
    	display_weight:String,
    	display_m3:String
    },
    "w":{
    	delivery_method_id:String,
    	one:String,
    	onee:String,
    	two:String,
    	three:String
    },
    "t":{
    	idd:String,
    	conten:Array
    },
    "cons":{
    	name:String,
    	email:String,
    	conss:	String
    }
    
};

for(let key in db){
    mongoose.model(key,mongoose.Schema(db[key]))
}

module.exports={
    'getModel':function(modelName){
        return mongoose.model(modelName)
    }
};