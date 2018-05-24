



	
	//采购方案数据渲染
	var k_tmpl = document.getElementById('k_tempelate').innerHTML;

	// $.getJSON("./../mockData/compared.json",function(d){
	// 	console.log(d)
	
	// });

	$.getJSON("./../mockData/compared.json",function(item){
	
		document.getElementById('warp_content').innerHTML=doT.template(k_tmpl)(item);

	
	});
	
	
	
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