/**
 * 收藏
 */


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


//收藏
$("#w_collection").delegate(".left_warp a", "click",
    function(obj) {
        changec($(this).attr("data-ju"))

    })

//左侧排列切换
function changec(changId) {

    $("#w_collection .left_warp a").removeClass("actvieLeft")
    $("#w_collection .right_warp").css("display", "none")
    $("#w_collection .left_warp .person_" + parseInt(changId) + "").addClass("actvieLeft")
    $("#w_collection .person_" + parseInt(changId) + "").css("display", "block")

    priceNunCollect()
}

//方案名称
$("#w_collection").delegate(".warpName .iconfont", "click", function() {
    $(this).hide();
    $(this).siblings(".inputName").show();

})

$("#w_collection").delegate(".warpName .inputNameCance", "click", function() {
    $(".inputName").hide();
    $(".warpName .iconfont").show();
})

//名称修改
$("#w_collection").delegate(".warpName .inputNameSub", "click", function() {
    var collectionName = $(this).parent().siblings("input").val()
    var typId = $(this).parent().siblings("input").attr("id")

    $(this).parent().parent().hide();
    $(this).parent().parent().siblings(".iconfont").show();

    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + "/procurementBak/updatep",
        data: { "id": typId, "name": collectionName },
        cache: false,
        success: function(item) {
            Collection()
                // leftBut()
        }
    })


})

//收藏数据
function Collection(ip) {

    var j_persond = document.getElementById('j_person').innerHTML;

    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + "/procurementBak/getplist",
        data: { "status": 1 },
        cache: false,
        success: function(item) {
            if (item.length != 0) {
                document.getElementById('w_collection').innerHTML = doT.template(j_persond)(item);

                $("#w_collection .addCollection a").remove();
                $("#w_collection .right_but .pru").remove();
                $("#w_collection .right_but .addpro").show()
                changec(0)
                setTimeout(function() {
                    priceNunCollect()
                }, 5)

            } else {
                document.getElementById('w_collection').innerHTML = doT.template(j_persond)(noData);
            }

            moClickC(ip)
        }
    })

}
// 

//全选

//
$("#w_collection").delegate("thead input[type='checkbox']", "click", function() {
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

//单选判断


$("#w_collection").delegate(".tb_check input[type='checkbox']", "click", function() {
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

$("#w_collection").delegate(".reduce", 'click', function(dom) {

    var nowData = $(this).parent().find("input[type='text']").prop("value");

    if (nowData < 2) {
        return false;
    }
    var fatherNode = $(this).parent().parent()
    var thisNum = $(this).parent().find("input[type='text']")
    $(thisNum).prop("value", parseInt(nowData) - 1);

    changListdata($(this))

    priceNunCollect()
});

//加

$("#w_collection").delegate(".add", 'click', function() {

    var nowData = $(this).parent().find("input[type='text']").prop("value");

    $(this).parent().find("input[type='text']").prop("value", parseInt(++nowData));

    changListdata($(this))
    priceNunCollect()
});
//收藏方案  回滚到采购方案

$("#w_collection").delegate(".addpro", 'click', function() {


    if ($("#leftsider .isLogoing .addProgram ").length > 2) {
        $(".confirmTips .sure").attr("date-type", $(this).attr("data-id"))
        $(".selectRep").empty();
        $.each($("#leftsider .isLogoing .addProgram"), function(i, item) {
            var that = this
            $(".selectRep").append(function() {
                return '<input type="radio" name="tr" data-src="' + $(that).attr("data-src") + '" id="jdRep_' + i + '"> <label for="jdRep_' + i + '"> ' + $.trim($(that).find("small").text()) + '</label>'
            })
        })
        $(".confirmTips").show()

        return false;

    }

    recoverP($(this).attr("data-id"))

});

$(".confirmTips .sure").click(function() {
    var pid = $(this).parent().find(".selectRep input");
    var slectePid;
    $.each(pid, function() {

        if ($(this).prop("checked") == true) {

            slectePid = $(this).attr("data-src")
        }
    })
    if (slectePid == undefined) {
        alert("请选择其中一个")
        return false;
    }
    recoverP($(this).attr("date-type"), slectePid, 2)
})


function recoverP(coolectId, pid, rcp) {
    pid == null ? pid = "" : pid = pid;
    $.ajax({
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        dataType: 'jsonp',
        url: baseUrl + "/procurement/recoverP",
        data: {
            "pbid": coolectId,
            "pid": $.trim(pid)
        },
        cache: true,
        success: function(item) {
            leftBut()
            try {
                if (rcp == 2) {
                    $(".confirmTips").hide()
                }
            } catch (error) {

            }

        }
    })
}


//异步修改数据
function changListdata(obj) {
    var value = $(obj).siblings("input").val(); //num
    var skuid = $(obj).parent().parent().parent().find(".tb_check input").attr("sc-id"); //id
    $.ajax({
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        dataType: 'jsonp',
        url: baseUrl + "/procurementBakItem/updatepitem",
        data: {
            "id": skuid,
            "goodsnum": value
        },
        cache: true,
        success: function(item) {}
    })


}
//导出图片
$("#w_collection").delegate(".exprotIMg", "click", function() {
        var tableNum = $(this).attr("dataTable")
        var name = $(this).attr("data-name")
        $("#imgDowload").attr('href', "");
        $(".bg").show()
        $(".selectorFile").show()
        if (IEVersion() == -1) {
            $("#imgDowload").text("正在生成图片")
        } else {
            $("#imgDowload").hide()
        }
        $("#execlDowload").attr("data-pid", $(this).attr("datatable"))
        $("#execlDowload").attr("data-w", 1)
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
                ctx.fillRect(620, 30, 460, 100);
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
                $("#imgDowload").attr('href', dataURL);
                $("#imgDowload").text("图片下载")
            }

        })
    })
    // 多选删除
$("#w_collection").delegate(".tableDe", "click", function() {
    var deleate = [];
    var listId = [];
    var that = this;
    var typId = $(this).attr("data-src");

    if ($(this).parent().parent().parent().find("table .labeW").prop("checked") != true) {

        $.each($(this).parent().parent().parent().find("table .tb_check input[type='checkbox']"), function(i, item) {
            if ($(this).prop("checked") != false) {
                deleate.push($(this).attr("data-sku"));
                listId.push($(this).attr("sc-id"));

                // $(this).parent().parent().remove();
            }

        })

    } else {
        listId = [];
    }

    personAlerts(typId, listId.join("-"))


});
//
function personAlerts(typeid, skuId, obj) {
    var text = "确定删除当前商品？"
    if (skuId == "") {
        text = "确定删除当前方案？"
    }
    $("body").append(function() {
        return '<div class = "aDs" ><i class = "bg" > </i> <div class = "ads_content"> <div class = "ads_text">' +
            ' <h4>' + text + '</h4> </div > <div class = "ads_footer" >' +
            ' <button data-type = "' + typeid + '"  data-sku = "' + skuId + '" data-obj="' + obj + '"  class ="ads_submit" onclick="collectionOpen(this)" > 确定 </button>' +
            '<button class="ads_cancl" onclick="personAds()">取消</button > </div> </div></div>'
    })
    $(".aDs").show()
}

function collectionOpen(obj) {
    // removePland($(obj).attr("data-type"), $(obj).attr("data-sku"), $(obj).attr("data-obj"))
    removePlanWC($(obj).attr("data-type"), $(obj).attr("data-sku"), $(obj).attr("data-obj"))
    $('.aDs').remove()
}


//单选删除
$("#w_collection").delegate(".tb_opreat .tb_del", "click", function() {

        personAlerts($(this).attr("data-typid"), $(this).attr("data-skid"), $(this))
    })
    //替换


var recpPro = document.getElementById('recpPro').innerHTML;
//替换
$("#w_collection").delegate(".tb_opreat .replay", "click", function() {

    $("body").css("overflow", "hidden")
    $(".r_body .typeText").attr("data-type", $(this).attr("data-typid"))
    $(".r_body .typeText").attr("data-message", $(this).attr("data-message"))
    $(".typeText").attr("data-deskuId", $(this).attr("data-skid"))
    $(".r_body .typeText").text($(this).parent().siblings(".titleText").text())
    $(".typeText").attr("data-col", 2)
    $.getJSON(baseUrl + "/goodsAttribute/getalist", { "sceneid": $(this).attr("data-message") }, function(json) {
        document.getElementById('recpHead').innerHTML = doT.template(recpPro)(json);
        $("#retunRcp").show()
    })



})




function removePlanWC(typeId, skuId, obj) {
    var typeIds = typeId.toString()
    var skuIds = skuId.toString()

    skuIds == NaN ? skuIds = " " : skuIds = skuIds;
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        dataType: 'jsonp',
        url: baseUrl + "/procurementBak/delete",
        data: {
            "procurementId": typeIds,
            "pitemlist": skuIds
        },
        cache: false,
        success: function(item) {
            if (skuIds == "") {
                Collection()
            }
            Collection();
            $(obj).parent().parent().remove();
            addTips("已删除")
        }
    })
}


// 价格计算
function priceNunCollect() {

    $.each($("#w_collection .right_warp"), function() {


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
        $(this).find(".price .jdPrice").text("￥" + eprice.sum().toFixed(2));

    })
}
//购物车
$("#w_collection").delegate(".but_jd", "click", function() {
    var num = [];
    var id = [];
    var raObj = $(this).parent().siblings("").find("tbody tr");
    $.each($(raObj), function() {
        num.push($(this).find(".t_num input").val())
        id.push($(this).find(".t_num input").attr("id"))
    })

    shoppingCart(id.join(","), num.join(","))
});