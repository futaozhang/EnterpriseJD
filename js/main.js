//测试数据
var sourDate = {}
var LeftDateList;


var baseUrl = "http://192.168.1.247:8080"

//用户名
$("#userName").text(getCookie("") == null ? "游客 " : (getCookie("")))

//左侧按钮判断



// 左侧按钮数据请求
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}
$.ajaxSetup({ cache: false });

function leftBut() {
    var leftTmp = document.getElementById('leftTmp').innerHTML;
    $.ajax({
            url: baseUrl + "/procurement/getplist",
            data: { "userid": 1, "status": 1, },
            cache: false,
            success: function(item) {
                LeftDateList = item;
                var add_pri = '';
                //数据渲染

                document.getElementById('left_w').innerHTML = doT.template(leftTmp)(item);

                for (var i = 0; i < item.length; i++) {
                    add_pri += "<a href='javascript:;' data-typId=" + item[i].id + "><li class=" + 'jdAdd_' + [i] + ">" + item[i].name + "</li></a>"
                }

                var addp = "<a href='javascript:;'><li class='addPro'>+</li></a>"
                    //增加购物方案延迟渲染
                setTimeout(function() {
                    $(".add_pri ul").html(function(n) {
                        if (item.length >= 3) {
                            return add_pri
                        } else {
                            return add_pri + addp
                        }

                    })

                }, 300)


            }
        }

    );


}
leftBut();

//左侧数据切换

// var interText = doT.template($("#j_tmpl").text());

$("#leftsider").delegate(".isLogoing a", "click", function(obj) {
    var that = this

    //是否为新添加
    if ($(this).attr("data-src") == 3) {
        addProgram()

        return false
    } else if ($(this).attr("data-src") != 'undefined') {
        runBg(this)
    }

    // 切换底部动画函数

    //左侧数据更新
    leftList($(this).attr("data-src"))
})

// 左侧数据

function leftList(id, fun) {
    var sum = 0;
    var num = 0;

    var interText = document.getElementById('j_tmpl').innerHTML;
    $.getJSON("http://192.168.1.247:8080/procurement/getp", { "id": id, "status": 1 },

        function(item) {
            // $("#mianCont").html(interText(item));
            //  var priceList;
            document.getElementById('mianCont').innerHTML = doT.template(interText)(item[0]);

            if (fun != undefined) {

                setTimeout(fun, 10)
            }
            $.each(item[0].goods_list, function(index, infoLIst) {
                //数量计算

                num += parseInt(infoLIst.goodsnum)
                    //价格计算
                $.each(infoLIst.goodsdetail, function(j, item) {
                    var picur = item.eprice * infoLIst.goodsnum
                    sum += parseInt(picur)
                })
            })

            $("#number").text(num)
            $("#price").text(sum.toFixed(2))

        })
}
//新添加方案

function addProgram() {
    var str = '<a href="javascript:;" data-src="2-1" class="addProgram">自主采购方案</a>'
    $(".isLogoing ").append(str)
    var interTextd = document.getElementById('j_tmpl').innerHTML;
    document.getElementById('mianCont').innerHTML = doT.template(interTextd)(sourDate);

    if ($(".isLogoing .addProgram").length > 2) {
        $(".addProjiect").remove()
    }
    $(".leftHead .text i").click();
    // $("#jd_3").prop("value", "自主采购方案")
    //  runBg(this)
    newAddColect()


}

//新增采购方案
function newAddColect(id, json) {

    //getCookie("userId")
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: baseUrl + "/procurement/addp",
        data: JSON.stringify({ "good_list": [], "status": 1, "uid": 1, "name": "新建采购" }),
        cache: false,
        success: function(item) {
            leftBut()


        }
    })


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
    closeOpen()
})

function closeOpen() {
    $(".leftSelct .bg").hide()
    $(".Jd_footer").hide()
    $(".leftContent").animate({ "width": "0px" })
    $(".leftSelct div").animate({ "left": "0px" })
}


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

//全选删除
$("#mianCont").delegate(".l_top button", "click", function() {
    var deleate = [];
    var typeId = $(this).attr("data-typeid")
    if ($("#all").prop("checked") != true) {
        $.each($("#leftDate").find("input[type='checkbox']"), function(i, item) {
            if ($(this).prop("checked") != false) {

                deleate.push($(this).parent().parent().find("button").attr('data-sku'))

                $(this).parent().parent().remove();

            }
        })

    } else {
        deleate = []
    }

    removeList(typeId, deleate.join("-"))

});

function removeList(typeId, deleate) {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/procurement/delete",
        data: { "procurementId": typeId, "pitemlist": deleate, },
        cache: false,
        success: function(item) {
            leftBut()
            closeOpen()
        }
    })
}

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
    changListdataL($(this))

});


$("#mianCont").delegate(".add", 'click', function() {

    var nowData = $(this).parent().find("input[type='text']").prop("value");
    $(this).parent().find("input[type='text']").prop("value", parseInt(++nowData))
    var sum = parseInt($("#price").text()) +
        parseInt($(this).parent().parent().find("strong").text().substring(1))
    $("#price").text(parseInt(sum).toFixed(2))
    var price = $("#number").text()
    $("#number").text(parseInt(++price))
    changListdataL($(this))
});

//方案更名
$("#mianCont").delegate(".changName a", "click", function() {
    //方案Id
    //方案名称
    var type = $(this).attr("data-type")
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: baseUrl + "/procurement/updatep",
        data: JSON.stringify({ "id": type, "name": $(this).siblings("input").val() }),
        cache: false,
        success: function(item) {
            leftList(type, "close()");
            leftBut();
            $(".changName").hide();


        }
    })

});
//开启遮罩
function close() {
    setTimeout(function() {
        $(".Jd_footer").fadeIn();
        $(".leftSelct .bg").show();
        $(".isLogoing").animate({ "left": "360px" });
    }, 4)

}
//名称修改展示
$("#mianCont").delegate(".text .iconfont", "click", function() {
    $(".changName").show()
});
//左侧收藏
$("#mianCont").delegate(".collection", "click", function() {
    enshrine($(this).attr("data-type"))
    closeOpen()
});

//单个删除
$("#mianCont").delegate("#leftDate li .ra_de", "click", function() {

    removePland($(this).attr("data-type"), $(this).attr("data-sku"), $(this))
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
 * 左侧收藏收藏接口
 *typeId 方案
 *
 */
function enshrine(typeId) {
    var msg;

    $.ajax({
        type: "POST",
        url: baseUrl + "/procurement/updatep",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ "id": parseInt(typeId), "status": 2, }),
        success: function(jsonResult) {
            setTimeout(leftBut(), 200)
        }
    })
    return msg

}
//单个数据删除
function removePland(typeId, skuId, obj) {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/procurement/delete",
        data: { "procurementId": typeId, "pitemlist": skuId },
        cache: false,
        success: function(item) {

            leftList(typeId, "close()"); //单个内容数据更新
            leftBut(); //数据更新
            $(obj).parent().parent().remove(); //物理删除
        }
    })
}

//异步修改数据
function changListdataL(obj) {

    var value = $(obj).parent().find("input[type='text']").val();
    var skuid = $(obj).parent().siblings("button").attr("data-sku"); //id
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/procurementItem/updatepitem",
        data: { "id": skuid, "goodsnum": value },
        cache: true,
        success: function(item) {
            leftList()
        }
    })
}


//更新采购方案


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