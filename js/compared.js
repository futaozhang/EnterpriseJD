


var compandDate=[
		{
			"id":"一",
			"info":[
				{"id":11},
				{"id":12}
			]
		},
		{
			"id":"二",
			"info":[
				{"id":21},
				{"id":23},
				{"id":23}
			]
		},
		{
			"id":"三",
			"info":[
				{"id":21},
				{"id":23},
				{"id":23}
			]
		},
		{
			"id":3,
			"info":[
				{"id":31},
				{"id":32}
			]
		}
		
		
		
		
	]
	
	
	var k_tmpl = document.getElementById('k_tempelate').innerHTML;
	
	document.getElementById('warp_content').innerHTML=doT.template(k_tmpl)(compandDate);

		$("#Compared").delegate(".ul_num .reduce",'click',function(){
		
		var nowData=$(this).parent().find("input[type='text']").prop("value");
		
		if(nowData<2){
			return false;
		}
		$(this).parent().find("input[type='text']").prop("value",parseInt(nowData)-1);
	});
	
	
	$("#Compared").delegate(".add",'click',function(){
	
		var nowData=$(this).parent().find("input[type='text']").prop("value");	
		$(this).parent().find("input[type='text']").prop("value",parseInt(nowData)+1)
		
	});