//采购对比
var k_tmpl = document.getElementById('k_tempelate').innerHTML;

// $.getJSON("./../mockData/compared.json",function(d){
// 	console.log(d)

// });

$.getJSON("./../mockData/compared.json", function(item) {

    document.getElementById('warp_content').innerHTML = doT.template(k_tmpl)(item);

    pricCom()
});



$("#Compared").delegate(".ul_num .reduce", 'click', function() {

    var nowData = $(this).parent().find("input[type='text']").prop("value");

    if (nowData < 2) {
        return false;
    }
    $(this).parent().find("input[type='text']").prop("value", parseInt(nowData) - 1);
});


$("#Compared").delegate(".add", 'click', function() {

    var nowData = $(this).parent().find("input[type='text']").prop("value");
    $(this).parent().find("input[type='text']").prop("value", parseInt(nowData) + 1)

});


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