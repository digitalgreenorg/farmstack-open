function changeTab(tabName = 'source') {
    const selectTab = document.getElementById(`${tabName}-tab`);
    selectTab.click();
}


$(document).ready(function(){
    $( "#consumer_name" ).change(function() {
        destination_name = $("#consumer_name").val()
        $('#destination_name').html(destination_name);
    });

    $( "#provider_name" ).change(function() {
        source_name = $("#provider_name").val()
        $('#source_name').html(source_name);
    });

    $( "#submit" ).click(function() {
        var data = JSON.stringify([
            {
              "name": $("#provider_name").val(),
              "connector_type": "provider",
              "status": "active"
            },
            {
              "name": $("#consumer_name").val(),
              "connector_type": "consumer",
              "status": "active"
            }
        ]);
          
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            window.location.href = '/status';
        }
        });
        
        xhr.open("POST", "http://127.0.0.1:8000/connector_api/run_local/");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cookie", "csrftoken=VDCAygOx52igW4LXYI2RtlrMlKTo3084NuirzSR0qxn0oKscJCguCaqnLlZdUKBU");
        
        xhr.send(data);
    });
})