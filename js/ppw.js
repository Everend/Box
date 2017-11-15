window.onload = function (){
	var flag = false;
	var timer = timer2 = null;
	var top = document.getElementById("top");
	var navhei = document.getElementById("nav").offsetHeight;	
	var navlis = document.getElementById("nav").getElementsByTagName("li");
	var adpart = document.getElementById("con").getElementsByTagName("div");
	for(var i=0;i<navlis.length-1;i++){
		navlis[i].onmouseover = function (){
			this.className = "ac2";
		}
		navlis[i].onmouseout = function (){
			this.className = "";
		}				
	}
	for(var j=0;j<navlis.length;j++){		
		navlis[j].no = j;
		navlis[j].onclick = function (){
			clearInterval(timer);
			clearInterval(timer2);
			var no = this.no;
			timer = setInterval(function(){
				var scrtop = document.documentElement.scrollTop;
				var speed = (scrtop - (adpart[navlis.length-1-no].offsetTop - navhei)) / 10;
				speed = speed>0? Math.ceil(speed) : Math.floor(speed);
				speed? (document.documentElement.scrollTop = scrtop - speed) : clearInterval(timer);
				flag = true;
			},20)
		}							
	}
	top.onclick = function (){
		clearInterval(timer);
		clearInterval(timer2);	
		timer2 = setInterval(function(){
			var scrtop = document.documentElement.scrollTop;
			var speed = scrtop / 10;		
			scrtop == 0? clearInterval(timer2) : document.documentElement.scrollTop = scrtop - speed;
			flag = true;
		},20);
	}	
	window.onscroll = function (){
		var scrtop = document.documentElement.scrollTop;
		if(!flag){
			clearInterval(timer);
			clearInterval(timer2);
		}
		flag = false;
		if(scrtop >= 70)top.style.display = "block";
		else top.style.display = "none";
		for(var i=0;i<adpart.length;i++){
			if(scrtop + navhei >= adpart[i].offsetTop){//j=0|j=1,j=0|j=2,j=1,j=0|j=3,j=2,j=1,j=0
				for(var j=0;j<navlis.length;j++){
					navlis[j].className = "";
					navlis[j].onmouseover = function (){
						this.className = "ac2";
					}
					navlis[j].onmouseout = function (){
						this.className = "";
					}			
				}
				navlis[navlis.length-1-i].className = "ac1";
				navlis[navlis.length-1-i].onmouseover = function (){
						this.className = "ac1";
				}
				navlis[navlis.length-1-i].onmouseout = function (){
						this.className = "ac1";
				}
			}
		}		
	}
}