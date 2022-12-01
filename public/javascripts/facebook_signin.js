window.fbAsyncInit = function() {
    FB.init({
      appId      : '1289143638311939',
      cookie     : true,
      xfbml      : true,
      version    : 'v15.0'
    });
      
    FB.AppEvents.logPageView();   
    FB.getLoginStatus(function(response) {
      console.log(response);
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  
  function checkLoginState() {
        FB.getLoginStatus(function(response) {
          FB.api('/me', {fields: 'email'}, function(response) {
            let respuesta = JSON.stringify(response.email);

            document.querySelector("#facebook-login input").value = respuesta;
            document.querySelector("#facebook-login").submit();
          });
         /* FB.api('/me', function(response) {
              console.log(JSON.stringify(response));
          });*/
          //console.log(response);
        });
      }