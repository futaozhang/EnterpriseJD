var runDate = [{
        "run_img": "img/pc1.png",
        "run_title": "日常办公",
        "run_Entitle": "OFFICING",
        "run_icon": "./img/rc35x34.png"
    },
    {
        "run_img": "img/pc2.png",
        "run_title": "高层管理",
        "run_Entitle": "MANAGER",
        "run_icon": "./img/gc35x34.png"
    },
    {
        "run_img": "img/pc3.png",
        "run_title": "商务便携",
        "run_Entitle": "TECGNOLOGY",
        "run_icon": "./img/sw35x34.png"
    },
    {
        "run_img": "img/pc4.png",
        "run_title": "技术研发",
        "run_Entitle": "TECGNOLOGY",
        "run_icon": "./img/js35x34.png"
    },

    {
        "run_img": "img/pc2.png",
        "run_title": "视觉设计",
        "run_Entitle": "DESIGNER",
        "run_icon": "./img/sj35x34.png"
    }
]


//手风琴数据
var j_run = document.getElementById('j_runBaner').innerHTML;
document.getElementById('mainList').innerHTML = doT.template(j_run)(runDate);


//
var alert_h = document.getElementById('alert_h').innerHTML;
document.getElementById('alert_img_h').innerHTML = doT.template(alert_h)(runDate);

var alert_hs = document.getElementById('alert_hs').innerHTML;
document.getElementById('alert_img_hs').innerHTML = doT.template(alert_hs)(runDate);

//



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
    alert(window.innerHeight)
    if (window.innerHeight < 600) {
        $(".alertBox .alertContent").css("top", '0px')
        $("#index").css("overflow", "hidden")
        $(".alertc").css({ "overflow": "scroll", "height": "550px" })
    }

    $(".alertBox").show()
});

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