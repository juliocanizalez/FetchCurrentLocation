var $locationText = $('.location')

// Check for geolocation browser support and execute success method

function getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError, {timeout: 10000})
  } else {
    $locationText.text('your browser doesn\'t support geolocation')
  }
}

// get user lat,long
function geoLocationSuccess(pos) {
  var myLatitude = pos.coords.latitude
  var myLongitude = pos.coords.longitude
  var loadingTimeout
 

var loading = function() {
  $locationText.text('fetching...');
}

loadingTimeout = setTimeout(loading, 600);

var request = $.get( "https://nominatim.openstreetmap.org/reverse?format=json&lat="+myLatitude+"&lon=" + myLongitude)
    .done(function(data) {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
        $locationText.text(data.display_name);
      }
    })
    .fail(function() {
      // handle error
    });
};


function geoLocationError(error){
    var errors = { 
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    $locationText.text(`Error: ${errors[error.code]}`)
}



