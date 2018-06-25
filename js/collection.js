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
    var userName = $(this).parent().siblings("input").val()
    var typId = $(this).parent().siblings("input").attr("id")

    $(this).parent().parent().hide();
    $(this).parent().parent().siblings(".iconfont").show();

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: baseUrl + "/procurementBak/updatep",
        data: JSON.stringify({ "id": typId, "name": userName }),
        cache: false,
        success: function(item) {
            Collection()
            leftBut()
        }
    })


})

//收藏数据
function Collection() {

    var j_persond = document.getElementById('j_person').innerHTML;
    $.getJSON(baseUrl + '/procurementBak/getplist', {
        "userid": getCookie("userid"),
        "status": 1
    }, function(item) {
        if (item != "") {
            document.getElementById('w_collection').innerHTML = doT.template(j_persond)(item);
            $("#w_collection .addCollection a").remove();
            $("#w_collection .right_but .pru").remove();

            changec(0)
            setTimeout(function() {
                priceNunCollect()
            }, 5)

        } else {
            return false
        }



    })

}
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

//异步修改数据
function changListdata(obj) {
    var value = $(obj).siblings("input").val(); //num
    var skuid = $(obj).parent().parent().parent().find(".tb_check input").attr("sc-id"); //id


    $.ajax({
        type: "GET",
        contentType: "application/json",
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
        $(".bg").show()
        $(".selectorFile").show()
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

                $(this).parent().parent().remove();
            }

        })

    } else {
        listId = [];
    }

    removePlanWC(typId, listId.join("-"))


});

//单选删除
$("#w_collection").delegate(".tb_opreat .tb_del", "click", function() {


        removePlanWC($(this).attr("data-typid"), $(this).attr("data-skid"), $(this))

    })
    //替换
$("#w_collection").delegate(".tb_opreat .replay", "click", function() {

    replay($(this).attr("data-typid"), $(this).attr("data-skid"), $(this))

})

function replay(typid, skId, obj) {
    $(".confirmTips").show()
    $(".sure").click(function() {
        removePlanP(typid, skId, $(obj))
        window.location = 'index.html'
    })
}

function removePlanWC(typeId, skuId, obj) {
    var typeIds = typeId.toString()
    var skuIds = skuId.toString()

    skuIds == NaN ? skuIds = " " : skuIds = skuIds;
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/procurementBak/delete",
        data: {
            "procurementId": typeIds,
            "pitemlist": skuIds
        },
        cache: false,
        success: function(item) {
            if (skuId == "") {
                Collection()
            }
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

    shoppingCart(num.join(","), id.join(","))
});