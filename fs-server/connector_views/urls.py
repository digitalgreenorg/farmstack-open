from django.urls import path
from .views import home, start_connector, con_status, log
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
        "status/", 
        con_status, 
        name="status"
    ),

    path(
        "log/", 
        log, 
        name="log"
    ),
]