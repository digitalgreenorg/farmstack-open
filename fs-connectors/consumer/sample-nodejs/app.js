// Start REST server
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors:true,
  origins:["http://127.0.0.1:8081"]
});

var data = []

// just use JSON body data
app.use(bodyParser.json({
  inflate: true,
  limit: '100mb'
}));

app.use(express.static('public'))
app.set('view engine', 'ejs');

// Start web page /
app.get('/', function (req, res) {
    res.render('home', {data:data})
});

// Receive Message
app.post('/post_data', function (req, res) {

  try {
    var req_body = req.body;
    console.log('req_body ', JSON.stringify(req_body));
    req_body.forEach(item => {
      data.push(item)
    });
    io.emit("dataUpdated", data)
    res.end('OK');
  } catch (e) {
    console.log(e);
  }
});

http.listen(8081, function () {
  var host = "127.0.0.1";
  var port = 8081;
  console.log(`REST API listening at http://${host}:${port}`);
});

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  })
})