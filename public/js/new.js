let a = window.location.search;
let arr = a.split('=');

console.log(arr[1])

$(document).ready(function (){

$.ajax({
	url: '/tracking?a=' + arr[1],
	type: 'get',
	dataType: 'json',
	success: function(json) {
		console.log(json)
		if(json == '') {
			$('#content p').html('找不到相关包裹！')
		} else {
			var html = [];
			for(var key in json[0].conten) {
				html += '<p>' + json[0].conten[key].city + '</p><p>' + json[0].conten[key].name + '</p><br/>'
			}
			$('#content p').append(html);
		}
	}
});

});