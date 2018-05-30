//测试数据
var sourDate = {

}

//用户名
$("#userName").text(getCookie("Contrast"))

//左侧按钮判断

//var leftTmp = document.getElementById('leftTmp').innerHTML;
var leftTmp = doT.template($("#leftTmp").text());
// 左侧按钮数据请求
$.getJSON("./../mockData/isloading.json", { "userId": 11 },


    function(item) {
        var add_pri = '';
        //数据渲染
        $("#left_w").html(leftTmp(item));
        //document.getElementById('left_w').innerHTML = doT.template(leftTmp)(item);
        for (var i = 0; i < item.list.length; i++) {

            add_pri += "<a href='javascript:;' data-typId=" + item.list[i].typeId + "><li class=" + 'jdAdd_' + [i] + ">" + item.list[i].typeName + "</li></a>"

        }
        var addp = "<a href='javascript:;'><li class='addPro'>+</li></a>"
            //购物方案延迟渲染
        setTimeout(function() {

            $(".add_pri ul").append(function(n) {
                if (item.list.length >= 3) {
                    return add_pri
                } else {

                    return add_pri + addp
                }

            })

        }, 300)



    })


//左侧数据切换

// var interText = doT.template($("#j_tmpl").text());
var interText = document.getElementById('j_tmpl').innerHTML;

$("#leftsider").delegate(".isLogoing a", "click", function(obj) {
        var that = this
        var sum = 0;
        var num = 0;
        //是否为新添加
        if ($(this).attr("data-src") == 3) {
            addProgram()
            return false
        }

        // 切换底部动画函数
        runBg(this)

        $.getJSON("./../mockData/leftData.json", { "userId": 11, "typeId": $(this).attr("data-src") },

            function(item) {

                // $("#mianCont").html(interText(item));
                document.getElementById('mianCont').innerHTML = doT.template(interText)(item);
                $.each(item.info, function(index, infoLIst) {
                    var picur = infoLIst.pic_userPrice * infoLIst.pic_value

                    sum += parseInt(picur)
                    num += parseInt(infoLIst.pic_value)
                })

                $("#number").text(num)
                $("#price").text(sum.toFixed(2))

            })



    })
    //新添加方案

function addProgram() {
    var str = '<a href="javascript:;" data-src="2-1" class="addProgram"> 自主采购方案</a>'

    $(".isLogoing ").append(str)
    var interTextd = document.getElementById('j_tmpl').innerHTML;
    document.getElementById('mianCont').innerHTML = doT.template(interTextd)(sourDate);

    if ($(".isLogoing .addProgram").length > 2) {
        $(".addProjiect").remove()
    }
    $(".leftHead .text i").click();

    runBg(this)

}

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

//加入方案提示
function addTips(text) {
    $(".tips span").text(text)
    $(".tips").show()
    setTimeout(function() {
        $(".tips").fadeOut(800);
    }, 1200)

}

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
// function delCookie(name) {   
//     var exp = new Date();   

//     exp.setTime(exp.getTime() - 1);   
//     var cval = getCookie(name);   

//     if (cval != null) {
//         document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
//     }; 

// }
//数组内相加
Array.prototype.sum = function() {
    var result = 0;
    for (var i = 0; i < this.length; i++) {
        result += this[i];
    }
    return result;
};