from django.urls import path
from .views import home, start_connector, con_status, log, check_connector_status, stop_connector
from django.shortcuts import redirect
urlpatterns = [

    path(
        "", 
        lambda req: redirect('/home/')
    ),

    path(
        "home/", 
        home, 
        name="home"
    ),
    
    path(
        "start_connector/", 
        start_connector, 
        name="start_connector"
    ),

    path(
        "stop_connector/", 
        stop_connector, 
        name="stop_connector"
    ),
    
    path(
        "status/", 
        check_connector_status, 
        name="status"
    ),
    

    path(
        "log/", 
        log, 
        name="log"
    ),
]