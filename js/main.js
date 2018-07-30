var sourDate = { "id": -1 }
    //未登录用户数据

var baseUrl = "http://192.168.191.12:8088"
    //var baseUrl = "http://pcshop-api.jd.com"
    //var baseUrl = "//pre.pcshop.jd.com"

$("#imgDowload").hide()
    //用户名
var userName = "游客"

//存储是否被收藏的采购
var judgment = [];





// 左侧按钮数据请求

$.ajaxSetup({ cache: false });
leftBut();

function leftBut(type) {



    var leftTmp = document.getElementById('leftTmp').innerHTML;

    if (adduser() == false) {

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
        data: { "status": 1 },
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        cache: false,
        success: function(item) {
            // sourDate = item;
            //数据渲染
            document.getElementById('left_w').innerHTML = doT.template(leftTmp)(item);

            if (type == 1) {
                $(".Jd_footer").fadeIn();
                $(".leftSelct .bg").show();
                $(".isLogoing").css("left", "360px")
                $(".addProjiect ").show()
            }

            addpr_li(item)


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
    $(".isLogoing").css("top", "38%");
    //setTimeout(function() {

    $(".add_pri ul").html(function(n) {
        if (item.length >= 3) {
            return add_pri

        } else if (item.length == 0) {
            return addp

        } else if (item.length < 3) {

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
    $.ajax({
            type: "GET",
            xhrFields: {
                withCredentials: true
            },
            dataType: 'jsonp',
            crossDomain: true == !(document.all),
            data: { "id": id, "status": 1 },
            url: baseUrl + "/procurement/getp",

            success: function(item) {

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
                runBg()

            }
        })
        // $.getJSON(baseUrl + "/procurement/getp", { "id": id, "status": 1 },

    //     function(item) {
    //         document.getElementById('mianCont').innerHTML = doT.template(interText)(item[0]);

    //         $.each(item[0].goods_list, function(index, infoLIst) {
    //             //数量计算

    //             num += parseFloat(infoLIst.goodsnum)

    //             //价格计算
    //             $.each(infoLIst.goodsdetail, function(j, item) {

    //                 picur = item.eprice * infoLIst.goodsnum

    //                 if (item.eprice == 0) {

    //                     sum.push(item.jdprice * infoLIst.goodsnum)

    //                 } else {
    //                     sum.push(item.eprice * infoLIst.goodsnum)

    //                 }
    //             })
    //         })
    //         $("#number").text(num)
    //         $("#price").text(sum.sum().toFixed(2))
    //         runBg()

    //     });
}

//新添加方案

function addProgram() {
    $(".Jd_footer").hide()
    if (adduser() == false) {
        // alert("请先登录")
        login();
        return false;
    };
    var str = '<a href="javascript:;" data-src="2-1" class="addProgram">新建采购方案</a>'
    $(".isLogoing ").append(str)

    var interTextd = document.getElementById('j_tmpl').innerHTML;
    document.getElementById('mianCont').innerHTML = doT.template(interTextd)(sourDate);

    if ($(".isLogoing .addProgram").length >= 3) {
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
    $(".addProjiect ").hide()
    var names = encodeURI("新建采购")
    $.ajax({
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },

        url: baseUrl + "/procurement/addp",
        data: { "good_list": [], "status": 1, "name": names },
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
$("#mianCont").delegate(".l_top .delCar", "click", function() {
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

    alertAll(typeId, deleate.join("-"))


});

function alertAll(typeid, list, obj) {
    $("body").append(function() {
        return '<div class = "aDs" ><i class = "bg" > </i> <div class = "ads_content"> <div class = "ads_text">' +
            ' <h4>  确定删除当前方案吗？ </h4> </div > <div class = "ads_footer" >' +
            ' <button data-type = "' + typeid + '"  data-sku = "' + list + '" class ="ads_submit" onclick="openAll(this)" > 确定 </button>' +
            '<button class="ads_cancl" onclick="closeAll()">取消</button > </div> </div></div>'
    })
    $(".aDs").show()
}

function openAll(obj) {
    removeList($(obj).attr("data-type"), $(obj).attr("data-sku"))
    $('.aDs').remove()
}

function closeAll() {
    $('.aDs').remove()
}


//清空方案
$("#mianCont").delegate(".l_top .refershCar", "click", function() {
    var deleate = [];
    var typeId = $(this).attr("data-typeid")
    $.each($("#leftDate").find("input[type='checkbox']"), function(i, item) {
        deleate.push($(this).parent().parent().find("button").attr('data-sku'))

    })

    if (deleate.length == 0) {
        addTips("当前方案已无商品")
        return false
    }
    alertClear(typeId, deleate.join("-"))


});

function alertClear(typeid, list, obj) {
    $("body").append(function() {
        return '<div class = "aDs" ><i class = "bg" > </i> <div class = "ads_content"> <div class = "ads_text">' +
            ' <h4>  确定清空当前方案吗？ </h4> </div > <div class = "ads_footer" >' +
            ' <button data-type = "' + typeid + '"  data-sku = "' + list + '" class ="ads_submit" onclick="openclear(this)" > 确定 </button>' +
            '<button class="ads_cancl" onclick="closeClear()">取消</button > </div> </div></div>'
    })
    $(".aDs").show()
}

function openclear(obj) {
    removeList($(obj).attr("data-type"), $(obj).attr("data-sku"), 1)
        //removeList(typeId, deleate.join("-"), 1)
    $('.aDs').remove()
        // var interTextd = document.getElementById('j_tmpl').innerHTML;
        //document.getElementById('mianCont').innerHTML = doT.template(interTextd)(sourDate);
}

function closeClear() {
    $('.aDs').remove()
}

function removeList(typeId, deleate, per) {

    isCheckAdd(typeId, 1)
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + "/procurement/delete",
        data: { "procurementId": typeId, "pitemlist": deleate },
        cache: false,
        success: function(item) {
            leftList(typeId)

            if (per == 1) {
                leftBut(1)
                    //
            } else {
                leftBut()
                closeOpen();
            }

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

    $(this).parent().find("input[type='text']").prop("value", parseInt(nowData) - 1);

    if ($(this).parent().parent().find("strong").text() == "暂无") {

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

    if ($(this).parent().parent().find("strong").text() == "暂无") {
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
    // names = encodeURI($(this).siblings("input").val())

    var type = $(this).attr("data-type")

    isCheckAdd(type, 1)
    $.ajax({
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + "/procurement/updatep",
        data: { "id": type, "name": $(this).siblings("input").val() },
        cache: false,
        success: function(item) {
            leftList(type);
            leftBut(1)

            $(".changName").hide();
            //close(type)
            //closeOpen()
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

    }, 100)

}

$("#left_w").delegate(".noLogoing", "click", function() {
    login()
});

//名称修改展示
$("#mianCont").delegate(".text .iconfont", "click", function() {

    if ($(".collection").text() == "已收藏") {

        alertAdCa()
        return false;
    }
    $(".changName").show()
});

function alertAdCa() {
    $("body").append(function() {
        return '<div class = "aDs" ><i class = "bg" > </i> <div class = "ads_content"> <div class = "ads_text">' +
            ' <h4>当前方案已被收藏,更改后为新的采购方案</h4> </div > <div class = "ads_footer" >' +
            ' <button class ="ads_submit" onclick="openAdsSub(this)" > 确定 </button>' +
            '<button class="ads_cancl" onclick="closeAdsCan()">取消</button > </div> </div></div>'
    })
    $(".aDs").show()
}

function openAdsSub(obj) {
    $('.aDs').remove()
    $(".changName").show()
}

function closeAdsCan() {
    $('.aDs').remove()
}

//左侧收藏
$("#mianCont").delegate(".nockeck", "click", function() {
    enshrine($(this).attr("data-type"), $(this).attr("data_p"))


});

$("#mianCont").delegate(".ischeck", "click", function() {
    addTips("已收藏该方案")
});

//单个删除
$("#mianCont").delegate("#leftDate li .ra_de", "click", function() {
    var Name = $("#mianCont .leftHead .text").text()

    alertAds($(this).attr("data-type"), $(this).attr("data-sku"), $(this), "确定删除当前方案夹的商品吗？")



});

function alertAds(typeid, skuId, obj, text) {
    $("body").append(function() {
        return '<div class = "aDs" ><i class = "bg" > </i> <div class = "ads_content"> <div class = "ads_text">' +
            ' <h4> ' + text + ' </h4> </div > <div class = "ads_footer" >' +
            ' <button data-type = "' + typeid + '"  data-sku = "' + skuId + '" data-obj="' + obj + '"  class ="ads_submit" onclick="openAds(this)" > 确定 </button>' +
            '<button class="ads_cancl" onclick="closeAds()">取消</button > </div> </div></div>'
    })
    $(".aDs").show()
}

function openAds(obj) {
    removePland($(obj).attr("data-type"), $(obj).attr("data-sku"), $(obj).attr("data-obj"))
    $('.aDs').remove()
}

function closeAds() {
    $('.aDs').remove()
}
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
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + "/procurement/updatep",

        dataType: "json",
        data: { "id": parseInt(typeId) },
        success: function(jsonResult) {
            setTimeout(leftBut(1), 40)
            leftList(typeId)
            close(typeId);
            cnshrine(typeId, list)
            try {

                Purchase();
            } catch (error) {

            }
        }
    });

}

function cnshrine(typeId, list) {

    isCheckAdd(typeId, 2)
    $.ajax({
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + "/procurementBak/addp?pid=" + typeId,
        success: function(jsonResult) {

            if (list == 3) {
                leftBut()
            } else {
                setTimeout(leftBut(1), 40)
            }
            addTips("已加入收藏方案")
                // runBg()
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
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + "/procurement/updatep",
        data: { "id": typeId, "collecttype": state },
        cache: false,
        success: function(item) {}
    })

}
//单个数据删除
function removePland(typeId, skuId, obj) {

    isCheckAdd(typeId, 1)
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
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

    if (adduser() == true) {
        window.location.reload(true)
        return false
    } else {
        window.location.href = "https://passport.jd.com/new/login.aspx?ReturnUrl=http://pcshop.jd.com"
    }
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
        addTips("当前无商品")
        return false;

    }

    var url = "https://cart.jd.com/cart/dynamic/reBuyForOrderCenter.action?wids=" + widsList + "&nums=" + numsList + "";
    window.open(url);
    addTips("加入购物车成功")


}

$("#mianCont").delegate(".export", "click", function() {
    $("#imgDowload").attr('href', "javascript:;");
    $("#imgDowload").attr("download", "")
    $(".selectorFile").show()
    var that = this
    $("#execlDowload").attr("data-pid", $(this).attr("data-pid"))


    if (IEVersion() == -1) {
        $("#imgDowload").text("正在生成图片")
    } else {
        $("#imgDowload").hide()
    }

});

$("#imgDowload").click(function() {

    if (window.location.pathname == "/Person.html") {
        closeOpen()
    } else {
        window.location.href = "Person.html?id=1";
    }


})

//导出采购方案
$("#execlDowload").click(function() {

    if ($(this).attr("data-w") != undefined) {
        //收藏
        window.open(baseUrl + "/procurementBakItem/export?pid=" + $(this).attr("data-pid") + "");
    } else {
        window.open(baseUrl + "/procurementItem/export?pid=" + $(this).attr("data-pid") + "");
    }
    closeOpen()
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
            $("html").css("width", "1920px")
            $("html").css("overflow-x", "hidden")
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

// if (getCookie("unick") == null || getCookie("unick") == "") {
//     $("#userName").text(getCookie("pin") == null ? unescape(userName) : unescape((getCookie("pin"))))
// } else {
//     $("#userName").text(getCookie("unick") == null ? unescape(userName) : unescape((getCookie("unick"))))
// }

$("body").delegate("#videos .iconfont", "click", function() {
    var myVideo = document.getElementById('example_video');
    myVideo.pause();
    $("#videos").hide()
    document.cookie = "videoH=2";

})

var timeout = true; //启动及关闭按钮
function time() {
    if (timeout) return;
    // login()
    if ($(".isLogoing").css("left") == "0px") {

        $('.leftContent').css("width", "0px")
    } else {
        $('.leftContent').css("width", "360px")
    }
    setTimeout(time, 50); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒
}