/**
 * 采购产品对比getCookie('Contrast')
 */



//var cookieDtae = "5512841-5363894-5148309-5834183"


//对比
window.onload = function() {

    reload()

}

function reload() {
    var date = getCookie("Contrast").split(",").join("-")

    //date.substring(1)  需要传递的参数
    var j_contrast = doT.template($("#j_product").text());

    $.getJSON(baseUrl + '/goods/compare', { "skulist": date },
        function(item) {
            $("#warp_product").html(j_contrast(item));
            diffrent()
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