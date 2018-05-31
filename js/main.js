//测试数据
var sourDate = {

}

var baseUrl = "http://192.168.1.247:8080"

//用户名
$("#userName").text(getCookie("") == null ? "游客 " : (getCookie("")))

//左侧按钮判断

var leftTmp = document.getElementById('leftTmp').innerHTML;



// 左侧按钮数据请求

$.getJSON("http://192.168.1.247:8080/procurement/getplist", { "userid": 1, "status": 1 },

    function(item) {
        var add_pri = '';
        //数据渲染


        document.getElementById('left_w').innerHTML = doT.template(leftTmp)(item);
        for (var i = 0; i < item.length; i++) {

            add_pri += "<a href='javascript:;' data-typId=" + item[i].id + "><li class=" + 'jdAdd_' + [i] + ">" + item[i].name + "</li></a>"

        }
        var addp = "<a href='javascript:;'><li class='addPro'>+</li></a>"
            //购物方案延迟渲染
        setTimeout(function() {

            $(".add_pri ul").append(function(n) {
                if (item.length >= 3) {
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

    //是否为新添加
    if ($(this).attr("data-src") == 3) {
        addProgram()
        return false
    }
    // 切换底部动画函数
    runBg(this)
        //左侧数据更新
    leftList($(this).attr("data-src"))
})

// 左侧数据

function leftList(id) {
    var sum = 0;
    var num = 0;


    $.getJSON("http://192.168.1.247:8080/procurement/getplist", { "userId": 1, "id": parseInt(id) },

        function(item) {
            // $("#mianCont").html(interText(item));

            document.getElementById('mianCont').innerHTML = doT.template(interText)(item[0]);
            $.each(item[0].goods_list, function(index, infoLIst) {
                //价格计算
                var picur = infoLIst.pic_userPrice * infoLIst.pic_value

                sum += parseInt(picur)
                num += parseInt(infoLIst.pic_value)
            })

            $("#number").text(num)
            $("#price").text(sum.toFixed(2))

        })
}
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



//左侧收藏
$("#mianCont").delegate(".collection", "click", function() {
    if (enshrine($(this).attr("data-type")) != "") {
        //更新左侧数据
        leftList($(this).attr("data-src"))
    }

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
/*****************API************************/
/*
 *收藏接口
 *typeId 方案
 *
 */
function enshrine(typeId) {
    var mesg;
    //是否登陆
    if (getCookie("userId") == null) {

        login()
    }
    $.post("/procurement/updatep", {}, function() {
        mesg
    }, json)
    return mesg
}
/*
 *加入物品接口
 *skuId 物品
 *typId 方案
 *type 日常生活
 */
function addPlan(typeId, skuId, type) {

    var mesg;
    if (getCookie("userId") == null) {
        login()
    }
    $.post("/procurement/updatep", {}, function() {
        mesg
    }, json)
    return mesg
}
/*
 *删除物品
 *skuId 物品  可为空 
 *typId 方案夹or收藏夹
 */
function removePlan(typeId, skuId) {
    var mesg;
    if (getCookie("userId") == null) {
        login()
    }
    $.post("/procurement/updatep", {}, function() {
        mesg
    }, json)
    return mesg
}

//新增采购方案
function newAddColect(id, json) {

    getCookie("userId")

    $.post(baseUrl + "/procurement/addp", {}, function() {

    }, json)

}
//更新采购方案
function updataColect(id, json) {

    $.post(baseUrl + "/procurement/updatep", {}, function() {

    }, json)

}

//登陆调用
function login() {
    seajs.use('jdf/1.0.0/unit/login/1.0.0/login.js', function(login) {
        login({
            // firstCheck: false,
            modal: true, //false跳转,true显示登录注册弹层
            complete: function() {
                $.post(baseUrl + "/appuser/adduser", {}, function() {

                    setCookie("userId")

                }, json)
            }
        })
    })
}