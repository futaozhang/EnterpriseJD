
  adduser()
  function adduser(){
 
    var status=false;
    $.ajax({
        type: "POST",
        url: "http://pre-admin.pcshop.jd.com/appuser/adduser",
        xhrFields: {
               withCredentials: true
       },
     crossDomain: true,
    success:function(i){
            if (i.code == 200 || i.code == 304) {
               setCookie("userId", i.userid);
               $("#userName").text(i.username)
               status=true
           } else if (i.code = 201) {
               clearCookie();
               status=false
           }
},
    error:function(){    
}
})
  return status
   }


   function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}


