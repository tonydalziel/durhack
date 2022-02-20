

// this function obtains the name of the users location and makes a post request which returns the islandObject
navigator.geolocation.getCurrentPosition(success,error);

var coordinates = []

function success(pos) {

    var crd = pos.coords;
    
    var latitude = crd.latitude;
    var longitude = crd.longitude;

    coordinates = [latitude, longitude]

}
    
function error(err) {

    console.warn(`ERROR(${err.code}): ${err.message}`);

}


async function generate(){

    if (coordinates.length < 2){

        setTimeout(generate, 250)
    }
    else {

        // take latitude and longitude and put here
        var latitude = coordinates[0]
        var longitude = coordinates[1]

        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&result_type=locality&key=AIzaSyCdxX__INpgk8QDC2jDfyAF-BtVMGaO-sA"

        let response = await fetch(url)
        let responseJSON = await response.text()

        var placeNameRaw = await JSON.parse(responseJSON)
        var placeNameReadable = await placeNameRaw.results[0].formatted_address;
        var placeName = await placeNameReadable.substring(0, placeNameReadable.indexOf(','));
        var bodyString = JSON.stringify({'name' : placeName})
        var bodyParsed = JSON.parse(bodyString)


        return bodyParsed;
    }
}



async function getIslandObject(){

    var location = await generate()

    if (typeof location != "object"){

        setTimeout(getIslandObject, 250)
    }
    else {

        await fetch("http://127.0.0.1:8090/retrieveIsland", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(location)
            }).then(response => response.json())
            .then(data => {
                islandID = data.islandID;
                //Make function here to get the bottles list
                // let response = await fetch("http://127.0.0.1:8090/washedUpBottles?islandId="+islandID)
                // let responseJSON = await response.text()
                // var placeNameRaw = await JSON.parse(responseJSON)
                // var placeNameReadable = await placeNameRaw.results[0].formatted_address;
                // var placeName = await placeNameReadable.substring(0, placeNameReadable.indexOf(','));
                // var bodyString = JSON.stringify({'name' : placeName})
                // var bodyParsed = JSON.parse(bodyString)


                // return bodyParsed;
                function returnMapKey(){
                    if(typeof data.mapKey != 'string'){
                        setTimeout(() => {
                            returnMapKey()
                        }, 250);
                    }else{
                        console.log(data.mapKey)
                        testMapKey = data.mapKey
                        return data.mapKey
                    }
                }
              
                return returnMapKey()
            });
        }
}

