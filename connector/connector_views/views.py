from django.shortcuts import render
import json
import requests
from connector_api.models import Connector

def home(request):
    return render(request, "connection.html")

def start_connector(request):
    return render(request, "connection.html")

def con_status(request):
    connectors = Connector.objects.all()
    return render(request, "status.html", context={"connectors": connectors})

def log(request):
    log_json = requests.get('http://localhost:3100/loki/api/v1/query_range?direction=BACKWARD&limit=1000&query=%7Bjob%3D%22varlogs%22%7D&start=1623317555000000000&end=1623321156000000000')
    log_json = json.loads(log_json.text)["data"]["result"][0]["values"][:100]
    for i, log in enumerate(log_json):
        log_json[i] = json.loads(log[-1])
    return render(request, "logs.html", context={"logs": log_json})
