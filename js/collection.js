/**
 * 收藏
 */


function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串   
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//收藏
$("#w_collection").delegate(".left_warp a", "click",
    function(obj) {
        changec($(this).attr("data-ju"))
    })

//左侧排列切换
function changec(changId) {

    $("#w_collection .left_warp a").removeClass("actvieLeft")
    $("#w_collection .right_warp").css("display", "none")
    $("#w_collection .left_warp .person_" + parseInt(changId) + "").addClass("actvieLeft")
    $("#w_collection .person_" + parseInt(changId) + "").css("display", "block")

    priceNunCollect()
}



//收藏数据
function Collection() {


    $.getJSON('http://192.168.1.247:8080/procurement/updatep?userid=1&status=1', function(item) {


        var j_persond = doT.template($("#j_person").text());
        $("#w_collection").html(j_persond(item));

        $("#w_collection .addCollection").remove();
        $("#w_collection .right_but .pru").remove();
        changec(0)
        setTimeout(function() {
            priceNunCollect()
        }, 5)


    })

}
//全选

//
$("#w_collection").delegate("thead input[type='checkbox']", "click", function() {
    var that = this
    setTimeout(function() {
        var cur = $(that).parent().parent().parent().parent()
        if ($(that).prop("checked") == true) {

            $(cur).find(".tb_check input[type='checkbox']").prop("checked", true);
        } else {

            $(cur).find(".tb_check input[type='checkbox']").prop("checked", false);
        }
    }, 4)
})

//单选判断


$("#w_collection").delegate(".tb_check input[type='checkbox']", "click", function() {
    var fatherNode = $(this).parent().parent().parent().parent();
    var childeNode = $(fatherNode).find("tbody input[type='checkbox']");
    $.each(childeNode, function(i, item) {
        if ($(item).prop("checked") == false) {

            $(fatherNode).find("thead input[type='checkbox']").prop("checked", false);

            return false;

        } else {
            $(fatherNode).find("thead input[type='checkbox']").prop("checked", true);
        }
    });

});
//加减

$("#w_collection").delegate(".reduce", 'click', function(dom) {

    var nowData = $(this).parent().find("input[type='text']").prop("value");

    if (nowData < 2) {
        return false;
    }
    var fatherNode = $(this).parent().parent()
    var thisNum = $(this).parent().find("input[type='text']")
    $(thisNum).prop("value", parseInt(nowData) - 1);
    var price = $(fatherNode).siblings().find(".jd_price").text().substring(1)

});

//加

$("#w_collection").delegate(".add", 'click', function() {

    var nowData = $(this).parent().find("input[type='text']").prop("value");

    $(this).parent().find("input[type='text']").prop("value", parseInt(++nowData))


});

// 价格计算
function priceNunCollect() {

    $.each($("#w_collection .right_warp"), function() {

        if ($(this).css("display") == "block") {
            var jdprice = [];
            var eprice = [];
            $.each($(this).find(".t_num input"), function(item) {
                jdprice.push($(this).val() * $(this).attr("data-price"))
                eprice.push($(this).val() * $(this).attr("data-eprice"))

            })
            $(this).find(".price .slive").text("京东价：￥" + jdprice.sum().toFixed(2));
            $(this).find(".price .jdPrice").text("￥" + eprice.sum().toFixed(2))
        }
    })
}