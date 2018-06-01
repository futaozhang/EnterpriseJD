/**
 * 采购产品对比getCookie('Contrast')
 */



var cookieDtae = "5512841-5363894-5148309-5834183"


//对比
window.onload = function() {

    // var date = getCookie("Contrast").split(",").join("-")

    //date.substring(1)  需要传递的参数
    var j_contrast = doT.template($("#j_product").text());

    $.getJSON(baseUrl + '/goods/compare', { "skulist": cookieDtae },
        function(item) {
            $("#warp_product").html(j_contrast(item));
            diffrent()
        });

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