/**
 * 采购产品对比getCookie('Contrast')
 */

//对比
window.onload = function() {

    reload()

}

function reload() {
    var j_contrastC = document.getElementById('j_productC').innerHTML;
    var date = getCookie("Contrast").split(",").join("-")
    if (getCookie("loading") == 2) {
        setTimeout(function() {
            $(".add_pri ul").html(function(n) {
                return "<a href='javascript:;'><li class='addPro'>+</li></a>"
            })
        }, 40)

    } else {
        leftBut();

    };



    $.getJSON(baseUrl + '/goods/compare', { "skulist": date },
        function(json) {
            $(".checkLi").empty();
            document.getElementById('warp_product').innerHTML = doT.template(j_contrastC)(json);

            $.each(json[0].attributelist, function(i, item) {

                $(".left_li .checkLi").append(function() {

                    return "<li>" + item.name + "</li>"
                })

            })


            diffrent();
        });
}

// 删除对比栏
$("#ProductTable").delegate(".jd_text", "click", function() {
    var data = getCookie("Contrast").split(',');
    data.remove($(this).attr("data-sku"));
    setCookie("Contrast", data);
    reload()
})
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}


$("#ProductTable").delegate(".addSelect", "mouseenter", function() {

    $(this).find(".add_pri").show()
})
$("#ProductTable").delegate(".pro_t", "mouseleave", function() {

    $(this).find(".add_pri").hide()
})

//加入购物方案
$("#ProductTable").delegate(".add_pri ul a", "click", function() {


        var typeId = $(this).attr("data-typid") //购物方案Id
        var skuId = $(this).parent().attr("data-sku") //物品sku
        var tipsName = $(this).find("li").text()
        if (typeId == undefined) {
            addProgram()
            return false
        }
        addPland(typeId, skuId, getCookie("Type"), tipsName)

    })
    //加入方案提示
function addTips(text) {
    $(".tips span").text(text)
    $(".tips").show()
    setTimeout(function() {
        $(".tips").fadeOut(800);
    }, 1200)

}

function addPland(typeId, skuId, type, tipsName) {
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + "/procurementItem/addpitem",
        data: { "pid": typeId, "goodsid": skuId, "message": type, "messageid": getCookie("messageid") },
        cache: true,
        success: function(item) {

            addTips("已加入" + tipsName)
            leftBut()


        }
    })
}

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

function diffrent() {
    leftBut()
    var dif = $("#warp_product tr")
    for (var i = 1; i < dif.length; i++) {

        var defred = $(dif[i]).find(".wid")

        for (var j = 0; j < defred.length - 1; j++) {

            var jd = defred[j + 1].innerText == undefined ? defred[j].innerText : defred[j + 1].innerText;

            if (defred[j].innerText != jd) {

                $(defred).parent().parent().addClass("diffrent")
            }
        }
    }

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

                    '<video id="example_video" class="video-js vjs-default-skin vjs-big-play-centered" preload="none" autoplay="autoplay"  controls width="425" height="240" align="middle" poster="' + item[0].videoimg + '" >'

                +'<source src="' + item[0].videourl + '" type="video/mp4"/> </video></div>'
            });
        }
    }
})