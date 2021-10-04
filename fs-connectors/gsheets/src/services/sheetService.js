const {google} = require('googleapis');
// const fs = require('fs');

// const TOKEN_PATH = 'token.json';

const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
    ],
});
google.options({auth: auth});
const sheets = google.sheets("v4");
const drive = google.drive("v3");

module.exports = {sheets, drive};
  