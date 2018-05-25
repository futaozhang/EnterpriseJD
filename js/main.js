//测试数据
var sourDate = {
    "picname": "采购方案四"
}
var leftDate1 = {

    "picname": "自主采购方案",
    "isLive": true,
    "info": [{

            "pic_title": "Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
            "pic_jdPrice": "5220.00",
            "pic_userPrice": "4900.00",
            "pic_img": "img/text.jpg",
            "pic_value": 1


        },
        {
            "pic_title": "Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
            "pic_jdPrice": "5220.00",
            "pic_userPrice": "4900.00",
            "pic_img": "img/text.jpg",
            "pic_value": 2


        },
        {
            "pic_title": "Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
            "pic_jdPrice": "5220.00",
            "pic_userPrice": "4900.00",
            "pic_img": "img/text.jpg",
            "pic_value": 3


        },
        {
            "pic_title": "Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
            "pic_jdPrice": "5220.00",
            "pic_userPrice": "4900.00",
            "pic_img": "img/text.jpg",
            "pic_value": 4


        },
        {
            "pic_title": "Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
            "pic_jdPrice": "5220.00",
            "pic_userPrice": "4900.00",
            "pic_img": "img/text.jpg",
            "pic_value": 5


        },
        {
            "pic_title": "Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
            "pic_jdPrice": "5220.00",
            "pic_userPrice": "4900.00",
            "pic_img": "img/text.jpg",
            "pic_value": 6


        },
        {
            "pic_title": "Lenovo/联想 拯救者-R720笔记本i7独显游戏显卡 ",
            "pic_jdPrice": "5220.00",
            "pic_userPrice": "4900.00",
            "pic_img": "img/text.jpg",
            "pic_value": 7


        }
    ]
}



//左侧按钮判断



var leftTmp = doT.template($("#leftTmp").text());
// 左侧按钮数据请求
$.getJSON("./../mockData/isloading.json", { "userId": 11 },

    function(item) {

        $("#left_w").html(leftTmp(item));

    })


//左侧数据切换

var interText = doT.template($("#j_tmpl").text());

$("#leftsider").delegate(".isLogoing a", "click", function() {


    runBg(this)
    $.getJSON("./../mockData/leftData.json", { "userId": 11, "typeId": 233 },

        function(item) {

            $("#mianCont").html(interText(item));


        })
})


// 左侧弹出
function runBg(th) {


    setTimeout(function() {
        $(".Jd_footer").fadeIn()
    }, 300)
    $(".isLogoing a").removeClass("activeYellow")
    $(th).addClass("activeYellow")
    $(".leftSelct .bg").show()
    $(".leftContent").animate({ "width": "360px" })
    $(".isLogoing").animate({ "left": "360px" })
}
// 关闭左侧
$("#leftsider").delegate(".bg", "click", function() {
    $(".leftSelct .bg").hide()
    $(".Jd_footer").hide()
    $(".leftContent").animate({ "width": "0px" })
    $(".leftSelct div").animate({ "left": "0px" })
})



//全选
$("#mianCont").delegate("#all", "click", function() {

    setTimeout(function() {

        if ($("#all").prop("checked") == true) {

            $(".contents").find("input[type='checkbox']").prop("checked", true);
        } else {

            $(".contents").find("input[type='checkbox']").prop("checked", false);

        }
    }, 4)

});
//所有列表&价格计算
$("#mianCont").delegate(".checkBox input[type='checkbox']", "click", function() {
    var current = 0;
    var that = this
    var checkbox = $("#leftDate input[type='checkbox']")



    $.each(checkbox, function(i, item) {

        if ($(item).prop("checked") == false) {

            $(".l_top").find("input[type='checkbox']").prop("checked", false)

            return false;
        } else {

            $(".l_top").find("input[type='checkbox']").prop("checked", true)

        }

    });


    $.each(checkbox, function(i, item) {

        if ($(item).prop("checked") == true) {
            current++
            return false

        } else {
            console.log(this)
        }

    });
    console.log(current)
})

// 价格计算


//加减
$("#mianCont").delegate(".input_num .reduce", 'click', function() {

    var nowData = $(this).parent().find("input[type='text']").prop("value");

    if (nowData < 2) {
        return false;
    }
    $(this).parent().find("input[type='text']").prop("value", parseInt(nowData) - 1);
});


$("#mianCont").delegate(".add", 'click', function() {

    var nowData = $(this).parent().find("input[type='text']").prop("value");
    $(this).parent().find("input[type='text']").prop("value", parseInt(nowData) + 1)

});
$("#mianCont").delegate(".noCheck", "click", function() {
    $(this).hide()
    $(this).parent().find('.isCheck').css("display", "block")
});

// url  参数
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