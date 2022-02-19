// this function returns the latitude and logitude of the users location

function getLocation(){

    navigator.geolocation.getCurrentPosition(success, error)

    function success(pos) {

        var crd = pos.coords;
        
        var latitude = crd.latitude;
        var longitude = crd.longitude;

        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&result_type=locality&key=AIzaSyCdxX__INpgk8QDC2jDfyAF-BtVMGaO-sA"

        console.log(url);

        fetch(url).then(function(response) {
            return response.json();
          }).then(function(data) {
            var placeNameRaw = data.results[0].formatted_address; 
            var placeName = placeNameRaw.substring(0, placeNameRaw.indexOf(','));

            // now we make a get request using our place name

            





          }).catch(function() {
            console.log("somethings not working");
          });

        
    }
        
    function error(err) {

        console.warn(`ERROR(${err.code}): ${err.message}`);

    }
}