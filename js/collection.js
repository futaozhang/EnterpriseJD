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



//收藏数据
function Collection() {

    var j_persond = document.getElementById('j_person').innerHTML;
    $.getJSON(baseUrl + '/procurement/getplist', { "userid": 1, "status": 2 }, function(item) {
        if (item != "") {
            document.getElementById('w_collection').innerHTML = doT.template(j_persond)(item);
            $("#w_collection .addCollection").remove();
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
        url: baseUrl + "/procurementItem/updatepitem",
        data: { "id": skuid, "goodsnum": value },
        cache: true,
        success: function(item) {

        }
    })


}

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
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/procurement/delete",
        data: { "procurementId": typeId, "pitemlist": skuId },
        cache: false,
        success: function(item) {
            Purchase()
            leftBut()
            $(this).parent().parent().remove();
            Collection()
        }
    })
}


// 价格计算
function priceNunCollect() {

    $.each($("#w_collection .right_warp"), function() {


        var jdprice = [];
        var eprice = [];
        $.each($(this).find(".t_num input"), function(item) {
            jdprice.push($(this).val() * $(this).attr("data-price"))
            eprice.push($(this).val() * $(this).attr("data-eprice"))

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