(function(){
	
	//注册功能
	//获取节点
	let usernameInp=$('#exampleInputUsername');
	let emailInp=$('#exampleInputEmail1');
	let passwordInp=$('#exampleInputPassword1');
	let checkbokInp=$('#checkbok');
	let subbutInp=$('#subbut');
	let tixing=$('#tixing')
	
	//定义o不ok
	var ok1=false;
	var ok2=false;
	var ok3=false;
	var ok4=false;
	//    用户名验证
    function checkUser(res){
      let nametips = $("#nametips");
     
      nametips.removeClass('red');
      let reg=/^[a-zA-Z0-9_-]{4,16}$/;
      if(reg.test(usernameInp.val())==false){
          nametips.html('非法用户名');
          nametips.removeClass('green');
          nametips.addClass('red');
          ok1=false;
      }else{
      nametips.html('该用户名可以使用!');
      nametips.removeClass('red');
      nametips.addClass('green');
      ok1=true;
      }
    }
    usernameInp.bind("input propertychange",function(event){
	    checkUser();
	});
	
	
	/*验证邮箱*/
	function checkEmail(){
	  var emailtips=$("#emailtips");
	  emailtips.innerHTML="每个邮箱只可注册一次";
	  var reg=/^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;    
	    if(reg.test(emailInp.val())==false){
	        emailtips.html("Email格式不正确，例如web@sohu.com");
	        emailtips.removeClass('green');
            emailtips.addClass('red');
	    	ok2=false;
	        }else{
	        	emailtips.html("Email格式正确!");
		        emailtips.removeClass('red');
	            emailtips.addClass('green');
		        ok2=true;
	        }
	    	
	}
	emailInp.bind("input propertychange",function(event){
	    checkEmail();
	});
	
	
	/*密码验证*/    
	function checkPwd(){
	  var passtips=$("#passtips");
	   passtips.html("密码长度为4-10字符");    
	  var reg=/^[a-zA-Z0-9]{4,10}$/;    
	    if(reg.test(passwordInp.val())==false){
	       passtips.html("密码不能含有非法字符，长度在4-10之间");
	       passtips.removeClass('green');
           passtips.addClass('red');
	    ok3=false;
	      }else{
	      	passtips.html("密码可用!");
	       passtips.removeClass('red');
           passtips.addClass('green');
	      ok3=true;
	      
	      }
	    
	    }
	passwordInp.bind("input propertychange",function(event){
	    checkPwd();
	});
		
	//点击提交ajax请求
	subbutInp.on('click',function(){
		if($("input[type='checkbox']").is(':checked')){
			ok4=true;
			tixing.removeClass('red')
		}else{
			ok4=false;
		}
		
		
		if(ok1 && ok2 && ok3 && ok4){
			let username = usernameInp.val();
	        let password = passwordInp.val();
	        let email = emailInp.val();
	        let tips=$('#emailtips');
	        tips.html('');
	        console.log(username)
			$.ajax({
				type:"post",
				url:"/register/register",
				data:{
					username:username,
					email:email,
					password:password
				},
				success:function(res){
					if(res.code==2){
						tips.html(res.msg);
						tips.removeClass('green');
	            		tips.addClass('red');
					}else if(res.code==0){
						console.log(res);
					}else if(res.code==1){//成功就跳转页面
						
						//设置：
						localStorage.setItem("username", username);
						localStorage.mycolor= username;
						usernameInp.val('');
						emailInp.val('');
						window.location.href = "index.html";
					}
				},
				error:function(){
					
				}
			});
			return;
		}else if(ok1 && ok2 && ok3){//请认真阅读隐私权政策条款并勾选后再进行注册
			
			tixing.addClass('red')
			return;
		}else{//注册信息填写有误，请检查
			console.log(2)
			return;
		}
		
	});
	

})();