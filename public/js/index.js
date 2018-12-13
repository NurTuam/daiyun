(function() {
	//轮播图开始
	function slider() {
		let json = [{
				bac: "url(./img/slide_01_2000x410.jpg)",
				img: "./img/slide_01_2000x410.jpg"
			},
			{
				bac: "url(./img/slide_02_2000x410.jpg)",
				img: "./img/slide_02_2000x410.jpg"
			},
			{
				bac: "url(./img/slide_03_2000x410.jpg)",
				img: "./img/slide_03_2000x410.jpg"
			},
			{
				bac: "url(./img/slide_04_2000x410.jpg)",
				img: "./img/slide_04_2000x410.jpg"
			}
		];
		let width = $(window).width();
		//窗口改变的话
		let isMobile = true;
		if(width < 768) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		let html = template("sliderWrapper", {
			data: json,
			isMobile
		});
		$('#inner').html(html);

		//滑动
		let isMove = false;
		let startX = 0;
		let moveX = 0;
		let distanceX = 0;
		$('#inner').on('touchstart', function(e) {
			startX = e.originalEvent.touches[0].clientX;
		});
		$('#inner').on('touchmove', function(e) {
			moveX = e.originalEvent.touches[0].clientX;
			isMove = true;
		});
		$('#inner').on('touchend', function(e) {
			distanceX = moveX - startX;
			if(isMove) {
				if(distanceX > 0) {
					//前一张
					$("#jm_swiper").carousel("prev");
				} else if(distanceX < 0) {
					//后一张
					$("#jm_swiper").carousel("next");
				}
			}
			isMove = false;
			startX = 0;
			moveX = 0;
			distanceX = 0;
		})
	}
	//监听窗口
	$(window).on('resize', function() {
		slider();
	}).trigger('resize')

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
		if(r != null) return unescape(r[2]);
		return null;
	}

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

	let arr = [];
	$('#shipping-fee-calculator select[name=\'geo_zone\']').on('change', function() {
		$.ajax({
			url: '/geoZone?geo_zone_id=' + this.value,
			dataType: 'json',
			success: function(res) {
				arr = [];
				arr = res;
				//			console.log(arr)
				html = '<option value="">选择运输方式</option>';
				if(arr != '') {
					for(var i in arr) {
						html += '<optgroup label="' + arr[i].delivery_methods + '">';
						for(var j in arr[i].contruc) {
							html += '<option value="' + arr[i].contruc[j].jiaqian + '"';
							html += '>' + arr[i].contruc[j].title + '</option>';
						}

					}
				} else {
					html += '<option value="0" selected="selected">无</option>';
				}
				$('#shipping-fee-calculator select[name=\'delivery_method\']').html(html);
			},
			//		error: function(xhr, ajaxOptions, thrownError) {
			//			//alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);

		});
	});
	$('.calculate-result').hide();
	$('#shipping-fee-calculator select[name=\'geo_zone\']').trigger('change');
	$('#shipping-fee-calculator input[name=\'weight\']').hide();
	$('#shipping-fee-calculator input[name=\'m3\']').hide();
	$('#shipping-fee-calculator select[name=\'delivery_method\']').on('change', function() {
		$.ajax({
			url: '/geozon?delivery_method_id=' + this.value,
			dataType: 'json',
			success: function(json) {
				console.log(json[0].display_m3)
				if(json[0].display_weight == 1) {
					$('#shipping-fee-calculator input[name=\'weight\']').show();
				} else {
					$('#shipping-fee-calculator input[name=\'weight\']').hide();
				}
				if(json[0].display_m3 == 1) {
					$('#shipping-fee-calculator input[name=\'m3\']').show();
				} else {
					$('#shipping-fee-calculator input[name=\'m3\']').hide();
				}
			}
		});
	});

	var volumetric_types = {};
	volumetric_types['no'] = '免抛';
	volumetric_types['half'] = '半抛';
	volumetric_types['default'] = '实重';
	$(document).delegate('#button-shipping-fee-calculator', 'click', function() {
		if(!$('#shipping-fee-calculator select[name=delivery_method]').val()) {
			console.log(1)
			html = '<label class="alert error alert-msg">没有选择运输方式</label>';
			$('.calculate-result > div').html(html);

			$('.calculate').slideUp();
			$('.calculate-result').slideDown();
		} else {
			$.ajax({
				url: '/calculate',
				type: 'post',
				data: $('#shipping-fee-calculator select, #shipping-fee-calculator input'),
				dataType: 'json',
				success: function(json) {
					console.log(json)
					html = '<label>运费</label> - ';

					if(json != '') {
						html += json + '<br/><br/>';
					}

					$('.calculate-result > div').html(html);

					$('.calculate').slideUp();
					$('.calculate-result').slideDown();
				},
			});
		}

	});
	//
	$(document).delegate('#button-shipping-fee-calculator-result', 'click', function() {
		//	console.log(1)
		$('.calculate-result').slideUp();
		$('.calculate').slideDown();

	});

	$(document).delegate('#button-parcel-tracking', 'click', function() {
		let v = $('#input-tracking-number').val();
		window.location.href = "new.html?b=" + v;
		//	$.ajax({
		//			url: '/tracking?a='+v,
		//			type: 'get',
		//			dataType: 'json',
		//			success: function(json) {
		//				console.log(json)
		//			}
		//		});

	})
	let isno = true;
	$('.kefu').on('click', function() {
		$('.kefu01').toggle();
		var myDate1 = new Date();
		var h1 = myDate1.getHours();
		var m1 = myDate1.getMinutes();
		var time1 = h1 + ':' + m1;
		let html1 = `<div>
									<p class="time-break" style="padding-top: 0px;"><span>${time1}</span></p>
									<div class="chat chat-left">
										<div class="chat-avatar">
											<img src="img/kefu.png"/>
										</div>
										<div class="chat-body">
											<div class="chat-content">
												<div class="txt-message">
													<span>亲，有什么可以帮您的吗？</span>
												</div>
											</div>
										</div>
									</div>
								</div>`
		if(isno) {
			$('.chat-message-body-list').append(html1);
			isno = false;
		} else {
			$('.chat-message-body-list').empty();
			isno = true;
		}
	})

	$(document).keydown(function(event) {
		let boxh = $('#box').height();
		let c = $('#cont').val()
		if(event.keyCode == 13) {
			event.preventDefault();
			if($('#cont').val()) {
				$('#cont').val('')
			}
			var myDate2 = new Date();
			var h2 = myDate2.getHours();
			var m2 = myDate2.getMinutes();
			var time2 = h2 + ':' + m2;
			let time1 = $(".time-break:last span").html();
			if(time2 == time1) {
				let html2 = `<div  class="h" style="width:100%; display: inline-block;">
									<div class="chat chat-right">
										<div class="chat-avatar">
											
										</div>
										<div class="chat-body">
											<div class="chat-content">
												<div class="txt-message">
													<span>${c}</span>
												</div>
											</div>
										</div>
									</div>
								</div>`
				$('.chat-message-body-list').append(html2);
				let mesh = $('#mes').height();
				if(mesh >= boxh) {
					$('#mes').css({
						"position": "absolute",
						"top": -(mesh - boxh) + 'px'
					})
				}
			} else {
				let html = `<div class="h" style="width:100%; display: inline-block;">
									<p class="time-break" style="padding-top: 0px;"><span>${time2}</span></p>
									<div class="chat chat-right">
										<div class="chat-avatar">
										</div>
										<div class="chat-body">
											<div class="chat-content">
												<div class="txt-message">
													<span>${c}</span>
												</div>
											</div>
										</div>
									</div>
								</div>`
				$('.chat-message-body-list').append(html);
				let mesh = $('#mes').height();
				if(mesh >= boxh) {
					console.log(mesh - boxh)
					$('#mes').css({
						"position": "absolute",
						"top": -(mesh - boxh) + 'px'
					})
				}
			}
			$.ajax({
				url: '/conts',
				type: 'post',
				data: {
					cont: c
				},
				dataType: 'json',
				success: function(json) {
//					console.log(json)
					if(json) {
						let time3 = $(".time-break:last span").html();
						if(json.time == time3) {
							let html = `<div>
									
									<div class="chat chat-left">
										<div class="chat-avatar">
											<img src="img/kefu.png"/>
										</div>
										<div class="chat-body">
											<div class="chat-content">
												<div class="txt-message">
													<span>${json.hu}</span>
												</div>
											</div>
										</div>
									</div>
								</div>`
							$('.chat-message-body-list').append(html);
							let mesh = $('#mes').height();
							if(mesh >= boxh) {
								//								console.log(mesh - boxh)
								$('#mes').css({
									"position": "absolute",
									"top": -(mesh - boxh) + 'px'
								})
							}
						} else {
							let html = `<div>
									<p class="time-break" style="padding-top: 0px;"><span>${json.time}</span></p>
									<div class="chat chat-left">
										<div class="chat-avatar">
											<img src="img/kefu.png"/>
										</div>
										<div class="chat-body">
											<div class="chat-content">
												<div class="txt-message">
													<span>${json.hu}</span>
												</div>
											</div>
										</div>
									</div>
								</div>`
							$('.chat-message-body-list').append(html);
							let mesh = $('#mes').height();
							if(mesh >= boxh) {
								$('#mes').css({
									"position": "absolute",
									"top": -(mesh - boxh) + 'px'
								})
							}
						}

					}
					//				$('.chat-message-body-list')

				},
			});

		}
	});
	$('#box').on('scroll', function() {
		let h = $('#box').scrollTop();
		//    console.log(h)
		$('#mes').css({
			"position": "absolute",
			"top": -h + 'px'
		})
	});

})();