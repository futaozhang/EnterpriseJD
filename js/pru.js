
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
