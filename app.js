const express = require('express'); // Server uses express, fs, and multer
const res = require('express/lib/response');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client'));
const mysql = require('mysql');

// Create connection to DB
const db = mysql.createConnection({
  host: 'localhost',
  user:'root',
  database: 'bottledmessages'
});

//Connect
db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log('MySql Connected...')
});


app.post('/retrieveIsland', function (req, resp) { 
  if (typeof req.body === 'undefined') {
    resp.status(400).end();
  }
  const location = req.body.name;
  findLocation = `SELECT * FROM islands WHERE locationName = "${location}"`;
  db.query(findLocation,(err,result)=>{
    if(err) throw err;
    if(result == []){
      //Create a new island
      //Generate map key here and set it equal to mapKey
      let mapKey; 
      //mapKey format = islandName? islandInfo - islandInfo = l1 = [l2=[r,],[]]
      
      //gen island info 
      islandInfo = []
      
      noOfIslands = Math.floor(Math.random() * (6 - 3) ) + 3;

      for (let i = 0; i < noOfIslands.length; i++) {
        islandInfo.append([Math.floor(Math.random() * (120 - 80) ) +80,Math.floor(Math.random() * (10 - 7) ) + 7])
      }


      mapKey = location.toString()+"?"+islandsInfo.toString()+"?";



      var today = new Date();  
      var accessed = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      setOfValues = [[accessed,location,mapKey]]
      var createIsland = "INSERT INTO islands (lastAccessed, locationName, mapKey) VALUES ?";
      db.query(createIsland, setOfValues, function (err, result) {
        if (err) throw err;
        console.log("Island inserted");
      });
      console.log(setOfValues)
      //Should return
    }else{
      
    }
  });
  // Process the location data here -> city name
  // Cross reference with the database 
  // Return information from the database about the island and format correclty for the front end
});

//Remove an island if not active for over a week -> move all bottles to closest island
//Use a timer in the server to recursively check island activity

//Remove a bottle if not clicked for over a day -> randomly allocate
//Use a timer in the server to recursively check bottle activity

//GET island ID -> List of bottles
app.get('/washedUpBottles', function (req, resp) {
  if (typeof req.query.islandId === 'undefined') {
    resp.status(400).end();
  }
  islandId = req.query.islandId
  //Search through database for bottles washed up
  //Return list of bottleID's
});

//POST location, new message -> Message sent (would need UserID if we implement users)
//Maybe message people that have recently visited that island -> Use logins
app.post('/sendMessage', function (req, resp) {
  if (typeof req.body.message === 'undefined') {
    resp.status(400).end();
  }
  const message = req.body.message;
  //Add the message to the database and return information on where the bottle was sent too via a string
});

//POST bottleID / location -> Have to match up in order to access the message
app.post('/retrieveMessage', function (req, resp) {
  if ((typeof req.body.locationDetails === 'undefined') || (typeof req.body.bottleId === 'undefined')) {
    resp.status(400).end();
  }
  const location = req.body.locationDetails;
  //Ensure location name matches bottle location fetched using the bottle ID
  //Retrieve and return the message placed within the bottle
});

//Leave tracking for later on -> Each bottle would be linked to a user ID

//POST UserID ID -> list of bottles sent w/ (messages / location by name)


module.exports = app; // Exports anything from this file to app -> Used by the server file (making it easier to swap between APIs)
