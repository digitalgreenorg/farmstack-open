const express = require("express");
const bodyParser = require('body-parser');
const {sheets, drive} = require("./services/sheetService");
const fs = require('fs-extra');
const { config } = require("./config");
const path = require('path');


const app = express();
const port = 3001;


app.use(bodyParser.json({
  inflate: true,
  limit: '100mb'
}));

app.use(
    express.urlencoded({
    extended: true,
  })
);

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index", {config: config})
});

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]; //TODO make a function for column calculation

async function createSheet(){
    const result = await sheets.spreadsheets.create({
        resource: {
            properties: {
                title: config.sheet_title
            }
        }
    });
    config.spreadsheet = result.data;
    console.log("Sheet Created: "+config.sheet_title);
}

async function updatePermissions(permission){
  const driveResult = await drive.permissions.create({
    resource: permission,
    fileId: config.spreadsheet.spreadsheetId,
    fields: 'id',
  });
  console.log("Sheet permission set for: "+permission.emailAddress);
  return driveResult.data;
}

app.post('/data', async (req, res) => {
  console.log("HTTP POST /data");
  const spreadsheet = config.spreadsheet
  if(spreadsheet===null){
    console.log("Email not initialized.");
    res.json({
      error: {message: "Email not initialized."}, 
    });
  } else {
    try{
      const req_body = req.body;
      let values = []
      if(req_body.length>0){
        if(spreadsheet == null){
          console.log("Sheet created and permission assigned");
        }
        let keys = Object.keys(req_body[0]);
        values.push(keys);
        req_body.forEach(element => {
          let v = []
          keys.forEach((k, i) => {
            v.push(element[k]);
          });
          values.push(v);
        });
        const range = 'A1:'+alphabet[keys.length-1].toUpperCase()+''+values.length
        const resource = {
          values,
        }
        var result = sheets.spreadsheets.values.update({
          spreadsheetId: spreadsheet.spreadsheetId,
          resource,
          range,
          valueInputOption: "RAW"
        });
        console.log("Data Synced to Sheet: "+spreadsheet.spreadsheetId);
        res.json({
          success: (await result).data, 
        });
      } else {
        res.json({
          error: {message: "Received Empty Data"}, 
        });
      }
      
    } catch(err){
        console.log(err);
        res.json({error: err});
    }
  }
});

app.post('/configure', async (req, res) => {
  config.sheet_title = req.body.sheet_title;
  var permission = {
    'type': 'user',
    'role': 'writer',
    'emailAddress': req.body.email
  }
  if(config.spreadsheet == null){
    await createSheet();
  } else {
    let requests = [];
      // Change the spreadsheet's title.
      requests.push({
        updateSpreadsheetProperties: {
          properties: {
            title: config.sheet_title,
          },
          fields: 'title',
        },
      });
      const batchUpdateRequest = {requests};
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: config.spreadsheet.spreadsheetId,
        resource: batchUpdateRequest
      });
  }
  if(req.body.email !== config.email){
    config.email = req.body.email;
    await updatePermissions(permission);
  }
  fs.writeJSON("savedConfig.json", config);
  res.redirect('/');
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Gsheet app listening at http://0.0.0.0:${port}`)
});