//采购对比




var k_tmpl = document.getElementById('k_tempelate').innerHTML;

function comparedList() {

    $.ajax({
        url: baseUrl + "/procurement/getplist",
        data: {
            "userid": getCookie("userId"),
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

comparedList();

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
            type: "POST",
            url: baseUrl + "/procurement/updatep",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({ "id": parseInt(typeId), "status": 2 }),
            success: function(jsonResult) {
                setTimeout(leftBut(), 200)

            }
        })
        //物理删除
    $(this).parent().parent().parent().parent().remove();


});
//单选删除
$("#warp_content").delegate(".ui_opret .com_del", "click", function() {


        removePlanCom($(this).attr("data-typid"), $(this).attr("data-skid"), $(this))
    })
    //替换
$("#warp_content").delegate(".ui_opret .com_rep", "click", function() {

    replayCom($(this).attr("data-typid"), $(this).attr("data-skid"), $(this))

})

function replayCom(typid, skId, obj) {
    $(".confirmTips").show()
    $(".sure").click(function() {

        removePlanCom(typid, skId, $(obj))

        window.location = 'index.html'
    })
}

//物品删除
function removePlanCom(typeId, skuId, obj) {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: baseUrl + "/procurement/delete",
        data: {
            "procurementId": typeId,
            "pitemlist": skuId
        },
        cache: false,
        success: function(item) {
            leftBut()
            comparedList()
            $(this).parent().parent().remove();

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
        contentType: "application/json",
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
                return '<div id="videos"><i class="iconfont">&#xe606;</i>' +

                    '<video id="example_video" class="video-js vjs-default-skin vjs-big-play-centered" preload="auto" controls width="425" height="240" align="middle" poster="' + item[0].videoimg + '" >'

                +'<source src="' + item[0].videourl + '" type="video/mp4"/> </video></div>'
            })
        }
    }
})