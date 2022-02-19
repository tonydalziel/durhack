const app = require('./app'); // Takes the functionality from app and uses it to listen to port 8090
app.listen(8090, () =>{
    console.log('The server has successfully started on port 8090!');
}); // Listens on port 8090
