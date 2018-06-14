var runDate = [{
        "thumbnail": "img/pc1.png",
        "name": "日常办公",
        // "run_Entitle": "OFFICING",
        "icon": "./img/rc35x34.png",
        "id": "5"
    },
    {
        "thumbnail": "img/pc2.png",
        "name": "高层管理",
        // "run_Entitle": "MANAGER",
        "icon": "./img/gc35x34.png",
        "id": "4"
    },
    {
        "thumbnail": "img/pc3.png",
        "name": "商务便携",
        // "run_Entitle": "TECGNOLOGY",
        "icon": "./img/sw35x34.png",
        "id": "2"
    },
    {
        "thumbnail": "img/pc4.png",
        "name": "技术研发",
        // "run_Entitle": "TECGNOLOGY",
        "icon": "./img/js35x34.png",
        "id": "3"
    },

    {
        "thumbnail": "img/pc2.png",
        "name": "视觉设计",
        // "run_Entitle": "DESIGNER",
        "icon": "./img/sj35x34.png",
        "id": "1"
    }
]


//手风琴数据
var j_run = document.getElementById('j_runBaner').innerHTML;

$.getJSON(baseUrl + "/scene/list", function(item) {
    if (item.length != 0) {
        document.getElementById('mainList').innerHTML = doT.template(j_run)(item);
        return false
    }
    document.getElementById('mainList').innerHTML = doT.template(j_run)(runDate);
    return false
})


var current = 0;
var MainSet = setInterval(runder, 55000);
//主页滑动	
$("#mainList").delegate("li", "click", function() {

    $(".pic .txt").css("background-color", '#b4b4b4');
    $(this).find('.txt').css("background-color", '#7b7b83');
    $(this).stop(true).animate({ width: "800px" }, 1000).siblings().stop(false).animate({ width: "60px" }, 1000);


})


//zhan

$(".pic ul li").mouseleave(function() {

    MainSet = setInterval(runder, 5500);

});

$(".pic ul li").mouseenter(function() {

    window.clearInterval(MainSet);
});
//轮播方式

$(".leftSelct").animate({ "display": "none", "z-index": "-1" }, 1200)
runder()

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
    setCookie("Type", $(this).siblings().find(".p1").text().trim().replace(/\s/g, ""))


});

$("#alert_t").delegate(".reset", "click", function() {
    $(".over_a li").removeClass("activeLi")
    $.each($(".alertBody").find("input"), function(i) {

        $(this).prop("checked", false)

    })
})

$("#alert_t").delegate(".over_a li", "click", function() {
        $(this).addClass("activeLi")
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

    if (i == 0) {
        window.location = "purchase.html"
    } else {
        alert("请完成必选项目")
    }

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
        //图标
    href.length != 0 ? href = href : href.push(" ")
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

    if ($(this).prop("checked") != false) {
        $(this).parent().addClass("re")
        $(this).parent().removeClass("addBorder")


    } else {

        $(this).parent().removeClass("re")
        $(this).parent().addClass("addBorder")


    }



})







var alert_w = document.getElementById('alert_w').innerHTML;

//弹出框数据
function alertTem(id) {


    $.getJSON(baseUrl + "/goodsAttribute/getalist", { "sceneid": id }, function(item) {

        if (item.length != 0) {
            document.getElementById('alert_t').innerHTML = doT.template(alert_w)(item);
            $(".alertBox").show()
            $(".tem").parent().parent().addClass("must")
        }
        return false
    })

    //设置必选标识


}


function hide() {
    $("#index").css("overflow", "auto")
    $(".alertc").css({ "overflow": "auto", "height": "580px" })
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

// $('#index').delegate(".noLogoing", 'click', function() {
// //     login()
// // })