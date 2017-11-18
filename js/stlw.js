$(document).ready(function(){
	function update(){
		var city = '';
		var today = new Date();
		var str = [today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()];
		var newstr = [];
		for(var i = 0; i < str.length; i++){
			 newstr[i] = str[i].toString().replace(/^(\d)$/,"0$1");
		}
		newstr[3] = "&nbsp; "+newstr[3]+" &nbsp;";
		$("span").each(function (i){
			$(this).html(newstr[i]);
		});
	}
	setInterval(update,1000);
	$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){
		city = remote_ip_info.city;
	})
	$("#click").click(function(){	
		$.getJSON('http://wthrcdn.etouch.cn/weather_mini?city='+city,function(weather){
			function getNum(x){
				return x.replace(/[^(\d|\-)]/g,'');
			}
			$("#info").find("span:eq(0)").html(city);
			$("#info").find("span:eq(1)").nextAll().css('color','orangered');
			$("#info").find("span:eq(1)").html(weather.data.forecast[0].type);
			$("#info").find("span:eq(2)").html(getNum(weather.data.forecast[0].low)+"/");
			$("#info").find("span:eq(3)").html(getNum(weather.data.forecast[0].high)+"℃");
			switch(weather.data.forecast[0].type){
				case "晴":
					$("img").css({display:'block',clip:'rect(0 80px 80px 0)',margin:0});
					break;
				case "多云":
					$("img").css({display:'block',clip:'rect(0 160px 80px 80px)',margin:'0 -80px'});
					break;	
				case "阴":
					$("img").css({display:'block',clip:'rect(0 240px 80px 160px)',margin:'0 -160px'});
					break;
				case "小雨":case "中雨":case "大雨":
					$("img").css({display:'block',clip:'rect(80px 80px 160px 0)',margin:'-80px 0'});
					break;
				case "小雪":case "中雪":case "大雪":
					$("img").css({display:'block',clip:'rect(240px 80px 320px 0)',margin:'-240px 0'});
					break;
			}
		});
		$("#click").attr("disabled", true);
		$("#click").css("cursor","not-allowed");
		$("#switch").attr("disabled", false);
		$("#switch").css("cursor","pointer");
	});
	$("#switch").attr("disabled", true);
	$("#switch").click(function(){
		if($("#info").find("span:eq(3)").html().indexOf("℃")>0){
			function toF(x){
				return Math.round(parseInt(x) * 1.8 + 32);
			}
			var low = toF($("#info").find("span:eq(2)").html());
			var high = toF($("#info").find("span:eq(3)").html());
			$("#info").find("span:eq(2)").html(low + "/");
			$("#info").find("span:eq(3)").html(high + "℉");
			$("#info").find("span:eq(1)").nextAll().css('color','cyan');
		}else{
			function toC(x){
				return Math.round((parseInt(x) - 32) / 1.8);
			}
			var low = toC($("#info").find("span:eq(2)").html());
			var high = toC($("#info").find("span:eq(3)").html());
			$("#info").find("span:eq(2)").html(low + "/");
			$("#info").find("span:eq(3)").html(high + "℃");
			$("#info").find("span:eq(1)").nextAll().css('color','orangered');
		}
	});
});