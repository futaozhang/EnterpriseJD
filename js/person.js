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
            ctx.font = "20px";
            ctx.fillText(name, 500, 60);
            // canvas.toBlob(function(blob) {
            //     window.saveAs(blob, '' + name + '.png');
            // })
            dataURL = canvas.toDataURL("image/png");
            $("#imgDowload").attr('href', dataURL);
            $("#imgDowload").attr('download', '' + name + '.png');
            $("#imgDowload").attr('href', dataURL);

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
    //替换
$("#w_person").delegate(".tb_opreat .replay", "click", function() {

    replay($(this).attr("data-typid"), $(this).attr("data-skid"), $(this))

})

function replay(typid, skId, obj) {
    $(".confirmTips").show()
    $(".sure").click(function() {

        removePlanP(typid, skId, $(obj))

        window.location = 'index.html'
    })
}


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
            $(this).parent().parent().remove();
            addTips("已删除")
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
    cnshrine($(this).attr("data-type"))
        //更新数据

});


//方案夹收藏
function cnshrine(typeId) {

    isCheckAdd(typeId, 2)
    $.ajax({
        type: "POST",
        url: baseUrl + "/procurementBak/addp?pid=" + typeId,
        contentType: "application/json",
        dataType: "json",
        success: function(jsonResult) {
            Purchase()
            setTimeout(leftBut(), 200)
            addTips("已加入收藏方案")
        }
    })

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



$("#videos .iconfont").click(function() {
    $("#videos").hide()
})