window.onload = function (){
	var newquote = document.getElementById("new");
	var btn = document.getElementsByTagName("button");
	var txt = document.getElementById("content").getElementsByTagName("p");
	newquote.onclick = function (){
		var color = [];
		for(var i = 0; i < 3; i++){
			color.push(Math.floor(Math.random()*256));
		}
		var bgcolor = "rgb("+color[0]+","+color[1]+","+color[2]+")";
		document.body.style.backgroundColor=bgcolor;
		for(var j = 0; j < 3; j++){
			btn[j].style.backgroundColor = bgcolor;
		}
		txt[0].style.color = txt[1].style.color = bgcolor;
	};
	$(document).ready(function(){
    	$("#new").on("click",function(){
        	$.getJSON("https://sslapi.hitokoto.cn/?encode=json",function(json){
       			$(".quote").html(json.hitokoto);
        		$(".author").html("- "+json.from);
    		});
    	});
	});
};