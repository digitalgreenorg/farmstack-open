// Start REST server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors:true,
  origins:["http://127.0.0.1:8081"]
});

const converter = require("json-2-csv");
const fs = require('fs');
const fetch = require("node-fetch");

const csv_folder = "files/"

const sync_url = process.env.SYNC_URL || "http://localhost:9003/data/sync"

var data = []

// just use JSON body data
app.use(bodyParser.json({
  inflate: true,
  limit: '100mb'
}));

app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs');

// Start web page /
app.get('/', function (req, res) {
    res.render('home', {data:data})
});

// Receive Message
app.post('/data', function (req, res) {

  try {
    var req_body = req.body;
    console.log('req_body ', JSON.stringify(req_body));
    converter.json2csv(req_body, (err, csv) => {
      if(err){
        console.log(err);
      }
      filename = `data_${new Date().toJSON().slice(0,19).replace("T","_")}.csv`;
      fs.mkdirSync(path.join(__dirname, '/public', csv_folder), {recursive: true});
      fs.writeFileSync(path.join(__dirname, '/public', csv_folder, filename), csv);

      var newFile = {
        filename,
        url: path.join(csv_folder, filename)
      }
      data.unshift(newFile);
      io.emit("dataUpdated", data)
      res.json({
        success: true, 
      });
    });
  } catch (e) {
    console.log(e);
    res.json({error: e});
  }
});

http.listen(8081, function () {
  var host = "127.0.0.1";
  var port = 8081;
  console.log(`REST API listening at http://${host}:${port}`);
});

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);
  socket.emit('dataUpdated', data);
  // socket.on('connect', function() {
    
  // })
  socket.on('sync_data', async function(data){
    console.log("syncing_data", data);
    try{
      
      const response = await fetch(sync_url, {
        method: 'GET'
      })
      const json = await response.json()
      socket.emit('updateCompleted', json.success);
    } catch(err){
        console.log(err);
        socket.emit('updateCompleted', false);
    }
  })
  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  })
})