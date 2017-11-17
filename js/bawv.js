$(document).ready(function(){
	var flag = true;
	var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var page = 'https://en.wikipedia.org/?curid='; 
	$('input,span').hide();
	$('div').click(function (){
		if(flag){			
			$('div').css({border:'4px solid violet',boxShadow:'0 0 15px cyan',color:'white'});
			$('div').animate({width:'300px',paddingLeft: '15px'},300);
			$('input,span').show();	
			$('input').focus();
			flag = false;
		}
	});
	$('span').click(function(event){		
		$('#header').css('margin','20% auto 0');
		$('div').css({border:'4px solid cyan',boxShadow:'0 0 15px violet',color:'black'});
		$('div').animate({width:'40px',paddingLeft: '0'},400);
		$('#tip').show();
		$('input,span').hide();
		$('input').val('');
		$('ul').html('');
		event.stopPropagation();
		flag = true;
	});
	$('input').keydown(function(event){
		if(event.keyCode==13){
			$('#header').css('margin','2% auto 0');
			$('#tip').hide();
			$.ajax({ 
				url: api+$('input').val(), 
				type: 'GET', 
				dataType: 'jsonp', 
				success: function (data){
					var li = '';
					var topten = data.query.pages;
//					var id = Object.keys(topten);//返回对象的属性名，并排序.
//					id.forEach(function (i){});//调用数组的每个元素，并将元素传递给回调函数.
					for(var i in topten){
						var title = topten[i].title;			
						var extract = topten[i].extract;
						var pageid = page+topten[i].pageid;						
						li +='<a href=\"'+pageid+'\"target=\"_blank\"><li><h3>'+title+'</h3><p>'+extract+'</p></li></a>';						
					}
					$('ul').html(li);
				}
			});
		}
	});
});