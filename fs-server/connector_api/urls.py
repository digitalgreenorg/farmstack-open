from django.urls import path, re_path
from .views import RunLocal, StopConnector

urlpatterns = [
    
    path(
        'run_local/',
        RunLocal.as_view(),
        name='run_local'
    ),

    re_path(
        r'delete/(?P<con_type>(provider|consumer))/(?P<connector_uuid>[0-9a-f-]+)/', 
        StopConnector.as_view(),
        name='stop_connector'
    ),

]