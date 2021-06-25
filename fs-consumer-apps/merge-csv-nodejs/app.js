// Start REST server
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
var data = []
// var data_count = 0;

// just use JSON body data
app.use(bodyParser.json({
  inflate: true,
  limit: '100mb'
}));

app.use(express.static('public'))
app.set('view engine', 'ejs');

// Start web page /
app.get('/', function (req, res) {
  if(data.length > 0)
    res.render('home', {data:data})
  else
    res.send("Waiting for producer to send data.")
});

// Receive Message
app.post('/post_data', function (req, res) {

  try {
    var req_body = req.body;
    console.log('req_body ', JSON.stringify(req_body));
    req_body.forEach(item => {
      data.push(item)
    });
    // data[data_count] = (JSON.stringify(req_body));
    // data_count ++;

    res.end('OK');
  } catch (e) {
    console.log(e);
  }
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("REST API listening at http://%s:%s", host, port);
});
