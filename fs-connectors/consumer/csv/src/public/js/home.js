var socket = io();

function init(){

    var sessionId = '';

    socket.on('connect', function (){
        sessionId = socket.io.engine.id;
        console.log('Connected ' + sessionId);
    });

    socket.on('dataUpdated', function(data){
        console.log("New Data Received");
        if(data.length > 0){
            var $dataTable = '<table id="data"><thead>';
            var keys = Object.keys(data[0])
            keys.forEach((item) => {
                $dataTable+=`<td>${item}</td>`
            });
            $dataTable+='</thead><tbody>';
            data.forEach((item, index) => {
                var counter = 0
                $dataTable+='<tr>';
                while (counter < keys.length) {
                    if(keys[counter] === "url"){
                        $dataTable+=`<td><a href="${item[keys[counter]]}">Download</a></td>`;
                    } else {
                        $dataTable+=`<td>${item[keys[counter]]}</td>`
                    }
                    counter++;
                }
                $dataTable+='</tr>';
            });
            $dataTable+='</tbody></table>';
            var $table=$("#data");
            $table.html($dataTable);
        }
    });

    socket.on('updateCompleted', function(success){
        let connStatus = document.getElementById("connection-status");
        if(success){
            connStatus.innerHTML = "✔️ Syncing Successful"
        } else {
            connStatus.innerHTML = "❌ Syncing Failed"
        }
    });

}

async function syncData(){
    socket.emit('sync_data', {});
    let connStatus = document.getElementById("connection-status");
    connStatus.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none repeat scroll 0% 0%; display: block;" width="25px" height="25px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" fill="none" stroke="#1d3f72" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
</circle>
</svg> Syncing Data`;
    
  }

$(document).on('ready', init);