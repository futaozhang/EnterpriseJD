	//测试数据
	var leftDate1={
	
	"picname":"采购方案一",
	"isLive":true,
	"info":[
	{
		
		"pic_title":"Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
		"pic_jdPrice":"5220.00",
		"pic_userPrice":"4900.00",
		"pic_img":"img/text.jpg",
		"pic_value":1
		
		
	},
	{
		"pic_title":"Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
		"pic_jdPrice":"5220.00",
		"pic_userPrice":"4900.00",
		"pic_img":"img/text.jpg",
		"pic_value":1
		
		
	},
	{
		"pic_title":"Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
		"pic_jdPrice":"5220.00",
		"pic_userPrice":"4900.00",
		"pic_img":"img/text.jpg",
		"pic_value":2
		
		
	},
	{
		"pic_title":"Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
		"pic_jdPrice":"5220.00",
		"pic_userPrice":"4900.00",
		"pic_img":"img/text.jpg",
		"pic_value":1
		
		
	}]
}

	

	

	var sourDate=[]
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
	
	

	//左侧按钮切换
	var tmpl = document.getElementById('j_tmpl').innerHTML;
	
	$(".isLogoing a").click(function(item){
	
		switch (parseInt($(this).attr("data-src"))){
			case 1:
				runBg(this)
				document.getElementById('mianCont').innerHTML=doT.template(tmpl)(leftDate1);
			
			break;
			case 2:
				runBg(this)
				document.getElementById('mianCont').innerHTML=doT.template(tmpl)(leftDate1);
			break;
			case 3:
				runBg(this)
				document.getElementById('mianCont').innerHTML=doT.template(tmpl)(sourDate);
			break;
			
		
		}
	
	
	
	});
	function runBg(th){
	
		$(".bottom").animate({"width":"370px"})
		$(".leftfooter li").animate({"width":"119px"})
		$(".isLogoing a").removeClass("activeYellow")
	 	$(th).addClass("activeYellow")
		$(".leftSelct .bg").show()
		$(".leftContent").animate({"width":"360px"})
		$(".isLogoing").animate({"left":"360px"})
	}
	 
	$(".leftSelct .bg").click(function(){	
		$(".leftSelct .bg").hide()
		$(".bottom").animate({"width":"0px"})
		$(".leftContent").animate({"width":"0px"})
		$(".leftSelct div").animate({"left":"0px"})
	});

	

	
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
	
	
//全选
	$("#mianCont").delegate("#all","click",function(){

		setTimeout(function(){
			
		if($("#all").prop("checked")==true){
			
		$(".contents").find("input[type='checkbox']").prop("checked", true);	
		}else{
			
		$(".contents").find("input[type='checkbox']").prop("checked", false);
			
		}
	},4)
	
	});
	//所有列表
	$("#mianCont").delegate(".checkBox input[type='checkbox']","click",function(){
			var checkbox=$("#leftDate input[type='checkbox']")
			$.each(checkbox, function(i,item) {
				if($(item).prop("checked")==false){
					$(".l_top").find("input[type='checkbox']").prop("checked", false)
					return false;
				}else{
				$(".l_top").find("input[type='checkbox']").prop("checked", true)	
				}
			});
		})
	
	
//加减
	$("#mianCont").delegate(".input_num .reduce",'click',function(){
		
		var nowData=$(this).parent().find("input[type='text']").prop("value");
		
		if(nowData<2){
			return false;
		}
		$(this).parent().find("input[type='text']").prop("value",parseInt(nowData)-1);
	});
	
	
	$("#mianCont").delegate(".add",'click',function(){
	
		var nowData=$(this).parent().find("input[type='text']").prop("value");	
		$(this).parent().find("input[type='text']").prop("value",parseInt(nowData)+1)
		
	});

	
	//首页弹框
	$("#mianCont").delegate(".selcetor",'click',function(){
		
		$(".alertBox").show()
	});
	
	
	/**-------------IE 兼容-----------------------------*/
	// 首页  默认选框样式设置
	$.each($("#mainList li .txt"), function(i,item) {
	
		if(i==0){
			$(this).css("background-color",'#ffa300')
		}
	});