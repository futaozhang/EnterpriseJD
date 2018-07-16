var sourDate = { "id": -1 }
    //未登录用户数据
    //模拟用户Id
    //setCookie("userId", "2")


//var baseUrl = "http://localhost:8080"
var baseUrl = "http://pre-admin.pcshop.jd.com"
    //var baseUrl = "http://192.168.1.247:8080"


//用户名
var userName = "游客"


//存储是否被收藏的采购
var judgment = [];

$.ajax({
    type: "POST",
    contentType: "application/json",
    url: baseUrl + "/scene/list",
    timeout: 5000,
    cache: false,
    success: function(item) {},
    error: function(request, status, error) {
        if (error == 'timeout' || error == "null") {
            // alert("服务响应超时")
        }
        if (status == 408 || status == 500) {
            alert('服务数据出错')
        }
    }
})



// 左侧按钮数据请求

$.ajaxSetup({ cache: false });
leftBut();

function leftBut(type) {

    var leftTmp = document.getElementById('leftTmp').innerHTML;

    if (getCookie("userId") == null || getCookie("userId") == "") {

        document.getElementById('left_w').innerHTML = doT.template(leftTmp)(sourDate);

        setTimeout(function() {
            $(".add_pri ul").html(function(n) {
                return "<a href='javascript:;'><li class='addPro'>+</li></a>"
            })

        }, 100)

        return false;
    }

    $.ajax({
        url: baseUrl + "/procurement/getplist",
        data: { "userid": getCookie("userId"), "status": 1 },
        cache: false,
        success: function(item) {
            // sourDate = item;
            //数据渲染
            addpr_li(item)
            document.getElementById('left_w').innerHTML = doT.template(leftTmp)(item);
            if (type == 1) {
                $(".Jd_footer").fadeIn();
                $(".leftSelct .bg").show();
                $(".isLogoing").css("left", "360px")

            }
            return true
        }
    });


}



function addpr_li(item) {
    var add_pri = '';
    for (var i = 0; i < item.length; i++) {
        add_pri += "<a href='javascript:;' data-typId=" + item[i].id + "><li class=" + 'jdAdd_' + [i] + ">" + item[i].name + "</li></a>"
    }

    var addp = "<a href='javascript:;'><li class='addPro'>+</li></a>"
        //增加购物方案延迟渲染
    if (item.length > 3) {
        $(".isLogoing").css("top", "30%");
    } else if (item.length > 5) {
        $(".isLogoing").css("top", "25%");
    }
    //setTimeout(function() {

    $(".add_pri ul").html(function(n) {
        if (item.length > 5) {
            return add_pri

        } else if (item.length == 0) {

            return addp
        } else if (item.length < 5) {
            return add_pri + addp
        }

    })

    //}, 300)
}

//左侧数据切换

// var interText = doT.template($("#j_tmpl").text());

$("#leftsider").delegate(".isLogoing a", "click", function(obj) {
    var that = this
    $(".selectorFile").hide()
        //是否为新添加
    if ($(this).attr("data-src") == 3) {
        addProgram()

        return false

    } else if ($(this).attr("data-src") != undefined) {

        runBg(this)
    }
    //左侧数据更新
    leftList($(this).attr("data-src"))
})

// 左侧数据

function leftList(id, fun) {
    var sum = [];
    var num = 0;
    var jdsum = 0;
    var picur = 0;
    var interText = document.getElementById('j_tmpl').innerHTML;
    $.getJSON(baseUrl + "/procurement/getp", { "id": id, "status": 1 },

        function(item) {
            document.getElementById('mianCont').innerHTML = doT.template(interText)(item[0]);

            $.each(item[0].goods_list, function(index, infoLIst) {
                //数量计算

                num += parseFloat(infoLIst.goodsnum)

                //价格计算
                $.each(infoLIst.goodsdetail, function(j, item) {

                    picur = item.eprice * infoLIst.goodsnum

                    if (item.eprice == 0) {

                        sum.push(item.jdprice * infoLIst.goodsnum)

                    } else {
                        sum.push(item.eprice * infoLIst.goodsnum)

                    }
                })
            })

            $("#number").text(num)
            $("#price").text(sum.sum().toFixed(2))

        });
}

//新添加方案

function addProgram() {
    $(".Jd_footer").hide()
    if (getCookie("userId") == null || getCookie("userId") == "") {
        // alert("请先登录")
        login()
        return false
    };
    var str = '<a href="javascript:;" data-src="2-1" class="addProgram">新建采购方案</a>'
    $(".isLogoing ").append(str)

    var interTextd = document.getElementById('j_tmpl').innerHTML;
    document.getElementById('mianCont').innerHTML = doT.template(interTextd)(sourDate);

    if ($(".isLogoing .addProgram").length > 5) {
        $(".addProjiect").remove()
    }
    if ($("#mianCont").css("width") != "0px") {
        closeOpen()
    }

    newAddColect()
};


//新增采购方案
function newAddColect(id, json) {
    $(".Jd_footer").hide()
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: baseUrl + "/procurement/addp",
        data: JSON.stringify({ "good_list": [], "status": 1, "uid": getCookie("userId"), "name": "新建采购" }),
        cache: false,
        success: function(item) {
            leftBut()
            try {
                Purchase()
            } catch (error) {

            }
        }
    })


};

// 左侧弹出
function runBg(th) {

    setTimeout(function() {
        $(".Jd_footer").show()
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
    $(".selectorFile").hide()
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
    isCheckAdd(typeId, 1)
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/procurement/delete",
        data: { "procurementId": typeId, "pitemlist": deleate },
        cache: false,
        success: function(item) {

            leftList(typeId)
            leftBut()
            closeOpen();
            try {
                Purchase()
            } catch (error) {

            }
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


//加减
$("#mianCont").delegate(".input_num .reduce", 'click', function(dom) {
    var redues;
    var nowData = $(this).parent().find("input[type='text']").prop("value");

    if (nowData < 2) {
        return false;
    }
    leftList($(this).parent().siblings("button").attr("data-type"))
    $(this).parent().find("input[type='text']").prop("value", parseInt(nowData) - 1);

    if ($(this).parent().parent().find("strong").text().substring(1) == "") {

        redues = $("#price").text() - $(this).parent().parent().find(".jdPrice").text().substring(5)
    } else {
        redues = $("#price").text() - $(this).parent().parent().find("strong").text().substring(1)
    }

    $("#price").text(parseInt(redues).toFixed(2))

    var price = $("#number").text()

    $("#number").text(parseInt(--price))

    changListdataL($(this))

});


$("#mianCont").delegate(".add", 'click', function() {
    var sum;

    var nowData = $(this).parent().find("input[type='text']").prop("value");
    $(this).parent().find("input[type='text']").prop("value", parseInt(++nowData))
    console.log($(this).parent().parent().find(".jdPrice").text().substring(5))
    if ($(this).parent().parent().find("strong").text().substring(1) == "") {
        sum = parseInt($("#price").text()) +
            parseInt($(this).parent().parent().find(".jdPrice").text().substring(5))
    } else {
        sum = parseInt($("#price").text()) +
            parseInt($(this).parent().parent().find("strong").text().substring(1))
    }

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
            leftList(type);
            leftBut(1)

            $(".changName").hide();
            // close(type)


            try {

                Purchase()
            } catch (error) {

            }

        }
    })

});

//开启遮罩
function close(type) {

    setTimeout(function() {
        $(".Jd_footer").fadeIn();
        $(".leftSelct .bg").show();
        $(".isLogoing").animate({ "left": "360px" });
        $(".addProgram").each(function() {
            var that = this
            if (parseInt($(this).attr("data-src")) == parseInt(type)) {

                $(this).addClass("activeYellow")
            }
        })

    }, 405)

}

$("#left_w").delegate(".noLogoing", "click", function() {
    login()
});

//名称修改展示
$("#mianCont").delegate(".text .iconfont", "click", function() {
    $(".changName").show()
});

//左侧收藏
$("#mianCont").delegate(".nockeck", "click", function() {
    enshrine($(this).attr("data-type"), $(this).attr("data_p"))


});

$("#mianCont").delegate(".ischeck", "click", function() {
    addTips("已收藏该方案")
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
    }, 1400)

}

function loadings(text) {
    $(".tips span").text(text)
    $(".tips").show()

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

//

function delCookie(name) {   
    var exp = new Date();   

    exp.setTime(exp.getTime() - 1);   
    var cval = getCookie(name);   

    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
    }; 

}
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
 *typeId 方案POST 
 *
 *
 */
function enshrine(typeId, list) {
    isCheckAdd(typeId, 2)

    $.ajax({
        type: "POST",
        url: baseUrl + "/procurementBak/updatep",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ "id": parseInt(typeId) }),
        success: function(jsonResult) {
            setTimeout(leftBut(1), 40)
            leftList(typeId)
            close(typeId);
            try {
                //  runBg()
                cnshrine(typeId, list)
                Purchase();
            } catch (error) {

            }
        }
    });

}

function cnshrine(typeId, list) {

    isCheckAdd(typeId, 2)
    $.ajax({
        type: "POST",
        url: baseUrl + "/procurementBak/addp?pid=" + typeId,
        contentType: "application/json",
        dataType: "json",
        success: function(jsonResult) {

            setTimeout(leftBut(1), 40)
            addTips("已加入收藏方案")
                //runBg()
            try {
                if (list != undefined) {
                    Purchase()
                    moClick(typeId);
                    Collection();
                }
            } catch (error) {

            }
        }
    })

}

//修改是否被修改状态
function isCheckAdd(typeId, state) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: baseUrl + "/procurement/updatep",
        data: JSON.stringify({ "id": typeId, "collecttype": state }),
        cache: false,
        success: function(item) {}
    })

}
//单个数据删除
function removePland(typeId, skuId, obj) {

    isCheckAdd(typeId, 1)
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/procurement/delete",
        data: { "procurementId": typeId, "pitemlist": skuId },
        cache: false,
        success: function(item) {
            leftList(typeId);
            leftBut(1); //数据更新
            $(obj).parent().parent().remove(); //物理删除
            //close(typeId);
            try {
                Purchase()
            } catch (error) {

            }
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
            //   isCheckAdd(typeId, 1)
            try {
                Purchase()
            } catch (error) {

            }
        }
    })
}
//清除所有cookie
function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}

//登陆调用
function login() {
    seajs.use('jdf/1.0.0/unit/login/1.0.0/login.js', function(login) {
        login({
            // firstCheck: false,
            modal: true, //false跳转,true显示登录注册弹层
            complete: function() {

                $.post(baseUrl + "/appuser/adduser", { "pin": getCookie('pin') },

                    function(i) {
                        if (i.code == 200 || i.code == 304) {
                            setCookie("userId", i.userid);
                        } else if (i.code = 201) {
                            alert("验证失败请重新登录")
                            clearCookie();
                            set(function() { login() }, 300)
                        }
                    })
            }
        })
    })
};


function setCookie(name, value, time) {


    time == undefined ? time = 5 : time = time;
    //alert(time)
    var exp = new Date();
    exp.setTime(exp.getTime() + 8 * time * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

$("#mianCont").delegate(".shoping", "click", function() {
    var num = [];
    var id = [];
    var raObj = $(this).parent().siblings(".contents").find("li");
    $.each($(raObj), function() {
        num.push($(this).find(".input_num input").val())
        id.push($(this).find(".input_num input").attr("sku-id"))
    })

    shoppingCart(id.join(","), num.join(","))
});

//加入购物车 widsList物品id  numsList数量
function shoppingCart(widsList, numsList) {
    // wids = skuid1, skuid2, skuid3 & nums = 1, 1, 1

    if (widsList == "" || numsList == "") {
        addTips("当前无物品")
        return false;

    }

    var url = "https://cart.jd.com/cart/dynamic/reBuyForOrderCenter.action?wids=" + widsList + "&nums=" + numsList + "";
    window.open(url);
    addTips("加入购物车成功")


}

$("#mianCont").delegate(".export", "click", function() {
    $(".selectorFile").show()
    var that = this
    $("#execlDowload").attr("data-pid", $(this).attr("data-pid"))
    $("#imgDowload").text("前往方案夹下载图片")


});

$("#index #imgDowload").click(function() {
    window.location.href = "Person.html?id=1"
})

//导出采购方案
$("#execlDowload").click(function() {

    if ($(this).attr("data-w") != undefined) {
        //收藏
        window.open(baseUrl + "/procurementBakItem/export?pid=" + $(this).attr("data-pid") + "");
    } else {
        window.open(baseUrl + "/procurementItem/export?pid=" + $(this).attr("data-pid") + "");
    }
    addTips("导出采购方案成功")

})

// ie
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return -1; //不是ie浏览器
    }
}
if (IEVersion() == -1) {
    $("#imgDowload").text('图片下载');
} else {

}

function getCookieCores(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return null
};



$.ajax({
    type: "GET",

    url: baseUrl + "/homepageAd/list",
    cache: false,
    success: function(item) {
        var CollecImg;
        $.each(item, function(i, list) {

            switch (list.type) {
                case 1:
                    CollecImg = this
                    break;
                case 2:
                    var that = this
                    $(".w_head").prepend(function() { return "<img src=" + that.imageurl + ">" })
                    break;
                case 3:
                    var that = this
                    $(".headIndex").prepend(function() { return "<img src=" + that.imageurl + ">" })

                    break;
            }

        })

        $("body").prepend(function() {
            var html = '<div id="topImg">  <a href=' + CollecImg.url + '> <img  src=' + CollecImg.imageurl + '></a>' +
                '<i class="iconfont" onclick="closeTop(this)">&#xe606;</i></div>';
            if (CollecImg != "" || CollecImg != null) {

                return html
            }
        });

    }
})

function closeTop(obj) {
    $("#topImg").hide()

}

$("#userName").text(getCookie("unick") == null ? unescape(userName) : unescape((getCookie("unick"))))
$("body").delegate("#videos .iconfont", "click", function() {
    $("#videos").hide()
    document.cookie = "videoH=2";

})