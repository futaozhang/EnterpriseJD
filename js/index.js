

	

	
	var runDate=[
	{
		"run_img":"img/pc1.png",
		"run_title":"日常办公",
		"run_Entitle":"OFFICING",
		"run_icon":"&#xe674;"
	},
	{
		"run_img":"img/pc2.png",
		"run_title":"高层管理",
		"run_Entitle":"MANAGER",
		"run_icon":"&#xe768;"
	},
	{
		"run_img":"img/pc4.png",
		"run_title":"技术研发",
		"run_Entitle":"TECGNOLOGY",
		"run_icon":"&#xe69f;"
	},
	{
		"run_img":"img/pc4.png",
		"run_title":"技术研发",
		"run_Entitle":"TECGNOLOGY",
		"run_icon":"&#xe69f;"
	},
	
	{
		"run_img":"img/pc2.png",
		"run_title":"视觉设计",
		"run_Entitle":"DESIGNER",
		"run_icon":"&#xe666;"
	}
	]
	
	
	//手风琴数据
	 var j_run = document.getElementById('j_runBaner').innerHTML;
	document.getElementById('mainList').innerHTML=doT.template(j_run)(runDate);
	
	
	//
	 var alert_h = document.getElementById('alert_h').innerHTML;
	 document.getElementById('alert_img_h').innerHTML=doT.template(alert_h)(runDate);
	
	var alert_hs = document.getElementById('alert_hs').innerHTML; 
	document.getElementById('alert_img_hs').innerHTML=doT.template(alert_hs)(runDate);
	
	//
	
	

	 


	

	
	var current=0;
	var MainSet=setInterval(runder,4000);
	//主页滑动	
	$(".pic ul li").click(function(item){

		//window.clearTimeout(MainSet)	
		$(".pic .txt").css("background-color",'#00aeef');
		$(this).find('.txt').css("background-color",'#ffa300');
		$(this).stop(true).animate({width:"800px"},1000).siblings().stop(false).animate({width:"60px"},1000);

		
	})
	//定时轮播

	$(".pic ul li").mouseleave(function(){
  			
  			MainSet = setInterval(runder,3000);
		
	});
		
	$(".pic ul li").mouseenter(function(){
		
  			window.clearInterval(MainSet);
	});
	//轮播方式
	runder()
	function runder(){
		
		$(".pic .txt").css("background-color",'#00aeef');	
		if(current>=$(".pic ul li").length){		
			current=0		
		
		}else{
			
		$(".pic ul li").eq(current).find('.txt').css("background-color",'#ffa300');
		$(".pic ul li").eq(current).stop(true).animate({width:"800px"},1000).siblings().stop(false).animate({width:"60px"},1000);
		current++
		
		}
	

	};
	

	
	//首页弹框
	$("#mainList").delegate(".selcetor",'click',function(){
		
		$(".alertBox").show()
	});
	
	
	/**-------------IE 兼容-----------------------------*/
	// 首页  默认选框样式设置
	$.each($("#mainList li .txt"), function(i,item) {
	
		if(i==0){
			$(this).css("background-color",'#ffa300')
		}
	});