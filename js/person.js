/**
 * 采购
 */
var noData = [];
var baseUrl = "http://192.168.1.247:8080"
    // var baseUrl = "http://pre-admin.pcshop.jd.com"
window.onload = function() {
    // 
    dataListChange(GetRequest("id").id)

    $(".p_but a").click(function() {
        $(" .p_but a").removeClass("activeRightBut")
        $(this).addClass("activeRightBut")
        var data = $(this).attr("data-jp")
        dataListChange(data)

    })

    // 不存在用户  回首页
    // if (getCookieCores("unick") == null || getCookieCores("unick") == "") {
    //     window.location = "index.html"
    // }
}

function dataListChange(data) {

    if (data == 1) {
        //采购
        $(" .p_but .pur").addClass("activeRightBut")
        $("#w_collection").hide()
        $("#w_person").show()
        Purchase(this)


    } else {
        //收藏
        $(" .p_but .collec").addClass("activeRightBut")
        $("#w_person").hide()
        $("#w_collection").show()
        Collection(this)
    }
}

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
//采购
$("#w_person").delegate(".left_warp a", "click",
    function(obj) {
        change($(this).attr("data-ju"))

    })


//左侧排列切换
function change(changId) {

    $("#w_person .left_warp a").removeClass("actvieLeft")
    $("#w_person .right_warp").css("display", "none")
    $("#w_person .left_warp .person_" + parseInt(changId) + "").addClass("actvieLeft")
    $("#w_person .person_" + parseInt(changId) + "").css("display", "block")

    priceNun()
}
var j_person = document.getElementById('j_person').innerHTML;
//采购数据更新
function Purchase() {
    $.ajaxSetup({ cache: false });

    $.getJSON(baseUrl + "/procurement/getplist", { "userid": getCookie("userid"), "status": 1 }, function(item) {

        if (item.length != 0) {
            document.getElementById('w_person').innerHTML = doT.template(j_person)(item);
            change(0)
            setTimeout(function() {
                priceNun()
            }, 5)
        } else {
            document.getElementById('w_person').innerHTML = doT.template(j_person)(noData);
            return false
        }

    })

}

//全选

$("#w_person").delegate("thead input[type='checkbox']", "click", function() {
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

//全选删除

$("#w_person").delegate(".tableDe", "click", function() {
    var deleate = [];
    var listId = [];
    var that = this;
    var typId = $(this).attr("data-src");

    if ($(this).parent().parent().parent().find("table .labeW").prop("checked") != true) {

        $.each($(this).parent().parent().parent().find("table .tb_check input[type='checkbox']"), function(i, item) {
            if ($(this).prop("checked") != false) {
                deleate.push($(this).attr("data-sku"));
                listId.push($(this).attr("sc-id"));
                $(this).parent().parent().remove();
            }
        })

    } else {
        listId = [];
    }

    removePlanP(typId, listId.join("-"))


});
//导出图片
$("#w_person").delegate(".exprotIMg", "click", function() {
    var tableNum = $(this).attr("dataTable")
    var name = $(this).attr("data-name")
    $(".bg").show()
    $("#imgDowload").text("正在生成图片")
    $(".selectorFile").show()
    $("#execlDowload").attr("data-pid", $(this).attr("datatable"))
    $("#imgDowload").attr("data-name", name)
    $("#imgDowload").attr("dataTable", tableNum)
    var fatherNode = $(this).parent().parent().parent()
    html2canvas($(fatherNode), {
        useCORS: true,
        allowTaint: true,
        allowTaint: false,
        onrendered: function(canvas) {
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "#EEEEEE";
            ctx.fillRect(40, 20, 160, 100);
            ctx.fillRect(620, 80, 460, 50);
            ctx.font = "14px microsoft yahei";
            ctx.rect(40, 30, 150, 90);
            ctx.stroke();
            ctx.fillStyle = "black";
            ctx.fillText("方案名称：", 80, 72);
            ctx.font = "bold 16px microsoft iconfont";
            ctx.fillStyle = "rgb(226,58,58)";
            ctx.fillText(name, 80, 100);
            dataURL = canvas.toDataURL("image/png");
            $("#imgDowload").attr('href', dataURL);
            $("#imgDowload").attr('download', '' + name + '.png');
            $("#imgDowload").text("图片下载")

        }

    })
})

$("#imgDowload").click(function() {
    $(".bg").hide()
    $(".selectorFile").hide()

})



$("#reset").click(function() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
    window.location.href = "index.html"

})







//单选删除
$("#w_person").delegate(".tb_opreat .tb_del", "click", function() {


    removePlanP($(this).attr("data-typid"), $(this).attr("data-skid"), $(this))

})
var recpPro = document.getElementById('recpPro').innerHTML;
//替换
$("#w_person").delegate(".tb_opreat .replay", "click", function() {
    $(".typeText").removeAttr("data-col")
    $("body").css("overflow", "hidden")
    $(".r_body .typeText").attr("data-type", $(this).attr("data-typid"))
    $(".r_body .typeText").attr("data-message", $(this).attr("data-message"))
    $(".typeText").attr("data-deskuId", $(this).attr("data-skid"))
    $(".r_body .typeText").text($(this).parent().siblings(".titleText").text())

    $.getJSON(baseUrl + "/goodsAttribute/getalist", { "sceneid": $(this).attr("data-message") }, function(json) {
        document.getElementById('recpHead').innerHTML = doT.template(recpPro)(json);
        $("#retunRcp").show()
    })



})

//数据

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
        alert("请完成必选项")
    } else {
        recpAlert(isCheck())
    }
})
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

        if ($(this).prop("checked") != false) {
            $(this).parent().addClass("re")
            $(this).parent().removeClass("addBorder")
        } else {

            $(this).parent().removeClass("re")
            $(this).parent().addClass("addBorder")
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
    var collect = $(".typeText").attr("data-col");
    var addUrl = "procurementItem";
    var delUrl = "procurement";
    collect == undefined ? addUrl = addUrl : addUrl = "procurementBakItem";
    collect == undefined ? delUrl = delUrl : delUrl = "procurementBak";
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/" + addUrl + "/addpitem",
        data: { "pid": typeId, "goodsid": skuId, "message": $.trim(type).toString(), "messageid": messageid },
        cache: true,
        success: function(item) {
            isCheckAdd(typeId, 1)
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: baseUrl + "/" + delUrl + "/delete",
                data: { "procurementId": typeId, "pitemlist": deskuId },
                cache: false,
                success: function(item) {
                    if (collect != undefined) {
                        Collection()
                    } else {
                        Purchase()
                    }
                    leftBut()
                    moClick(typeId)
                    $("#retunRcp").hide();
                }
            })
        }
    })

})


//仅添加

$("#recpList").delegate(".addSelectRcp", "click", function() {
    //先添加
    var skuId = $(this).attr("data-sku")
    var typeId = $(".typeText").attr("data-type")
    var messageid = $(".typeText").attr("data-message")
    var type = $(".typeText").text()
    var deskuId = $(".typeText").attr("data-deskuId");
    var collect = $(".typeText").attr("data-col");
    var addUrl = "procurementItem";
    collect == undefined ? addUrl = addUrl : addUrl = "procurementBakItem";

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/" + addUrl + "/addpitem",
        data: { "pid": typeId, "goodsid": skuId, "message": $.trim(type).toString(), "messageid": messageid },
        cache: true,
        success: function(item) {
            isCheckAdd(typeId, 1)
            Collection()
            Purchase()
            if (collect != undefined) {

            } else {

            }
            leftBut()
            moClick(typeId)
            $("#retunRcp").hide();
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

function removePlanP(typeId, skuId, obj) {

    var typeIds = typeId.toString()
    var skuIds = skuId.toString()

    skuIds == NaN ? skuIds = " " : skuIds = skuIds;
    isCheckAdd(typeIds, 1)

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/procurement/delete",
        data: { "procurementId": typeIds, "pitemlist": skuIds },
        cache: false,
        success: function(item) {
            Purchase()
            leftBut()
            $(obj).parent().parent().remove();
            moClick(typeId)
        }
    })
}

//单选判断
$("#w_person").delegate(".tb_check input[type='checkbox']", "click", function() {
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

$("#w_person").delegate(".reduce", 'click', function(dom) {

    var nowData = $(this).parent().find("input[type='text']").prop("value");

    if (nowData < 2) {
        return false;
    }
    var fatherNode = $(this).parent().parent()
    var thisNum = $(this).parent().find("input[type='text']")
    $(thisNum).prop("value", parseInt(nowData) - 1);

    priceNun()
    changListdataW($(this))

});


//加
$("#w_person").delegate(".add", 'click', function() {

    var nowData = $(this).parent().find("input[type='text']").prop("value");

    $(this).parent().find("input[type='text']").prop("value", parseInt(++nowData))
    changListdataW($(this))
    priceNun()

});
//数量修改
function changListdataW(obj) {
    var value = $(obj).siblings("input").val(); //num
    var skuid = $(obj).parent().parent().parent().find(".tb_check input").attr("sc-id"); //id
    $(obj).attr("data-type"); //type
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/procurementItem/updatepitem",
        data: { "id": skuid, "goodsnum": value },
        cache: true,
        success: function(item) {

        }
    })
}


//收藏
$("#w_person").delegate(".c_isCheck", "click", function() {
    cnshrine($(this).attr("data-type"), 2)
        //更新数据

});




//模拟点击
function moClick(type) {
    setTimeout(function() {
        $(".left_warp a").each(function() {
            var that = this
            if (parseInt($(this).attr("data-src")) == parseInt(type)) {
                $(this).click();
            }
        })
    }, 300)

}

Array.prototype.sum = function() {
    var result = 0;
    for (var i = 0; i < this.length; i++) {
        result += this[i];
    }
    return result;
};

// 价格计算
function priceNun() {

    $.each($("#w_person .right_warp"), function() {
        var jdprice = [];
        var eprice = [];
        $.each($(this).find(".t_num input"), function(item) {
            if ($(this).val() * $(this).attr("data-eprice") == 0) {
                eprice.push($(this).val() * $(this).attr("data-price"))
            } else {
                eprice.push($(this).val() * $(this).attr("data-eprice"))
            }
            jdprice.push($(this).val() * $(this).attr("data-price"))

        })

        $(this).find(".price .slive").text("京东价：￥" + jdprice.sum().toFixed(2));
        $(this).find(".price .jdPrice").text("￥" + eprice.sum().toFixed(2))

    })
}

//购物车
$("#w_person").delegate(".but_jd", "click", function() {
    var num = [];
    var id = [];
    var raObj = $(this).parent().siblings("").find("tbody tr");
    $.each($(raObj), function() {
        num.push($(this).find(".t_num input").val())
        id.push($(this).find(".t_num input").attr("id"))
    })

    shoppingCart(num.join(","), id.join(","))
});

$.ajax({
    type: "GET",
    contentType: "application/json",
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
                return '<div id="videos"><i class="iconfont" onclick="close(this)">&#xe606;</i>' +

                    '<video id="example_video" class="video-js vjs-default-skin vjs-big-play-centered" preload="auto" controls width="425" height="240" align="middle" poster="' + item[0].videoimg + '" >'

                +'<source src="' + item[0].videourl + '" type="video/mp4"/> </video></div>'
            });
        }
    }
})