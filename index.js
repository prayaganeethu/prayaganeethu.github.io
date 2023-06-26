// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
let getUtcAndUnixDate = function(date) {
  let utcDate = new Date(date), unixDate;
  if (utcDate == "Invalid Date") {
    if (Math.floor(date)) {
    console.log(Math.floor(date));
    utcDate = new Date(Math.floor(date));
    return { unix: Math.floor(date), utc: utcDate.toString()};
    } 
    return { error : "Invalid Date" };
  } 
  unixDate = Date.parse(utcDate);
  return { unix: unixDate, utc: utcDate};
}

app.use((err, next) => {
  if(err) return err;
  next();
})
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/", (req, res) => { 
  res.json(getUtcAndUnixDate(Date.now()));
})

app.get("/api/:date", (req, res) => {
  dateObj = getUtcAndUnixDate(req.params.date);
  res.json(dateObj);
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
