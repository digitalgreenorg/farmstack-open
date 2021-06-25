from django.urls import path
from .views import home, start_connector, con_status, log

urlpatterns = [

    path(
        "", 
        home, 
        name="default_home"
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