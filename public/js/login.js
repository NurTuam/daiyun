(function(){
	
	//登录功能
	//获取节点
	let usernameInp=$('#exampleInputUsername');
	let passwordInp=$('#exampleInputPassword1');
	let emailInp=$('#exampleInputEmail1');
	let subbutInp=$('#subbut');
	
	//定义o不ok
	var ok1=false;
	var ok2=false;
	
	//    用户名验证
    function checkUser(res){
      let nametips = $("#nametips");
      let reg=/^[a-zA-Z0-9_-]{4,16}$/;
      if(reg.test(usernameInp.val())==false){
          ok1=false;
      }else{
      ok1=true;
      }
    }
    usernameInp.bind("input propertychange",function(event){
	    checkUser();
	});
	
	/*密码验证*/    
	function checkPwd(){
	  var passtips=$("#passtips");  
	  var reg=/^[a-zA-Z0-9]{4,10}$/;    
	    if(reg.test(passwordInp.val())==false){
	    ok2=false;
	    }else{
	      ok2=true;
	     }
	    }
	passwordInp.bind("input propertychange",function(event){
	    checkPwd();
	});
	
	//点击提交ajax请求
	subbutInp.on('click',function(){
		if(ok1 && ok2){
			
			let username = usernameInp.val();
	        let password = passwordInp.val();
	       
			$.ajax({
				type:"post",
				url:"/login/login",
				data:{
					username:username,
					password:password
				},
				success:function(res){
					 console.log(1)
					if(res.code==2){
						console.log(res);
					}else if(res.code==0){
						console.log(res);
					}else if(res.code==1){//成功就跳转页面
						localStorage.setItem("username", username);
						localStorage.mycolor= username;
						usernameInp.val('');
						emailInp.val('');
						window.location.href = "index.html";
					}
				},
				error:function(res){
					console.log(res)
				}
			});
			return;
		}else{//注册信息填写有误，请检查
			console.log(2)
			return;
		}
		
	});

})();