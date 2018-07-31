  jQuery.support.cors = true;
  adduser()

  function adduser() {
      var status;
      $.ajax({
          url: "//pre.pcshop.jd.com/appuser/adduser",
          dataType: 'jsonp',
          xhrFields: {
              withCredentials: true
          },
          success: function(i) {
              if (i.code == 200 || i.code == 304) {
                  $("#userName").text(decodeURI(i.username));
                  status = true;
                  setCookie("loading", '1')
                  return status;
              } else if (i.code == 201) {
                  $("#userName").text(decodeURI("未登录"));
                  setCookie("loading", '2')
                  status = false;
                  return status;
              };
          },
          error: function() {
              status = false;
              return status
          }
      })


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