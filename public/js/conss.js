(function() {

	var nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
];
var str = '';
var verVal = drawCode();
// 绘制验证码

function drawCode (str) {
    var canvas = document.getElementById("verifyCanvas"); //获取HTML端画布
    var context = canvas.getContext("2d"); //获取画布2D上下文
    context.fillStyle = "cornflowerblue"; //画布填充色
    context.fillRect(0, 0, canvas.width, canvas.height); //清空画布
    context.fillStyle = "white"; //设置字体颜色
    context.font = "25px Arial"; //设置字体
    
    var rand = new Array();//我是验证码
    var x = new Array();
    var y = new Array();
    for (var i = 0; i < 4; i++) {
        rand.push(rand[i]);
        rand[i] = nums[Math.floor(Math.random() * nums.length)]
        x[i] = i * 20 + 10;
        y[i] = Math.random() * 20 + 20;
        context.fillText(rand[i], x[i], y[i]);
    }
    
    str = rand.join('').toUpperCase();
    //画3条随机线
    for (var i = 0; i < 3; i++) {
        drawline(canvas, context);
    }

    // 画30个随机点
    for (var i = 0; i < 30; i++) {
        drawDot(canvas, context);
    }
    convertCanvasToImage(canvas);
    return str;
}

// 随机线
function drawline (canvas, context) {
    context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
    context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
    context.lineWidth = 0.5; //随机线宽
    context.strokeStyle = 'rgba(50,50,50,0.3)'; //随机线描边属性
    context.stroke(); //描边，即起点描到终点
}
// 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
function drawDot (canvas, context) {
    var px = Math.floor(Math.random() * canvas.width);
    var py = Math.floor(Math.random() * canvas.height);
    context.moveTo(px, py);
    context.lineTo(px + 1, py + 1);
    context.lineWidth = 0.2;
    context.stroke();

}
// 绘制图片
function convertCanvasToImage (canvas) {
    document.getElementById("verifyCanvas").style.display = "none";
    var image = document.getElementById("code_img");
    image.src = canvas.toDataURL("image/png");
    return image;
}

// 点击图片刷新
document.getElementById('code_img').onclick = function() {
    resetCode();
}

function resetCode () {
    $('#verifyCanvas').remove();
    $('#code_img').before('<canvas width="100" height="40" id="verifyCanvas"></canvas>')
    verVal = drawCode();
}

//定义o不ok
	var ok1=false;
	var ok2=false;
/*验证邮箱*/
let inputEmail3=$('#inputEmail3');
	function checkEmail(){
	  var emailtips=$("#emailtips");
	  var reg=/^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;    
	    if(reg.test(inputEmail3.val())==false){
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
	inputEmail3.bind("input propertychange",function(event){
	    checkEmail();
	});

	let conssbut=$('#jm_conss');
	let inputName=$('#inputName');
	let textConss=$('#textConss');
	let inputYan=$('#inputYan');
	
	
	conssbut.on('click',function(){
		let name=inputName.val();
		let conss=textConss.val();
		let email=inputEmail3.val();
		console.log(name);console.log(email);
		console.log(conss);
		
		let Yan=inputYan.val();
		
		if(verVal==Yan){
			ok1=true;
		}else{
			ok1=false;
		}
		
		if(!ok2){
			alert('邮箱填写错误，请您重新填写')
			return;
			
		}else if(!ok1){
			alert('验证码出错啦，请您重新填写')
			resetCode();
			inputYan.val('');
			return;
		} else if(name&&conss&&ok2&&ok1){
			$.ajax({
				type:"post",
				url:"/conss/conss",
				data:{
					name:name,
					email:email,
					conss:conss
				},
				success:function(res){
					console.log(111);
					console.log(res)
					if(res.code==0){
						alert(res.msg)
					}else if(res.code==1){//成功就跳转页面
						alert(res.msg)
						window.location.href = "conss.html";
					}
				}
			});
		} else{
			alert('内容填写不完整，请检查！')
		}
	
	
	})




	let logining = $('#logining');
	let vip = $('#vip');
	//写上用户名
	vipname();

	function vipname() {
//		console.log(localStorage.getItem("username"))
		var username = localStorage.getItem("username"); //从本地拿到

		if(username) { //如果有就渲染上去
			logining.html("尊敬的会员：" + username);
			vip.html('');
			vip.html('<li><a href="#">会员中心</a></li><li id="sign"><a href="#">退出登录</a></li>');
			return;

		} else {
			logining.html("注册 / 登录");
			vip.html('<li><a href="register.html">注册</a></li><li><a href="login.html">登录</a></li>');
			return;
		}
	}
	//去掉用户名
	var sign = $('#sign');
	sign.on('click', function() {
		removevip();
	})

	function removevip() {
		localStorage.removeItem("username");
		logining.html("注册 / 登录");
		vip.html('<li><a href="register.html">注册</a></li><li><a href="login.html">登录</a></li>');
	}

})();