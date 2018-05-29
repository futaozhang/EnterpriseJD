/**
 * 采购产品对比getCookie('Contrast')
 */


var j_contrast = doT.template($("#j_product").text());

$.getJSON('./../mockData/text.json',

    function(item) {


        $("#warp_product").html(j_contrast(item));



    });

//对比
window.onload = function() {

    var dif = $("#warp_product tr")

    function diffrent() {
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
    diffrent()
}