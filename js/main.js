//测试数据
var sourDate = {
    "picname": "采购方案四"
}




//左侧按钮判断



var leftTmp = doT.template($("#leftTmp").text());
// 左侧按钮数据请求
$.getJSON("./../mockData/isloading.json", { "userId": 11 },

    function(item) {

        $("#left_w").html(leftTmp(item));


    })


//左侧数据切换

var interText = doT.template($("#j_tmpl").text());

$("#leftsider").delegate(".isLogoing a", "click", function() {
    var that = this
    var sum = 0;
    var num = 0;
    // 切换底部动画函数
    runBg(this)

    $.getJSON("./../mockData/leftData.json", { "userId": 11, "typeId": $(this).attr("data-src") },

        function(item) {

            $("#mianCont").html(interText(item));
            $.each(item.info, function(index, infoLIst) {
                var picur = infoLIst.pic_userPrice * infoLIst.pic_value

                sum += parseInt(picur)
                num += parseInt(infoLIst.pic_value)
            })

            $("#number").text(num)
            $("#price").text(sum.toFixed(2))

        })



})


// 左侧弹出
function runBg(th) {


    setTimeout(function() {
        $(".Jd_footer").fadeIn()
    }, 300)
    $(".isLogoing a").removeClass("activeYellow")
    $(th).addClass("activeYellow")
    $(".leftSelct .bg").show()
    $(".leftContent").animate({ "width": "360px" })
    $(".isLogoing").animate({ "left": "360px" })
}
// 关闭左侧
$("#leftsider").delegate(".bg", "click", function() {
    $(".leftSelct .bg").hide()
    $(".Jd_footer").hide()
    $(".leftContent").animate({ "width": "0px" })
    $(".leftSelct div").animate({ "left": "0px" })
})



//全选
$("#mianCont").delegate("#all", "click", function() {

    setTimeout(function() {

        if ($("#all").prop("checked") == true) {

            $(".contents").find("input[type='checkbox']").prop("checked", true);
        } else {

            $(".contents").find("input[type='checkbox']").prop("checked", false);

        }
    }, 4)

});
//所有列表
$("#mianCont").delegate(".checkBox input[type='checkbox']", "click", function() {
    var current = 0;
    var that = this
    var checkbox = $("#leftDate input[type='checkbox']")

    $.each(checkbox, function(i, item) {

        if ($(item).prop("checked") == false) {

            $(".l_top").find("input[type='checkbox']").prop("checked", false)

            return false;
        } else {

            $(".l_top").find("input[type='checkbox']").prop("checked", true)

        }

    });




})

// 价格计算


//加减
$("#mianCont").delegate(".input_num .reduce", 'click', function(dom) {

    var nowData = $(this).parent().find("input[type='text']").prop("value");

    if (nowData < 2) {
        return false;
    }
    $(this).parent().find("input[type='text']").prop("value", parseInt(nowData) - 1);
    var redues = $("#price").text() - $(this).parent().parent().find("strong").text().substring(1)
    $("#price").text(parseInt(redues).toFixed(2))
    var price = $("#number").text()
    $("#number").text(parseInt(--price))
});

$("#mianCont").delegate(".add", 'click', function() {

    var nowData = $(this).parent().find("input[type='text']").prop("value");

    $(this).parent().find("input[type='text']").prop("value", parseInt(++nowData))

    var sum = parseInt($("#price").text()) +
        parseInt($(this).parent().parent().find("strong").text().substring(1))
    $("#price").text(parseInt(sum).toFixed(2))
    var price = $("#number").text()
    $("#number").text(parseInt(++price))
});


$("#mianCont").delegate(".noCheck", "click", function() {
    $(this).hide()
    $(this).parent().find('.isCheck').css("display", "block")
});

// url  参数
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