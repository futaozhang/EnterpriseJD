var runDate = [{
        "run_img": "img/pc1.png",
        "run_title": "日常办公",
        "run_Entitle": "OFFICING",
        "run_icon": "./img/rc35x34.png",
        "id": "1"
    },
    {
        "run_img": "img/pc2.png",
        "run_title": "高层管理",
        "run_Entitle": "MANAGER",
        "run_icon": "./img/gc35x34.png",
        "id": "1"
    },
    {
        "run_img": "img/pc3.png",
        "run_title": "商务便携",
        "run_Entitle": "TECGNOLOGY",
        "run_icon": "./img/sw35x34.png",
        "id": "1"
    },
    {
        "run_img": "img/pc4.png",
        "run_title": "技术研发",
        "run_Entitle": "TECGNOLOGY",
        "run_icon": "./img/js35x34.png",
        "id": "1"
    },

    {
        "run_img": "img/pc2.png",
        "run_title": "视觉设计",
        "run_Entitle": "DESIGNER",
        "run_icon": "./img/sj35x34.png",
        "id": "1"
    }
]


//手风琴数据
var j_run = document.getElementById('j_runBaner').innerHTML;
document.getElementById('mainList').innerHTML = doT.template(j_run)(runDate);

var current = 0;
var MainSet = setInterval(runder, 4000);
//主页滑动	
$(".pic ul li").click(function(item) {

        //window.clearTimeout(MainSet)	
        $(".pic .txt").css("background-color", '#b4b4b4');
        $(this).find('.txt').css("background-color", '#7b7b83');
        $(this).stop(true).animate({ width: "800px" }, 1000).siblings().stop(false).animate({ width: "60px" }, 1000);


    })
    //定时轮播

$(".pic ul li").mouseleave(function() {

    MainSet = setInterval(runder, 3000);

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

$("#alert_t").delegate(".over_a li", "click", function() {
    $(this).addClass("activeLi")
})

//数据提交
$("#alert_t").delegate(".submit", "click", function() {

    if (isCheck().length < 1) {

        alert("请完成必选项目")
        return false;
    } else {
        var addHref = isCheck().join("-")
        setCookie("selcet", addHref)
        window.location = "purchase.html"
    }

})

//必选点击判断
$("#alert_t").delegate(".must input", "click", function() {

    if ($(this).prop("checked") != false) {
        $(this).parent().addClass("re")
        $(this).parent().removeClass("addBorder")
    } else {
        $(this).parent().removeClass("re")
        $(this).parent().addClass("addBorder")
    }

})


//选中判断
function isCheck() {
    var href = []
        //多选
    $.each($(".alertBody").find("input[type='checkbox']"), function() {

            if ($(this).prop("checked") != false) {

                href.push($(this).val())
            }
        })
        //品牌
    $.each($(".over_a").find("li"), function() {

            if ($(this).hasClass("activeLi")) {
                href.push($(this).attr("data-id"))

            }
        })
        //单选
    $.each($(".alertBody").find("input[type='radio']"), function() {

            if ($(this).prop("checked") != false) {

                href.push($(this).val())
            }
        })
        //必选
    $.each($(".alertBody").find(".must"), function() {
        if ($(this).hasClass("re")) {} else {
            $(this).addClass("addBorder")
            href = ""
        }
    })

    return href

}
var alert_w = document.getElementById('alert_w').innerHTML;

//弹出框数据
function alertTem(id) {


    // $.getJSON(baseUrl + "/getalist", { "sceneid": id }, function(item) {
    $.getJSON("./../mockData/just.json", { "sceneid": id }, function(item) {
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
    $(".alertc").css({ "overflow": "auto", "height": "600px" })
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

$('#index').delegate(".noLogoing", 'click', function() {
    login()
});