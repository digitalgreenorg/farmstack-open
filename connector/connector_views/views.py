import json
import subprocess
from connector_api.models import Connector
from django.conf import settings
from django.shortcuts import render
import os

def home(request):
    return render(request, "connection.html")

def start_connector(request):
    return render(request, "connection.html")

def con_status(request):
    connectors = Connector.objects.all()
    return render(request, "status.html", context={"connectors": connectors})

def log(request):
    provider_logs_top_100 = []
    consumer_logs_top_100 = []

    print(settings.BASE_DIR)

    consumer_log_path = os.path.join(settings.FILES_DIR, "consumer/karaf.log")
    provider_log_path = os.path.join(settings.FILES_DIR, "provider/karaf.log")

    with open(consumer_log_path, "r") as ofs:
        consumer_logs_top_100 = ofs.readlines()
        file_length = len(consumer_logs_top_100)
        consumer_logs_top_100 = consumer_logs_top_100[file_length-100:]
    
    with open(provider_log_path, "r") as ofs:
        provider_logs_top_100 = ofs.readlines()
        file_length = len(provider_logs_top_100)
        provider_logs_top_100 = provider_logs_top_100[file_length-100:]
    
    return render(request, "logs.html", context={"provider_logs_top_100": provider_logs_top_100, "consumer_logs_top_100": consumer_logs_top_100})
