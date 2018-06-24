// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp",(req,res) => {
  let date = new Date();
  let resJson = {
    "unix": date.getTime(),
    "utc": date.toUTCString()
  };
  res.json(resJson);
});

app.get("/api/timestamp/:dateString",(req,res) => {
  let datePattern = /^(\d{4})-0?(\d{1,2})-0?(\d{1,2})$/;
  let resJson = {"error": "Invalid Date"};
  
  let dateString = req.params.dateString;
  if(dateString && datePattern.test(dateString)){
    let parsedDate = new Date(dateString);
    if(parsedDate != "Invalid Date"){
      resJson = {
        "unix": parsedDate.getTime(),
        "utc": parsedDate.toUTCString()
      };
    }
  }
  res.json(resJson);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});