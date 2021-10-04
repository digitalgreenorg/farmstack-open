function changeTab(tabName = 'init', restrict = false) {
    const selectTab = document.getElementById(`${tabName}-tab`);
    selectTab.click();

    const prevBtn = document.getElementById(tabName).querySelector('.btn-container-right > button:first-child');
    if (restrict) {
        observeType('consumer');
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    var alertElement = $("#alert")
    alertElement.addClass("invisible")
    alertElement.removeClass("visible")
}

function observeRoute() {
    const currentLocation = window.location.href;
    const links = document.querySelectorAll('.fs-sidebar-list-item a');

    links.forEach((link) => {
        (currentLocation.startsWith(link.href)) ? link.parentElement.classList.add('active') : link.parentElement.classList.remove('active') ;
    });
}

function sidebarIconView() {
    const sidebar = document.querySelector('.fs-sidebar');
    const mainContent = document.querySelector('.fs-main-content');
    let list = sidebar.classList;
    sidebar.classList.toggle('fs-sidebar-icon-view');
    if (sidebar.classList.contains('fs-sidebar-icon-view')) {
        mainContent.style.width = 'calc(100% - 3.5rem)';
    } else {
        mainContent.style.width = 'calc(100% - 15rem)';
    }
}

const resizeObserver = new ResizeObserver(() => {
    const sidebar = document.querySelector('.fs-sidebar');
    const mainContent = document.querySelector('.fs-main-content');
    if (window.innerWidth <= 990) {
        sidebar.classList.add('fs-sidebar-icon-view');
        mainContent.style.width = 'calc(100% - 3.5rem)';
    } else {
        sidebar.classList.remove('fs-sidebar-icon-view');
        mainContent.style.width = 'calc(100% - 15rem)';
    }
});

function loaderDemo() {
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.style.display = 'block';
    // setTimeout(() => {
    //     loaderContainer.style.display = 'none';
    // }, 3000);
}

function loaderDeleteDemo() {
    const loaderContainer = document.querySelector('.loader-container-delete');
    loaderContainer.style.display = 'block';
    // setTimeout(() => {
    //     loaderContainer.style.display = 'none';
    // }, 3000);
}

function viewData() {
    local_url = new URL(window.location)
    local_url = local_url["origin"].split(":")
    local_url = local_url[0] + ":" + local_url[1] + ":8081/"
    window.open(local_url)
}

const domBody = document.querySelector('body');
document.addEventListener('load', observeRoute());
resizeObserver.observe(domBody);

function observeType(type) {
    // document.querySelectorAll('.type__details__container').forEach(details => details.style.display = type ? 'block' : 'none')
    document.querySelectorAll('select.type__Select').forEach(select => $(select).selectpicker('val', type ? type : ''))

    const stepper = document.querySelector('.stepper__container');
    const initialView = document.querySelector('.initial__typeSelect');
    const typeHeaders = document.querySelectorAll('.type__Display');
    switch(type) {
        case 'provider':
            stepper.style.display = 'block';
            initialView.style.display = 'none';
            typeHeaders.forEach(header => header.innerText = 'Set up provider')
            break;

        case 'consumer':
            stepper.style.display = 'none';
            initialView.style.display = 'block';
            typeHeaders.forEach(header => header.innerText = 'Set up consumer')
            break;

        default:
            initialView.style.display = 'block';
            // stepper.style.display = 'none';
            typeHeaders.forEach(header => header.innerText = 'Select a Type')
    }
}

function observeConnector(connectorApp){
    var dockerhubURL = '';
    var connectorAppHeader = '';
    switch(connectorApp){
        case 'gsheets':
            dockerhubURL = 'https://hub.docker.com/r/farmstack/gsheets';
            connectorAppHeader = 'Google Sheets Configuration'
            break;
        case 'display': 
            dockerhubURL = 'https://hub.docker.com/r/farmstack/merge-csv-nodejs';
            connectorAppHeader = 'Display Table Configuration'
            break;
        case 'csv':
            dockerhubURL = '';
            connectorAppHeader = 'Download CSV Configuration';
            break;
        default: dockerhubURL = '';
    }
    $('#dockerUrl').val(dockerhubURL);
    $('#configure__title').text(connectorAppHeader);
}

function checkConnectorStatus(){
    fetch("/status").then(response => response.json())
        .then(connectorList => {
            $('.badge').each( (index, element) => {
                element.innerText = connectorList[index].status
                if(connectorList[index].status === 'active'){
                    element.classList.remove('badge-danger');
                    element.classList.add('badge-success');
                } else {
                    element.classList.add('badge-danger');
                    element.classList.remove('badge-success');
                }
            });
    })
}

$(document).ready(function(){
    checkConnectorStatus();
    $( "#consumer_name" ).change(function() {
        destination_name = $("#consumer_name").val().trim()
        $('#consumer_row').text(destination_name);

        selectValues = {"1": destination_name};
        $.each(selectValues, function(key, value) {   
            $('#consumer_dropdown')
                .append($("<option></option>")
                           .attr("value", key)
                           .text(value)); 
        });
        $('#destination_name').html(destination_name);
    });

    $( "#provider_name" ).change(function() {
        source_name = $("#provider_name").val().trim()
        
        $('#provider_row').text(source_name);
        selectValues = {"1": source_name};
        $.each(selectValues, function(key, value) {   
            $('#provider_dropdown')
                .append($("<option></option>")
                           .attr("value", key)
                           .text(value)); 
        });
        $('#source_name').html(source_name);
    });

    $( "#submit" ).click(function() {
        var providerName = $("#provider_name").val()
        var consumerName = $("#consumer_name").val()
        var alertStr = ""
        if(providerName.length === 0){
            alertStr = "Please enter a valid provider name";
        }
        if(consumerName.length === 0){
            alertStr = "Please enter valid consumer name";
        }
        var alertElement = $("#alert")
        if(alertStr){
            alertElement.html(alertStr)
            alertElement.addClass("visible")
            alertElement.removeClass("invisible")
            const loaderContainer = document.querySelector('.loader-container');
            loaderContainer.style.display = 'none';
            return;
        } else{
            alertElement.addClass("invisible")
            alertElement.removeClass("visible")
        }
        var data = JSON.stringify([
            {
              "name": providerName,
              "connector_type": "provider",
              "status": "active"
            },
            {
              "name": consumerName,
              "connector_type": "consumer",
              "status": "active"
            }
        ]);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            // window.location.href = '/status';
        }
        });
        
        xhr.open("POST", "/connector_api/run_local/");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cookie", "csrftoken=VDCAygOx52igW4LXYI2RtlrMlKTo3084NuirzSR0qxn0oKscJCguCaqnLlZdUKBU");
        
        xhr.send(data);
    });
})