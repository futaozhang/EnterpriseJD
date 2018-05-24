
$(".contrast .cont_head i").click(function(){

	$(".contrast").hide()

})
$("#content_warp").delegate(".addSelect","mouseenter",function(){
	
	$(this).find(".add_pri").show()
})
$("#Purchase").delegate("#content_warp li","mouseleave",function(){
	
	$(this).find(".add_pri").hide()
})
//加入对比

$("#content_warp").delegate(".addCompared input","change",function(){
	
	$(".contrast").show()
	
})

// 数据渲染
var j_warp = document.getElementById('j_warp').innerHTML;

$.getJSON("./../mockData/purchase.json",function(item){
	
	document.getElementById('content_warp').innerHTML=doT.template(j_warp)(item);

});
 

