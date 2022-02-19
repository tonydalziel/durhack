// this function returns the name of the users location

async function getLocation(){

    navigator.geolocation.getCurrentPosition(success, error)

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

        return placeName;

    }
        
    async function error(err) {

        console.warn(`ERROR(${err.code}): ${err.message}`);

    }
}

// this function makes a post request with the users location, it recieves the island object

async function getIslandObject(){

    let location = await getLocation();

    
    fetch("http://127.0.0.1:8090/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(location)
        }).then(res => {
        console.log("Request complete! response:", res);
    });


}

async function sendMessage(){

    let location = await getLocation();

    var messageField = document.getElementById("message");
    var message = messageField.innerText();

    var information = [message, location]

    // send information and location as a get request


}

getIslandObject(); 