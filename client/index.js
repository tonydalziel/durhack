// this function returns the name of the users location
async function getLocation(){
    async function success(pos) {
        var crd = pos.coords;
        
        var latitude = crd.latitude;
        var longitude = crd.longitude;

        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&result_type=locality&key=AIzaSyCdxX__INpgk8QDC2jDfyAF-BtVMGaO-sA"


        let response = await fetch(url)
        let responseJSON = await response.text()

        var placeNameRaw = await JSON.parse(responseJSON)
        var placeNameReadable = await placeNameRaw.results[0].formatted_address;
        var placeName = await placeNameReadable.substring(0, placeNameReadable.indexOf(','));
        var bodyString = JSON.stringify({'name' : placeName})
        var bodyParsed = JSON.parse(bodyString)
        fetch("http://127.0.0.1:8090/retrieveIsland", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: bodyParsed
            }).then(res => {
            console.log("Request complete! response:", res);
        });
    }
        
    function error(err) {

        console.warn(`ERROR(${err.code}): ${err.message}`);

    }
    navigator.geolocation.getCurrentPosition(success,error);
}

// this function makes a post request with the users location, it recieves the island object

async function sendMessage(){

    let location = await getLocation();

    var messageField = document.getElementById("message");
    var message = messageField.innerText();

    var information = [message, location]

    // send information and location as a get request

}

getLocation();
