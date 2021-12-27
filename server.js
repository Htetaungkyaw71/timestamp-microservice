// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

var result = {}

app.get("/api/:date", function (req, res) {
  let date = req.params.date
  if(date.includes('-')){
    let d = new Date(date)
    let a = d.getTime()
    let b = d.toUTCString()
    result['unix'] = a
    result['utc'] = b
    if(!result['unix'] || !result['utc']){
      res.json({error:"Invalid Date"})
    }
    else{
      res.json(result);
    }
  }
 
  else{ 
    let timestamp = parseInt(date)
    console.log(timestamp.length)
    if(timestamp < 33){
      let c = new Date(date).getTime()
      let e = new Date(date).toUTCString()
      result['unix'] = c
      result['utc'] = e
      if(!result['unix'] || !result['utc']){
        res.json({error:"Invalid Date"})
      }
      else{
        res.json(result);
      }
    }
    else{
      let c = new Date(timestamp).getTime()
      let e = new Date(timestamp).toUTCString()
      result['unix'] = c
      result['utc'] = e
      if(!result['unix'] || !result['utc']){
        res.json({error:"Invalid Date"})
      }
      else{
        res.json(result);
      }
      
    }
 
  }
  

});



app.get("/api", function (req, res) {
  let mili = new Date().getTime()
  let today = new Date().toUTCString()
  res.json({unix:mili,utc:today})

});






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
