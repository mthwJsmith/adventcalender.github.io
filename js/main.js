$( document ).ready(function() {

  var words = ["Lorem ", "ipsum ", "delor", "sit", "amet", "consect", "adipisci", "elit,", "sed.", "Eiusmod", "tempor", "a", "enim", "minim", "season", "nulla", "dolore", "sint", "id", "est", "laboris", "ut.", "aute", "laborum", "toe"];

  var message = "";
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var scrolled = false;
  var timeDelay = 200;

  // function to reveal message
  var cardReveal = function() {
    $("#message").text(message).show();
  }  

  day=25; // uncomment to choose day

  // Only work in December
  if(month < 13) {
    // Loop through each calendar window
    $("li").each( function( index ) {
      var adventwindow = index + 1;
      var item = $(this);

      // Open past windows
      if( day !== adventwindow && adventwindow < day ) {
        document.getElementsByClassName('door')[0].className = 'dooractive';
        }

      // timeout offset for past window opening animation
      timeDelay += 100;

      // Add words so far to message variable
      if( adventwindow <= day ) {
        document.getElementsByClassName('disable')[0].className = 'active';
         }
      

      // Add jiggle animation to current day window
      if(adventwindow === day) {
        $(this).addClass("current");
        $(this).addClass("jiggle");
      }

      // On clicking a window, toggle it open/closed and
      // handle other things such as removing jiggle and 25th
      $(this).on("click", function() {
        if(adventwindow <= day) { 
          $(this).children(".door").toggleClass("open");
        }

        $(this).removeClass("jiggle");

        // If 25th, can show the message
        if(day >= 25 && adventwindow === 25) {
          messageReveal();

          // Animate scroll to message if not already done
          if(!scrolled) {
            $('html, body').animate({
              scrollTop: $("#message").offset().top
            }, 2000);
            scrolled = true;
          }
        }
      });

    });

    // If beyond 24, show message
    if(day >= 26){
      messageReveal();
    }

  }

});


//Pop up window
          function toggle_visibility(id) {
             var e = document.getElementById(id);
             if(e.style.display == 'block')
                e.style.display = 'none';
             else
                e.style.display = 'block';
          }

// Pauses videos when window closed
 var toogle = 0;

        function myFunction() {
            if (toogle === 0) {
                toogleVideo();
                toogle = 1;
            } else {
                if (toogle === 1) {
                    toogleVideo('hide');
                    toogle = 0;
                }
            }

        }

        function toogleVideo(state) {
            // if state == 'hide', hide. Else: show video
            var div = document.getElementsByTagName("iframe")[0].contentWindow;
            console.log("Inside Toogle Video1");
            func = state == 'hide' ? 'pauseVideo' : 'playVideo';
            div.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
        };