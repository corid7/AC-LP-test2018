$( document ).ready(function() {

  // Get started!
//alert(dateCET.getHours()+":"+dateCET.getMinutes());
//alert(dateCET.getDay());

// call link function. If during biz hours, make call, if off hours, display open hours
  $(".callnow").click(function(){
    function getDate(offset){
      var now = new Date();
      var hour = 60*60*1000;
      var min = 60*1000;
      return new Date(now.getTime() + (now.getTimezoneOffset() * min) + (offset * hour)); //GMT
    }
    var dateCET = getDate(-7); // GMT to PST -7
    var day = dateCET.getDay();
    var hour = dateCET.getHours();
    if ((day == 0)&&(hour>=8)&&(hour<=14)){ var call = 'yes'; }
    else if ((day == 7)&&(hour>=8)&&(hour<=16)){ var call = 'yes'; }
    else if ((hour>=7)&&(hour<=16)){ var call = 'yes'; }
    else { var call = 'no'; }
    if (call == 'yes'){
      $.getJSON( "https://www.algaecal.com/wp-json/acf/v3/options/options/default_phone_number", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
          var phone = val;
          window.location.href="tel://"+phone;
        });
      });
    } else {
      alert("Please call during regular business hours:\nMonday–Friday: 7:00am to 4:00pm (PST)\nSaturday: 8:00am to 4:00pm (PST)\nSunday: 8:00am to 2:00pm (PST)");
    }
  });

//display 7yr copy from api in guarantee modal
  $('#details').on('show.bs.modal', function () {
    $.getJSON( "https://www.algaecal.com/wp-json/acf/v3/options/options/7yr_full_copy", function( data ) {
      var items = [];
      $.each( data, function( key, val ) {
        items.push( "<div id='" + key + "'>" + val + "</div>" );
      });
 
      $( "<div/>", {
        "class": "this-modal",
        html: items.join( "" )
      }).appendTo( "#details .content" );
    });
  })

// Video cecdwaq3dz; show products 2:13 seconds into video
$("#products").hide(); 
window._wq = window._wq || [];
_wq.push({ id: "cecdwaq3dz", onReady: function(video) {
  video.bind("timechange", function(t) {
    if (t > 133) {
      $("#products").show("slow");
      return video.unbind;
    }
  });
}});

});
