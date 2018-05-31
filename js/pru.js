/**
 * 数据筛选页
 */
window.onload = function() {
    //对比栏目cookie 存在数据
    if (getCookie("Contrast") != null) {
        ContrastFuc()
    }
}

// 筛选数据渲染
var j_warp = document.getElementById('j_warp').innerHTML;

// $.post("./../mockData/purchase.json", function(item) {

//     document.getElementById('content_warp').innerHTML = doT.template(j_warp)(item);

// }, "json");
$.get("./../mockData/purchase.json", function(item) {

    document.getElementById('content_warp').innerHTML = doT.template(j_warp)(item);

}, "json");

//悬停加入购物方案显示
$("#content_warp").delegate(".addSelect", "mouseenter", function() {

    $(this).find(".add_pri").show()
})
$("#Purchase").delegate("#content_warp li", "mouseleave", function() {

    $(this).find(".add_pri").hide()
})

var ContrastArr = [];


//加入对比
$("#content_warp").delegate(".addCompared input", "click", function() {
    var cks = $("#content_warp").find("input[type=checkbox]:checked");
    if (cks.length > 4) {
        addTips("对比栏已满")
        return false
    }
    var skuId = $(this).attr("data-sku") //物品sku
        //取消加入对比
    if ($(this).prop("checked") == false) {

        ContrastArr.remove($(this).attr("data-sku"))
        setCookie("Contrast", ContrastArr)
        ContrastFuc()

    } else {

        ContrastArr.push(skuId)
        setCookie("Contrast", ContrastArr)
        ContrastFuc()
    }




})

//对比栏目中删除
$("#contrast_warp").delegate(".cont_price a", "click", function() {
    $(this).attr("data-sku")

    addP()
})

//对比栏目数据渲染
function addP() {
    var j_contrast = document.getElementById('j_Contrast').innerHTML;

    $.getJSON("./../mockData/text.json", { "data": getCookie("Contrast") },
        function(item) {
            document.getElementById('contrast_warp').innerHTML = doT.template(j_contrast)(item);
        });
}
//数据对比
function ContrastFuc(data) {
    data == undefined ? data = getCookie("Contrast").split(',') : data = data;
    if (data[0] !== '') {

        $(".contrast").fadeIn()
    }
    if (data.length < 2) {
        addP()
        $(".operat a").css("pointer-events", "none");

    } else {
        addP()
        $(".operat a").css("pointer-events", "link");
    }

    //页面相同数据默认加入选中
    var skuAdd = $("#content_warp").find("input[type=checkbox]");
    for (var i = 0; i < $(skuAdd).length; i++) {
        var elment = $(skuAdd)[i]
        if ($.inArray($(elment).attr("data-sku"), data) != -1) {

            $(elment).prop("checked", true)
        }

    }


}

//清空对比栏
$(".contrast").delegate(".clear_cont", "click", function() {

    delCookie("Contrast")
    ContrastArr = [];
    $(".contrast").fadeOut()

})


//对比栏关闭按钮
$(".contrast .cont_head i").click(function() {

    $(".contrast").hide()

})

//加入购物方案
$("#content_warp").delegate(".add_pri ul a", "click", function() {
    if (getCookie("pid") == null) {
        alert("登陆")
        return false
    }
    var typeId = $(this).attr("data-typid") //购物方案Id
    var skuId = $(this).parent().attr("data-sku") //物品sku

    $.getJSON("./../mockData/purchase.json", { "sku": skuId, "typeId": typeId },

        function(item) {



        });

})


//拓展数组去重复
Array.prototype.clearRepetition = function() {    this.sort();    var result = [this[0]];    for (var i = 1; i < this.length; i++) {      if (this[i] !== result[result.length - 1]) {        result.push(this[i]);      }    }    return result;  }
    // 拓展数组删除
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}