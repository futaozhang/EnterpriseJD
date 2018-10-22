var runDate = []


//手风琴数据
var j_run = document.getElementById('j_runBaner').innerHTML;
// $.ajax({
//         dataType: "jsonp",
//         url: baseUrl + "/scene/list",
//         success: function(data) {

//         },
//         error: function(XMLHttpRequest, textStatus, errorThrown) {
//             // alert(XMLHttpRequest.status);
//             // alert(XMLHttpRequest.readyState);
//             // alert(textStatus);
//         }

//     })
$.getJSON(baseUrl + "/scene/list", function(item) {
    if (item.length != 0) {
        document.getElementById('mainList').innerHTML = doT.template(j_run)(item);
        $(".pic").css("width", "" + parseInt(740 + 60 * item.length) + "px");
        runder()
        return false
    }
    document.getElementById('mainList').innerHTML = doT.template(j_run)(runDate);
    return false
});

var current = 0;



//主页滑动	

$("#mainList").delegate("li", "mouseenter", function() {

    $(".pic .txt").css("background-color", '#b4b4b4');
    $(this).find('.txt').css("background-color", '#7b7b83');
    $(this).stop(true).animate({ width: "800px" }, 1000).siblings().stop(false).animate({ width: "60px" }, 1000);

})

window.onload = function() {
        leftBut();
    }
    //轮播方式

$(".leftSelct").animate({ "display": "none", "z-index": "-1" }, 1200)

function runder() {

    $(".pic .txt").css("background-color", '#b4b4b4');
    if (current >= $(".pic ul li").length) {
        current = 0

    } else {

        $(".pic ul li").eq(current).find('.txt').css("background-color", '#7b7b83');
        $(".pic ul li").eq(current).stop(true).animate({ width: "800px" }, 1000).siblings().stop(false).animate({ width: "60px" }, 1000);
        current++

    }


};



//首页弹框
$("#mainList").delegate(".selcetor", 'click', function() {

    if (window.innerHeight < 600) {
        $(".alertBox .alertContent").css("top", '0px')
        $("#index").css("overflow", "hidden")
        $(".alertc").css({ "overflow": "scroll", "height": "490px" })
    }
    alertTem($(this).attr("data-jum"))

    //设置选择类目
    setCookie("Type", $(this).find(".p1").text().trim().replace(/\s/g, ""))
    setCookie("messageid", $(this).attr("data-jum"))

});

$("#alert_t").delegate(".over_a li", "click", function() {
    if ($(this).hasClass("activeLi")) {
        $(this).removeClass("activeLi")
        $(this).find("img").css("opacity", 1);
    } else {
        $(this).addClass("activeLi")
        $(this).find("img").css("opacity", 0.4);
    }

})

//数据提交
$("#alert_t").delegate(".submit", "click", function() {
    var j = [];
    $.each($(".alertBody").find(".must"), function(i) {
        isCheck()
        if (!$(this).hasClass("re")) {

            j.push(i)
        }
    })

    junstrund(j)
})

//页面跳转
function junstrund(i) {
    if ($("input[name=noType]:checked").val() == undefined) {

        alertAdsf()
        return false;
    }

    if (i == 0) {
        window.location = "Purchase.html"
    } else {
        alertAdsf()
    }

}

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
//选中判断
function isCheck() {
    var href = []
    var slectorType = []
        //品牌
    $.each($(".over_a").find("li"), function() {

            if ($(this).hasClass("activeLi")) {
                href.push($(this).attr("data-id"))
            }

        })
        //必选
    $.each($(".alertBody").find(".must"), function(i) {

        if ($(this).hasClass("re")) {

        } else {
            $(this).addClass("addBorder")

        }

    })

    //品牌
    setCookie("categoryid", $('input[name="noType"]:checked').val())
        // 类型不同清除对比
    if ($('input[name="noType"]:checked').val() == getCookie("categoryid")) {
        if (getCookie("Contrast") != "" || getCookie("Contrast") != null) {
            delCookie("Contrast")

        }
    }
    //图标
    href.length != 0 ? href = href : href.push("")
    setCookie("bidlist", href.join("-"))
        //
    $.each($(".alertBody").find(".alist input"), function(i) {

        if ($(this).prop("checked") == true) {
            slectorType.push($(this).val())
        }

    })
    setCookie("slectorType", slectorType.join("-"))
}


//必选单个点击判断
$("#alert_t").delegate(".must input", "click", function() {
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



var alert_w = document.getElementById('alert_w').innerHTML;

//弹出框数据
function alertTem(id) {
    $.getJSON(baseUrl + "goodsAttribute/getalist", { "sceneid": id }, function(item) {
            console.log(item)
            if (item.length != 0) {
                document.getElementById('alert_t').innerHTML = doT.template(alert_w)(item);
                $(".alertBox").show()
            }
            return false
        })
        // $.ajax({
        //     dataType: 'jsonp',
        //     url: baseUrl + "/goodsAttribute/getalist",
        //     data: { "sceneid": id },
        //     cache: true,
        //     success: function(item) {
        //         console.log(item)
        //         document.getElementById('alert_t').innerHTML = doT.template(alert_w)(item);
        //         $(".alertBox").show()
        //     }
        // })

    //设置必选标识
}


function hide() {
    $("#index").css("overflow", "auto")
    $(".alertc").css({ "overflow": "auto", "height": "550px" })
    $(".alertBox .alertContent").css("top", '80px')
    $(".alertBox").hide()
}

/**-------------IE 兼容-----------------------------*/
// 首页  默认选框样式设置
$.each($("#mainList li .txt"), function(i, item) {

    if (i == 0) {
        $(this).css("background-color", '#7b7b83')
    }
});
leftBut();
$("#alert_t").delegate(".reset", "click", function() {
    $(".over_a li").removeClass("activeLi")
    $(".over_a li").find("img").css("opacity", 1);
    $(".must").removeClass("re")
    $.each($(".alertBody").find("input"), function(i) {

        $(this).prop("checked", false)

    })
})