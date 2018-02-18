window.onload = function(){
	var seat = [];
	var flag = drag = false;
	var index = num = rank = zindex = clickX = clickY =  0;
	var countDown = timer0 = timer1 = timer2 = timer3 = timer4 = timer5 = null;

	var header = document.getElementById('header');
	var nav = header.getElementsByTagName('ul')[0];
	var mainnav = header.getElementsByTagName('li');
	var subnav = header.getElementsByClassName('subnav');
	
	var main = document.getElementById('main');
	var msg = main.getElementsByTagName('h6')[0];
	var hide = main.getElementsByTagName('strong')[0];
	var second = main.getElementsByTagName('span')[0];
	var menu = main.getElementsByTagName('ul')[0];
	var title = menu.getElementsByTagName('li');
	var top = main.getElementsByClassName('top')[0];		
	var part = main.getElementsByClassName('part');
	
	var stage = part[0].getElementsByTagName('div')[0];
	var box = stage.getElementsByTagName('div');
	var shadow = stage.getElementsByClassName('shadow');
	var icon = stage.getElementsByClassName('icon');
	var picture = part[6].getElementsByTagName('img');
	var replay = part[6].getElementsByTagName('h4')[0];
	
	//header部分
	//*调整页面顶端导航栏的子导航位置
	for(var i=0;i<mainnav.length;i++){
		mainnav[i].index = i;
		mainnav[i].onmouseover = function(){
			clearTimeout(timer0);
			var last = mainnav[subnav.length];
			var sub = subnav[this.index - 1];
			for(var i=0;i<mainnav.length;i++){
				mainnav[i].style.background = '';
			}
			this.style.background= 'gray';
			for(var j=0;j<subnav.length;j++){
				subnav[j].style.display = 'none';
			}
			if(this.index > 0 && this.index <= subnav.length){
				sub.style.display = 'block';
				sub.offsetWidth + this.offsetLeft > last.offsetLeft + last.offsetWidth && 
				(sub.style.right = nav.offsetWidth - last.offsetLeft - last.offsetWidth + 'px');
			}
		}
		//*设置鼠标移开后的延迟效果
		mainnav[i].onmouseout = function(){
			var index = this.index;
			timer0 = setTimeout(function(){
				mainnav[index].style.background = '';
				index > 0 && index <= subnav.length && (subnav[index - 1].style.display = 'none');
			},300)
		}
	}
	
	//main部分
	//*隐藏左上角提示文字和读秒
	hide.onclick = function(){
		msg.style.display = 'none';
		clearInterval(countDown);
	}
	countDown = setInterval(function(){
		second.innerHTML--;
		!parseInt(second.innerHTML) && (msg.style.display = 'none',clearInterval(countDown));
	},1000)
	//*菜单栏的滚轮跳转和回到顶端
	for(var j=0;j<title.length;j++){
		title[j].index = j;
		title[j].onclick = function(){
			var index = this.index;
			clearInterval(timer1);
			clearInterval(timer2);
			timer1 = setInterval(function(){
				var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				var goal = header.offsetHeight + part[index].offsetTop;
				var speed = (scrollTop - goal) / 10;
				speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
				speed? document.documentElement.scrollTop = scrollTop - speed : clearInterval(timer1);
				(Math.ceil(scrollTop) == goal || Math.floor(scrollTop) == goal) && (clearInterval(timer1));
				flag = true;
			},20)
		}
	}
	top.onclick = function(){
		clearInterval(timer1);
		clearInterval(timer2);
		timer2 = setInterval(function(){			
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			var speed = scrollTop / 10;
			scrollTop? document.documentElement.scrollTop = scrollTop - speed : clearInterval(timer2);
			flag = true;
		},20)
	}
	//*调整页面缩放后的菜单栏位置，使始终处于main最右边
	window.onresize = function(){
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		var blank = document.documentElement.clientWidth - main.offsetWidth;
		scrollTop >= header.offsetHeight + part[0].offsetTop && (top.style.right = blank / 2 + 10 +'px');
		scrollTop >= header.offsetHeight + part[0].offsetTop && (menu.style.right = blank / 2 + 20 +'px');
	}
	//*滚轮移动时的菜单栏显示
	window.onscroll = function(){
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		var blank = document.documentElement.clientWidth - main.offsetWidth;
		if(!flag){
			clearInterval(timer1);
			clearInterval(timer2);
		}
		flag = false;
		if(scrollTop >= header.offsetHeight + part[0].offsetTop){
			top.style.display = 'block';
			top.style.right = blank / 2 + 10 +'px';
			menu.style.cssText = 'position: fixed;top :20px;';	
			menu.style.right = blank / 2 + 20 +'px';
		}else{
			top.style.display = 'none';
			menu.style.cssText = '';
			for(var i=0;i<title.length;i++){
				title[i].className = '';
			}
		}
		for(var j=0;j<part.length;j++){
			if(scrollTop >= header.offsetHeight + part[j].offsetTop){
				for(var k=0;k<title.length;k++){
					title[k].className = '';
				}
				title[j].className = 'current';
			}
		}
	}
	
	//star部分
	//*话题精选处左右切换图标的显示
	icon[0].onmouseover = function(){
		this.style.opacity = 1;
		icon[1].style.opacity = 0.5;
	}
	icon[1].onmouseover =function(){
		this.style.opacity = 1;
		icon[0].style.opacity = 0.5;		
	}
	icon[0].onmouseout = icon[1].onmouseout = function(){
		icon[0].style.opacity = icon[1].style.opacity = 0;
	}
	icon[0].onclick =function(){
		index == 0? index = box.length - 1 : index--;
		switches(index);
	}
	icon[1].onclick =function(){
		index == box.length - 1? index = 0 : index++;
		switches(index);
	}
	for(var k=0;k<box.length;k++){
		box[k].onmouseover = function (){
			icon[0].style.opacity = icon[1].style.opacity = 0.5;
		}
		box[k].onmouseout = function (){
			icon[0].style.opacity = icon[1].style.opacity = 0;
		}
	}
	//*下方新增切换按钮
	var elem = document.createElement('ul');
	elem.className = 'btns';
	var arr = [];
	for(var l=0;l<box.length;l++){
		arr.push('<li></li>');
	}
	elem.innerHTML = arr.join('');
	stage.appendChild(elem);
	var btn = stage.getElementsByTagName('li');
	btn[0].className = 'active';	
	for(var m=0;m<btn.length;m++){
		btn[m].index = m;
		btn[m].onmouseover = function (){
			switches(this.index);
		}
	}
	//*定义范围内的自动播放和鼠标移入/移出时的暂停/继续
	function auto(){
		timer4 = setInterval(function(){
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			scrollTop < header.offsetHeight + part[1].offsetTop && (num == btn.length - 1? num = 0 : num++,switches(num));
		},3000)
	}
	auto();
	stage.onmouseover = function(){
		clearInterval(timer4);
	}
	stage.onmouseout = function(){
		auto();
	}
	//*设置切换时的动画，包括下方按钮的颜色变化、图片遮挡物的透明度变化、相邻移动时往左或往右或不相邻移动时的位置变化(left、z-index)
	function switches(x){
		clearInterval(timer3);
		index = num = x;
		var order = [];
		var left = right = 0;
		left = x - 1 >= 0? x - 1 : box.length - 1;
		right = x + 1 <= box.length - 1? x + 1 : 0;
		for(var i=0;i<btn.length;i++){
			order.push(i);
			btn[i].className = '';
		}
		btn[x].className = 'active';
		for(var j=0;j<box.length;j++){
			var find = function(val){
				return order.indexOf(val)
			}
			if(find(x) > -1) order.splice(find(x),1);
			else if(find(left) > -1) order.splice(find(left),1);		
			else if(find(right) > -1) order.splice(find(right),1);
		}
		timer3 = setInterval(function(){
			var lLeft = box[left].offsetLeft, lSpeed = (lLeft - 0) / 10;
			lSpeed = lSpeed > 0? Math.ceil(lSpeed) : Math.floor(lSpeed);
			lSpeed && (box[left].style.left = lLeft - lSpeed + 'px');
				
			var cLeft = box[x].offsetLeft, cSpeed = (cLeft - 125) / 10;
			cSpeed = cSpeed > 0? Math.ceil(cSpeed) : Math.floor(cSpeed);
			cSpeed && (box[x].style.left = cLeft - cSpeed + 'px');
						
			var rLeft = box[right].offsetLeft, rSpeed = (rLeft - 250) / 10;
			rSpeed = rSpeed > 0? Math.ceil(rSpeed) : Math.floor(rSpeed);
			rSpeed && (box[right].style.left = rLeft - rSpeed + 'px');
			
			if(cLeft >= 103 && cLeft <= 147){
				box[x].style.zIndex= 3;
				shadow[x].style.opacity = 0;
				shadow[left].style.opacity = shadow[right].style.opacity= 0.4 ;
			}
			else box[x].style.zIndex= 2;
			if(cLeft <= 125){
				if(x == box.length - 1){
					box[left].style.zIndex= 2;
					box[right].style.zIndex= 3;
				}
				else{
					box[left].style.zIndex= 1;
					box[right].style.zIndex= 2;
				}
			}
			else{
				if(x == 0){
					box[left].style.zIndex = 2;
					box[right].style.zIndex = 1;
				}
				else{
					box[left].style.zIndex = 3;
					box[right].style.zIndex = 1;
				}
			}
			for(var i=0;i<order.length;i++){
				box[order[i]].style.zIndex = 0;
				shadow[order[i]].style.opacity = 0.2;
				var hLeft = box[order[i]].offsetLeft, hSpeed = (hLeft - 125) / 10;
				hSpeed = hSpeed > 0? Math.ceil(hSpeed) : Math.floor(hSpeed);
				hSpeed && (box[order[i]].style.left = hLeft - hSpeed + 'px');						
			}
			(!lSpeed && !cSpeed && !rSpeed) && (clearInterval(timer3));
		},20)
	}
	
	//picture部分
	//*拖动图片时的边框变化及所处位置(left、top、z-index)的变化
	for(var m=0;m<picture.length;m++){
		seat[m] = ([{x:picture[m].offsetLeft,y:picture[m].offsetTop}]);
		picture[m].index = m;
		picture[m].onmouseover = function(){
			this.style.border = '2px solid rgba(255,255,255,0.6)';
		}
		picture[m].onmouseout = function(){
			this.style.border = '';
		}
		picture[m].onmousedown = function(event){			
			if(timer5) return false;
			drag = true;
			rank = this.index;
			this.style.zIndex = ++zindex;
			clickX = event.clientX - this.offsetLeft;
			clickY = event.clientY - this.offsetTop;
			seat[rank].push({x:this.offsetLeft,y:this.offsetTop});
		}
		document.onmouseup = window.onblur = picture[m].onlosecapture =  function(){
			drag = false;
			picture[rank].style.boxShadow = ''; 
		}
		document.onmousemove = function(event){			
			if(!drag) return false;
			picture[rank].style.boxShadow = '0 0 30px 5px rgba(255,255,255,0.6)';
			var picX = event.clientX - clickX;
			var picY = event.clientY - clickY;
			var maxwidth = part[6].offsetWidth - picture[rank].offsetWidth;
			var maxheight = part[6].offsetHeight - picture[rank].offsetHeight;
			picX = picX < 0? 0 : picX;
			picX = picX > maxwidth? maxwidth : picX;
			picY = picY < 70? 70 : picY;
			picY = picY > maxheight? maxheight : picY;			
			picture[rank].style.left = picX + "px";
			picture[rank].style.top = picY + "px";
			seat[rank].push({x:picX,y:picY});
			event.preventDefault();//防止图片被拖拽影响鼠标事件
		}
		//*同时回放所有图片的位置移动
		replay.onclick = function(){
			clearInterval(timer5);
			timer5 = setInterval(function(){
				var last0 = seat[0].pop(),last1 = seat[1].pop(),last2 = seat[2].pop(),last3 = seat[3].pop();
				var last4 = seat[4].pop(),last5 = seat[5].pop(),last6 = seat[6].pop();
				var boxShadow = '0 0 30px 5px rgba(255,255,255,0.6)';
				last0 && (picture[0].style.left=last0.x+'px', picture[0].style.top=last0.y+'px', picture[0].style.boxShadow = boxShadow);
				last1 && (picture[1].style.left=last1.x+'px', picture[1].style.top=last1.y+'px', picture[1].style.boxShadow = boxShadow);
				last2 && (picture[2].style.left=last2.x+'px', picture[2].style.top=last2.y+'px', picture[2].style.boxShadow = boxShadow);
				last3 && (picture[3].style.left=last3.x+'px', picture[3].style.top=last3.y+'px', picture[3].style.boxShadow = boxShadow);
				last4 && (picture[4].style.left=last4.x+'px', picture[4].style.top=last4.y+'px', picture[4].style.boxShadow = boxShadow);
				last5 && (picture[5].style.left=last5.x+'px', picture[5].style.top=last5.y+'px', picture[5].style.boxShadow = boxShadow);
				last6 && (picture[6].style.left=last6.x+'px', picture[6].style.top=last6.y+'px', picture[6].style.boxShadow = boxShadow);
				seat[0].length == 0 && (picture[0].style.boxShadow = '');
				seat[1].length == 0 && (picture[1].style.boxShadow = '');
				seat[2].length == 0 && (picture[2].style.boxShadow = '');
				seat[3].length == 0 && (picture[3].style.boxShadow = '');
				seat[4].length == 0 && (picture[4].style.boxShadow = '');
				seat[5].length == 0 && (picture[5].style.boxShadow = '');
				seat[6].length == 0 && (picture[6].style.boxShadow = '');
				(!last0 && !last1 && !last2 && !last3 && !last4 && !last5 && !last6) && (clearInterval(timer5),timer5 = null);
			},50)
		}
	}
}