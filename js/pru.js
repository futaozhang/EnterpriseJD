/**
 * 数据筛选页
 */

var listdata = [];
window.onload = function() {
        //对比栏目cookie 存在数据

        if (getCookie("Contrast") != null) {
            ContrastFuc()
        }

        // leftBut()

    }
    // 筛选后数据渲染
var j_warp = document.getElementById('j_warp').innerHTML;

//筛选结果
$(".screen a").click(function() {
        if ($(this).hasClass("activeScreen")) {
            return false
        };
        var name = $(this).attr("data-screen");
        var sort = $(this).attr("data-sort");
        priceChange(name, sort);

        $.getJSON(baseUrl + "/goods/gettoplist", {
                "categoryid": getCookie("categoryid"),
                "bidlist": getCookie("bidlist") == null ? "" : getCookie("bidlist"),
                "avlist": getCookie("slectorType"),
                "sort": name,
                "type": sort
            },

            function(item) {
                document.getElementById('content_warp').innerHTML = doT.template(j_warp)(item);
            }
        )
        $(this).siblings().removeClass("activeScreen")
        $(this).addClass("activeScreen")
    })
    //价格筛选切换
function priceChange(key, item) {

    if (key == 1 || key == 3 || key == 4) {
        $("#pred").show();
        $("#down").hide();
        $("#up").hide();
    } else if (item == 2) {
        $("#up").show();
        $("#down").hide();
        $("#pred").hide();
    } else {
        $("#up").hide();
        $("#down").show();
        $("#pred").hide();
    }
}


$("#left_w").hide()
if (getCookie("categoryid") == null || getCookie("slectorType") == null) {
    document.getElementById('content_warp').innerHTML = doT.template(j_warp)(listdata);
    $("#left_w").show()
        // return false;
} else {
    loadings("商品加载中")
    $.getJSON(baseUrl + "/goods/gettoplist", { "categoryid": getCookie("categoryid"), "bidlist": getCookie("bidlist") == null ? "" : getCookie("bidlist"), "avlist": getCookie("slectorType") }, function(item) {

        document.getElementById('content_warp').innerHTML = doT.template(j_warp)(item);

        $(".tips").fadeOut();
        $("#left_w").show()
        if (getCookie("loading") == 2) {
            setTimeout(function() {
                $(".add_pri ul").html(function(n) {
                    return "<a href='javascript:;'><li class='addPro'>+</li></a>"
                })
            }, 300)
            return false;
        } else {
            leftBut()
        }
        leftBut()

    });
}



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
            $(".contrast").fadeIn()
            return false
        } else {}
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
        //addP()
        //$(".contrast").fadeIn()
    var j_contrast = document.getElementById('j_Contrast').innerHTML;
    document.getElementById('contrast_warp').innerHTML = doT.template(j_contrast)(ContrastArr);
})

// 对比跳转Jd
$(".contrast").delegate(".compared_cont", "click", function() {
    var one = getCookie("Contrast").split(",")[0];
    var two = getCookie("Contrast").split(",")[1];
    var three = getCookie("Contrast").split(",")[2];
    var four = getCookie("Contrast").split(",")[3];
    one == undefined ? one = 0 : one = one;
    two == undefined ? two = 0 : two = two;
    three == undefined ? three = 0 : three = three;
    four == undefined ? four = 0 : four = four;
    if (one != 0) {
        window.open("https://www.jd.com/compare/" + one + "-" + two + "-" + three + "-" + four + ".html")
    } else {
        addTips("对比栏中无商品")
    }


})


//对比栏目数据渲染
function addP() {
    var date = getCookie("Contrast").split(",").join("-")
    if (date.split("-").length > 5) {
        $(".contrast").fadeIn()
        addTips("对比栏已满")
        return false
    }
    var j_contrast = document.getElementById('j_Contrast').innerHTML;

    $.getJSON(baseUrl + "/goods/compare", { "skulist": date },
        function(item) {
            document.getElementById('contrast_warp').innerHTML = doT.template(j_contrast)(item);

            if (item != "") {
                $(".contrast").fadeIn()
            }

            var datas = getCookie("Contrast").split(',')

            //全局置空
            $("#content_warp").find("input[type=checkbox]").prop("checked", false)
                //页面相同数据默认加入选中
            var skuAdd = $("#content_warp").find("input[type=checkbox]");

            for (var i = 0; i < $(skuAdd).length; i++) {
                var elment = $(skuAdd)[i]
                if ($.inArray($(elment).attr("data-sku"), datas) != -1) {
                    $(elment).prop("checked", true)
                }

            }

        });
}

//数据对比
function ContrastFuc() {
    addP()
}



//对比栏关闭按钮
$(".contrast .cont_head i").click(function() {
    $(".contrast").hide()

})


//加入购物方案
$("#content_warp").delegate(".add_pri ul a", "click", function() {

        var typeId = $(this).attr("data-typid") //购物方案Id
        var skuId = $(this).parent().attr("data-sku") //物品sku
        var tipsName = $(this).find("li").text()
        if (typeId == undefined) {
            addProgram()
            return false
        }

        addPlan(typeId, skuId, getCookie("Type"), tipsName)

    })
    /*
     *加入物品接口
     *skuId 物品
     *typId 方案
     *type 日常生活
     */
function addPlan(typeId, skuId, type, tipsName) {
    $.ajax({
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        dataType: 'jsonp',
        url: baseUrl + "/procurementItem/addpitem",
        data: { "pid": typeId, "goodsid": skuId, "message": type, "messageid": getCookie("messageid") },
        cache: true,
        success: function(item) {
            isCheckAdd(typeId, 1)
            addTips("已加入" + tipsName)
            leftBut()


        }
    })
}

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

function setCookie(name, value, time) {


    time == undefined ? time = 5 : time = time;
    //alert(time)
    var exp = new Date();
    exp.setTime(exp.getTime() + 8 * time * 60 * 60 * 1000);
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

$.ajax({
    type: "GET",
    url: baseUrl + "/scene/list",
    cache: false,
    beforeSend: function() {
        var videoH = getCookie("videoH");

        if (videoH == 2) {
            return false
        }
    },
    success: function(item) {
        var that = this
        if (item[0].videourl != "" || item[0].videourl != null) {
            $("body").append(function() {
                return '<div id="videos"><i class="iconfont">&#xe606;</i>' +

                    '<video id="example_video" class="video-js vjs-default-skin vjs-big-play-centered" preload="none" autoplay="autoplay"  controls width="425" height="240" align="middle" poster="' + item[0].videoimg + '" >' +
                    '<source src="' + item[0].videourl + '" type="video/mp4"/> </video></div>'
            })
        }
    }
})