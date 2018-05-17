
	//测试数据
	var sourDate=[]
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
		"pic_value":2
		
		
	},
	{
		"pic_title":"Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
		"pic_jdPrice":"5220.00",
		"pic_userPrice":"4900.00",
		"pic_img":"img/text.jpg",
		"pic_value":3
		
		
	},
	{
		"pic_title":"Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
		"pic_jdPrice":"5220.00",
		"pic_userPrice":"4900.00",
		"pic_img":"img/text.jpg",
		"pic_value":4
		
		
	},
	{
		"pic_title":"Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
		"pic_jdPrice":"5220.00",
		"pic_userPrice":"4900.00",
		"pic_img":"img/text.jpg",
		"pic_value":5
		
		
	},
	{
		"pic_title":"Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
		"pic_jdPrice":"5220.00",
		"pic_userPrice":"4900.00",
		"pic_img":"img/text.jpg",
		"pic_value":6
		
		
	},
	{
		"pic_title":"Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
		"pic_jdPrice":"5220.00",
		"pic_userPrice":"4900.00",
		"pic_img":"img/text.jpg",
		"pic_value":7
		
		
	}]
}
	var leftDate2={

	"picname":"采购方案二",
	"isLive":false,
	"info":[
	{
		
		"pic_title":"Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
		"pic_jdPrice":"5220.00",
		"pic_userPrice":"4900.00",
		"pic_img":"img/text.jpg",
		"pic_value":4
		
		
	},
	
	{
		"pic_title":"Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
		"pic_jdPrice":"5220.00",
		"pic_userPrice":"4900.00",
		"pic_img":"img/text.jpg",
		"pic_value":3
		
		
	}]
}
	

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
				
				document.getElementById('mianCont').innerHTML=doT.template(tmpl)(leftDate2);
			break;
			case 3:
				runBg(this)
				document.getElementById('mianCont').innerHTML=doT.template(tmpl)(sourDate);
			break;
			
		
		}
	
	
	
	});
	function runBg(th){
		
	setTimeout(function(){
			$(".Jd_footer").fadeIn()
	},100)
	
		$(".isLogoing a").removeClass("activeYellow")
	 	$(th).addClass("activeYellow")
		$(".leftSelct .bg").show()
		$(".leftContent").animate({"width":"360px"})
		$(".isLogoing").animate({"left":"360px"})
	}
	$(".leftSelct .bg").click(function(){	
		$(".leftSelct .bg").hide()
		$(".Jd_footer").hide()
		$(".leftContent").animate({"width":"0px"})
		$(".leftSelct div").animate({"left":"0px"})
	});
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
