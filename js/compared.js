//采购对比




var k_tmpl = document.getElementById('k_tempelate').innerHTML;

function comparedList() {
    $.ajax({
        url: baseUrl + "/procurement/getplist",
        data: { "userid": 1, "status": 1 },
        cache: false,
        success: function(item) {
            $("#warp_content").empty()
            document.getElementById('warp_content').innerHTML = doT.template(k_tmpl)(item);
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
$("#Compared").delegate(".add", 'click', function() {

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
            eprice.push($(this).val() * $(this).attr("data-eprice"))

        })

        $(this).find(".t_opreat .slive").text("京东价：￥" + jdprice.sum().toFixed(2));

        $(this).find(".t_opreat .jd_text").text("￥" + eprice.sum().toFixed(2))

    })
}
//收藏
$("#warp_content").delegate(".n_collect", "click", function() {

    enshrine($(this).attr("data-type"))


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
        data: { "procurementId": typeId, "pitemlist": skuId },
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
        data: { "id": skuid, "goodsnum": value },
        cache: true,
        success: function(item) {

        }
    })
}