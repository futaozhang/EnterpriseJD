//采购对比




var k_tmpl = document.getElementById('k_tempelated').innerHTML;
// 不存在用户  回首页

//  if(getCookie("userId")==""||getCookie("userId")==null){
//     window.location.href="index.html"
// }
function comparedList() {

    $.ajax({
        url: baseUrl + "/procurement/getplist",
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        data: {
            "status": 1
        },
        cache: false,
        success: function(item) {
            var listData = [];
            $("#warp_content").empty()

            if (item.length > 3) {
                for (var i = 0; i < 3; i++) {
                    listData.push(item[i])
                }
            } else {
                listData = item

            }

            document.getElementById('warp_content').innerHTML = doT.template(k_tmpl)(listData);
            pricCom()
        }

    })
}
window.onload = function() {

    comparedList();
}

//减少
$("#Compared").delegate(".ul_num .reduce", 'click', function() {

    var nowData = $(this).parent().find("input[type='text']").prop("value");

    if (nowData < 2) {
        return false;
    }
    $(this).parent().find("input[type='text']").prop("value", parseInt(nowData) - 1);
    pricCom()
    changListdataCom($(this))
});

//增加
$("#Compared").delegate(".ul_num .add", 'click', function() {

    var nowData = $(this).parent().find("input[type='text']").prop("value");
    $(this).parent().find("input[type='text']").prop("value", parseInt(nowData) + 1)
    changListdataCom($(this))
    pricCom()

});

//价格计算
function pricCom() {

    $.each($(".c_conte"), function() {
        var jdprice = [];
        var eprice = [];
        $.each($(this).find("table input"), function(item) {

            jdprice.push($(this).val() * $(this).attr("data-price"));

            if ($(this).val() * $(this).attr("data-eprice") == 0) {
                eprice.push($(this).val() * $(this).attr("data-price"))
            } else {
                eprice.push($(this).val() * $(this).attr("data-eprice"))
            }


        })

        $(this).find(".t_opreat .slive").text("京东价：￥" + jdprice.sum().toFixed(2));

        $(this).find(".t_opreat .jd_text").text("￥" + eprice.sum().toFixed(2))

    })
}
//收藏
$("#warp_content").delegate(".n_collect", "click", function() {


    var typeId = $(this).attr("data-type")

    $.ajax({
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + "/procurement/updatep",
        dataType: 'jsonp',
        data: JSON.stringify({ "id": parseInt(typeId), "status": 2 }),
        success: function(jsonResult) {
            setTimeout(leftBut(), 200)

        }
    })
    comparedList()

    //物理删除
    $(this).parent().parent().parent().parent().remove();



});
$("#warp_content").delegate(".changesky", "click", function() {

    var typeId = $(this).find(".n_collect").attr("data-type")



    $(this).text("已收藏");

    isCheckAdd(typeId, 2)
    $.ajax({
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + "/procurementBak/addp?pid=" + typeId,
        dataType: 'jsonp',
        success: function(jsonResult) {

            addTips("已加入收藏方案")


        }
    })
});
// 收藏

//单选删除
$("#warp_content").delegate(".ui_opret .com_del", "click", function() {


    alertChange($(this).attr("data-typid"), $(this).attr("data-skid"), $(this))
})

function alertChange(typeid, list, obj) {
    $("body").append(function() {
        return '<div class = "aDs" ><i class = "bg" > </i> <div class = "ads_content"> <div class = "ads_text">' +
            ' <h4>确定删除当前物品吗？ </h4> </div > <div class = "ads_footer" >' +
            ' <button data-type = "' + typeid + '"  data-sku = "' + list + '" class ="ads_submit" onclick="openAll(this)" > 确定 </button>' +
            '<button class="ads_cancl" onclick="closeAll()">取消</button > </div> </div></div>'
    })
    $(".aDs").show()
}

function openAll(obj) {
    removePlanCom($(obj).attr("data-type"), $(obj).attr("data-sku"))
    $('.aDs').remove()
}


var recpPro = document.getElementById('recpPro').innerHTML;
//替换
$("#warp_content").delegate(".ui_opret .com_rep", "click", function() {

    $("body").css("overflow", "hidden")
    $(".r_body .typeText").attr("data-type", $(this).attr("data-typid"))
    $(".r_body .typeText").attr("data-message", $(this).attr("data-messageid"))
    $(".typeText").attr("data-deskuId", $(this).attr("data-skid"))

    $(".r_body .typeText").text($(this).attr("data-t"))
    $(".typeText").attr("data-col", 2)

    $.getJSON(baseUrl + "/goodsAttribute/getalist", { "sceneid": $(this).attr("data-messageid") }, function(json) {
        document.getElementById('recpHead').innerHTML = doT.template(recpPro)(json);
        $("#retunRcp").show()
    })



})

function retunRcp() {
    $("#retunRcp").hide()
    $("body").css("overflow", "auto")
}
var recpListTem = document.getElementById('recpListTem').innerHTML;

function recpAlert(ArrList) {
    $.getJSON(baseUrl + "/goods/gettoplist", { "categoryid": ArrList.categoryid, "bidlist": ArrList.bidlist, "avlist": ArrList.avlist },

        function(item) {
            document.getElementById('recpList').innerHTML = doT.template(recpListTem)(item);
            $(".tempelateD .r_head").animate({ height: "0px" }, 500);
            $(".alertFoot").hide()
            $(".openSlect").show()
            $(".closeSlect").hide()
        });
}

$(".tempelateD").delegate(".submit", "click", function() {

    isCheck()
    if ($("#recpHead .must").hasClass("addBorder")) {
        alertAdsf()
    } else {
        recpAlert(isCheck())
    }
})

function alertAdsf() {
    $("body").append(function() {
        return '<div class = "aDs" ><i class = "bg" > </i> <div class = "ads_content"> <div class = "ads_text">' +
            ' <h4> 请完成必选项目的勾选 </h4> </div > <div class = "ads_footer" >' +
            ' <button class ="ads_submit" onclick="closeAds(this)" > 确定 </button>' +
            '<button class="ads_cancl" onclick="closeAds()">取消</button > </div> </div></div>'
    })
    $(".aDs").show()
}



function closeAds() {
    $('.aDs').remove()
}

//物品删除
function removePlanCom(typeId, skuId, obj) {
    isCheckAdd(typeId, 1)
    $.ajax({
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        dataType: 'jsonp',
        url: baseUrl + "/procurement/delete",
        data: {
            "procurementId": typeId,
            "pitemlist": skuId
        },
        cache: false,
        success: function(item) {
            leftBut()
            comparedList()
                //$(this).parent().parent().remove();

        }
    })
}

//数量修改
function changListdataCom(obj) {
    var value = $(obj).siblings("input").val(); //num
    var skuid = $(obj).attr("data-type");
    //type
    $.ajax({
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        dataType: 'jsonp',
        url: baseUrl + "/procurementItem/updatepitem",
        data: {
            "id": skuid,
            "goodsnum": value
        },
        cache: true,
        success: function(item) {

        }
    })
}
//购物车
$("#warp_content").delegate(".but_jd", "click", function() {
    var num = [];
    var id = [];
    var raObj = $(this).parent().parent().siblings(".t_conte ").find("tbody tr");
    $.each($(raObj), function() {
        num.push($(this).find(".ul_num input").val())
        id.push($(this).find(".ul_num input").attr("id"))
    })
    shoppingCart(id.join(","), num.join(","))
});

$.ajax({
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

                    '<video id="example_video" class="video-js vjs-default-skin vjs-big-play-centered" preload="none" autoplay="autoplay"  controls width="425" height="240" align="middle" poster="' + item[0].videoimg + '" >'

                +'<source src="' + item[0].videourl + '" type="video/mp4"/> </video></div>'
            })
        }
    }
});

function closeAds() {
    $('.aDs').remove()
}
$("#retunRcp").delegate(".openSlect", "click", function() {

    $(".tempelateD .r_head").animate({ height: "220px" }, 500);
    $(".alertFoot").show()
    $(this).hide()
    $(".closeSlect").show()

})
$("#retunRcp").delegate(".closeSlect", "click", function() {
    $(".tempelateD .r_head").animate({ height: "0px" }, 500);
    $(".alertFoot").hide()
    $(".openSlect").show()
    $(this).hide()

})


//选中判断
function isCheck() {
    var bidlist = []; //可选项目
    var avlist = []; //必选项目
    var categoryid = []; //机型
    var Arrlist = {
        "categoryid": "",
        "avlist": "",
        "bidlist": ""
    }

    //非必选
    $.each($("#recpHead").find(".tem input"), function(i) {

        if ($(this).prop("checked") == true) {
            bidlist.push($(this).val())
        }
    })

    // 非必选品牌
    $.each($(".over_a").find("li"), function() {
        if ($(this).hasClass("activeLi")) {
            bidlist.push($(this).attr("data-id"))
        }
    })

    //必选  第一位属于机型
    $.each($("#recpHead").find(".re input"), function(i) {

        if ($(this).prop("checked") == true) {
            avlist.push($(this).val())
        }
    })

    //判断是否选中
    $.each($("#recpHead").find(".must"), function(i) {
        if ($(this).hasClass("re")) {} else {
            $(this).addClass("addBorder")
        }
    })
    bidlist.length != 0 ? bidlist = bidlist : bidlist.push("");
    Arrlist.categoryid = avlist[0];
    Arrlist.avlist = avlist.join("-").slice(2);
    Arrlist.bidlist = bidlist.join("-");
    return Arrlist

}



//必选单个点击判断
$("#recpHead").delegate(".must input", "click", function() {
        var that = this
        if ($(this).prop("checked") != false) {
            $(this).parent().addClass("re")
            $(this).parent().removeClass("addBorder")

        } else {
            $(this).parent().removeClass("re")
            $(this).parent().addClass("addBorder")
        }

        if ($("#wert_00").prop("checked") != false) {
            $(that).parent().addClass("re")
            $(that).parent().removeClass("addBorder")
        } else if ($("#wert_10").prop("checked") != false) {
            $(that).parent().addClass("re")
            $(that).parent().removeClass("addBorder")
        } else if ($("#wert_20").prop("checked") != false) {
            $(that).parent().addClass("re")
            $(that).parent().removeClass("addBorder")
        }

    })
    //替换功能（先添加 后删除）
$("#recpList").delegate(".addSelect", "click", function() {
    //先添加
    var skuId = $(this).attr("data-sku")
    var typeId = $(".typeText").attr("data-type")
    var messageid = $(".typeText").attr("data-message")
    var type = $(".typeText").text()
    var deskuId = $(".typeText").attr("data-deskuId");
    isCheckAdd(typeId, 1)
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        dataType: 'jsonp',
        url: baseUrl + "/procurementItem/addpitem",
        data: { "pid": typeId, "goodsid": skuId, "message": $.trim(type).toString(), "messageid": messageid },
        cache: true,
        success: function(item) {

            $.ajax({
                type: "GET",
                dataType: 'jsonp',
                url: baseUrl + "/procurement/delete",
                data: { "procurementId": typeId, "pitemlist": deskuId },
                cache: false,
                success: function(item) {
                    comparedList()
                    leftBut()
                    $("#retunRcp").hide();
                    retunRcp()

                }
            })
        }
    })

})

//仅添加

$("#recpList").delegate(".addSelectRcp", "click", function() {

    var skuId = $(this).attr("data-sku")
    var typeId = $(".typeText").attr("data-type")
    var messageid = $(".typeText").attr("data-message")
    var type = $(".typeText").text()
    var deskuId = $(".typeText").attr("data-deskuId");

    isCheckAdd(typeId, 1)
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        dataType: 'jsonp',
        url: baseUrl + "/procurementItem/addpitem",
        data: { "pid": typeId, "goodsid": skuId, "message": $.trim(type).toString(), "messageid": messageid },
        cache: true,
        success: function(item) {
            comparedList()
            leftBut()
            $("#retunRcp").hide();
            retunRcp()

        }
    })

})


$("#recpHead").delegate(".reset", "click", function() {
    $(".over_a li").removeClass("activeLi")
    $(".over_a li").find("img").css("opacity", 1);
    $.each($(".r_head").find("input"), function(i) {

        $(this).prop("checked", false)

    })
})

$("#recpHead").delegate(".over_a li", "click", function() {
    if ($(this).hasClass("activeLi")) {
        $(this).removeClass("activeLi")
        $(this).find("img").css("opacity", 1);
    } else {
        $(this).addClass("activeLi")
        $(this).find("img").css("opacity", 0.4);
    }

})