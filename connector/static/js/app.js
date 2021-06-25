function changeTab(tabName = 'source') {
    const selectTab = document.getElementById(`${tabName}-tab`);
    selectTab.click();
}

function observeRoute() {
    const currentLocation = window.location.href;
    const links = document.querySelectorAll('.fs-sidebar-list-item a');

    links.forEach((link) => {
        (link.href == currentLocation) ? link.parentElement.classList.add('active') : link.parentElement.classList.remove('active') ;
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

const domBody = document.querySelector('body');
document.addEventListener('load', observeRoute());
resizeObserver.observe(domBody);

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
        
        xhr.open("POST", "/connector_api/run_local/");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cookie", "csrftoken=VDCAygOx52igW4LXYI2RtlrMlKTo3084NuirzSR0qxn0oKscJCguCaqnLlZdUKBU");
        
        xhr.send(data);
    });
})