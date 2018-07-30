jQuery.support.cors = true;
adduser()

function adduser() {
    var status = false;
    $.ajax({
        type: "POST",
        async: false,
        //   url: "http://pcshop-api.jd.com/appuser/adduser",
        url: "//pre.pcshop.jd.com/appuser/adduser",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true == !(document.all),
        success: function(i) {
            if (i.code == 200 || i.code == 304) {
                $("#userName").text(decodeURI(i.username))
                status = true
            } else if (i.code = 201) {
                status = false
            }
        },
        error: function() {

        }
    })
    return status
}


function setCookie(name, value, time) {
    time == undefined ? time = 5 : time = time;
    //alert(time)
    var exp = new Date();
    exp.setTime(exp.getTime() + 8 * time * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}