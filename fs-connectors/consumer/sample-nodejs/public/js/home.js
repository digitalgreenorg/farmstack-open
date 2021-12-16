function init(){
    var socket = io();

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
                    $dataTable+=`<td>${item[keys[counter]]}</td>`
                    counter++;
                }
                $dataTable+='</tr>';
            });
            $dataTable+='</tbody></table>';
            var $table=$("#data");
            $table.html($dataTable);
        }
    });
}

$(document).on('ready', init);