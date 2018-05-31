/**
 * 数据筛选页
 */
window.onload = function() {
    //对比栏目cookie 存在数据

    if (getCookie("Contrast") != null) {
        ContrastFuc()
    }
}

// 筛选后数据渲染
var j_warp = document.getElementById('j_warp').innerHTML;
getCookie("selcet") //cookie
$.getJSON(baseUrl + "/goods/gettoplist", {}, function(item) {
    document.getElementById('content_warp').innerHTML = doT.template(j_warp)(item);

});


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

    if (getCookie("Contrast") != null) {
        ContrastArr = getCookie("Contrast").split(',')
    } else {
        setCookie("Contrast", [])
    }
    var skuId = $(this).attr("data-sku")

    if ($(this).prop("checked") == false) {

        ContrastArr.remove($(this).attr("data-sku"))
        setCookie("Contrast", ContrastArr)
        ContrastFuc()

    } else {

        if (cks.length > 4 || ContrastArr.length > 4) {
            addTips("对比栏已满")
            return false
        }
        ContrastArr.push(skuId)
        setCookie("Contrast", ContrastArr)

        ContrastFuc()
    }


})

//对比栏目中删除
$("#contrast_warp").delegate(".cont_price a", "click", function() {
    var data = getCookie("Contrast").split(',')
    data.remove($(this).attr("data-sku"))
    setCookie("Contrast", data)
    ContrastFuc()
})

//清空对比栏
$(".contrast").delegate(".clear_cont", "click", function() {
    delCookie("Contrast")
    ContrastArr = [];
    $("#content_warp").find("input[type=checkbox]").prop("checked", false)
    $(".contrast").fadeOut()

})

//对比栏目数据渲染
function addP() {
    var j_contrast = document.getElementById('j_Contrast').innerHTML;

    $.getJSON(baseUrl + "/goods/compare", { "data": getCookie("Contrast") },
        function(item) {
            document.getElementById('contrast_warp').innerHTML = doT.template(j_contrast)(item);
        });
}

//数据对比
function ContrastFuc() {
    $(".contrast").fadeIn()
    addP()
    var data = getCookie("Contrast").split(',')
        //全局置空
    $("#content_warp").find("input[type=checkbox]").prop("checked", false)
        //页面相同数据默认加入选中
    var skuAdd = $("#content_warp").find("input[type=checkbox]");

    for (var i = 0; i < $(skuAdd).length; i++) {
        var elment = $(skuAdd)[i]
        if ($.inArray($(elment).attr("data-sku"), data) != -1) {
            $(elment).prop("checked", true)
        }

    }

}



//对比栏关闭按钮
$(".contrast .cont_head i").click(function() {
    $(".contrast").hide()

})


//加入购物方案
$("#content_warp").delegate(".add_pri ul a", "click", function() {
    if (getCookie("userId") == null) {
        login()
        return false
    }
    var typeId = $(this).attr("data-typid") //购物方案Id
    var skuId = $(this).parent().attr("data-sku") //物品sku
    getCookie("Type") //选择类  日常-技术
        //加入采购方案
    if (addPlan(typeId, skuId, getCookie("Type")) != "") {

    }

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
    //ie
    //写cookies 

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies 
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}
//删除cookies
function delCookie(name) {   
    var exp = new Date();   

    exp.setTime(exp.getTime() - 1);   
    var cval = getCookie(name);   

    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
    }; 

}