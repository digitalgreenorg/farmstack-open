import json
import os
import time
import subprocess
import threading
import requests
from connector_api.models import Connector, ConnectorApp
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import JsonResponse
from connector_api.serializers import ConnectorSerializer
from django.forms.models import model_to_dict


def home(request):
    connectors = Connector.objects.all()
    connector_apps = ConnectorApp.objects.all()
    return render(request, "connection.html", {'connectors':connectors, 'connector_apps': connector_apps})

def start_connector(request):
    response = redirect('/')
    data = {
        'connector_type': 'consumer',
        'paired_connector': request.POST['provider'],
        'connector_app': request.POST['connector']
    }
    connector_app = ConnectorApp.objects.get(name=data['connector_app'])
    if connector_app.name == 'gsheets':
        script_path = 'scripts/video-lib-connector/run-consumer-gsheet.sh'
    elif connector_app.name == 'display':
        script_path = 'scripts/video-lib-connector/run-consumer-display.sh'
    else:
        script_path = 'scripts/video-lib-connector/run-consumer-display.sh'
        
    create_connector = ConnectorSerializer(data=data, many=isinstance(data, list))
    if create_connector.is_valid():
        create_connector.save()
        message = "Created connectors successfully."
    else:
        message = "Could not create connectors successfully."
        errors = create_connector.errors
        print(errors)

    print(message)

    run_script(script_path)
    
    if connector_app.name == 'gsheets':
            t = threading.Thread(target=configure_gsheets,args=(request.POST,), kwargs={})
            t.setDaemon(True)
            t.start()

    return response

def run_script(script_path):
    try:
        pid = os.fork()
    except Exception as e:
        print(e)

    if pid == 0:
        #create connector
        subprocess.call([script_path])
        print(os.getpid())
        os._exit(0)

def configure_gsheets(config):
    form_data = {
        'sheet_title': config['sheet_title'],
        'email': config['email'],
    }
    retry_count = 0
    max_retry_count = 10
    while(True):
        time.sleep(5)
        try:
            r = requests.post('http://localhost:3001/configure/', data=form_data)
            if r.status_code == 200:
                break
            else:
                retry_count = retry_count+1
                if retry_count > max_retry_count:
                    break
        except:
            retry_count = retry_count+1
            if retry_count > max_retry_count:
                break
        time.sleep(55)
        print('Retrying...')

def check_connector_status(connectors):
    connectors = Connector.objects.all()
    con_to_return = []
    for connector in connectors:
        try:
            r = requests.get('http://localhost:'+connector.connector_app.port)
            if(r.status_code == 200):
                connector.status = 'active'
            else:
                connector.status = 'inactive'
        except:
            connector.status = 'inactive'
        connector.save()
        con_to_return.append({
            'id': connector.id,
            'status': connector.status,
            'connector_app': connector.connector_app.name
        })
    return JsonResponse(con_to_return, safe=False)

def con_status(request):
    connectors = Connector.objects.all()
    return render(request, "status.html", context={"connectors": connectors})

def stop_connector(request):
    try:
        connector = Connector.objects.filter(id=request.GET['id'])[0]
        connector_app = connector.connector_app
        if connector_app.name == 'gsheets':
            script_path = 'scripts/video-lib-connector/stop-consumer-gsheet.sh'
        elif connector_app.name == 'display':
            script_path = 'scripts/video-lib-connector/stop-consumer-display.sh'
        else:
            script_path = 'scripts/video-lib-connector/stop-consumer-display.sh'
        run_script(script_path)
        connector.delete()
    except Exception as e:
        print(e)
    return redirect('/')

def log(request):
    provider_logs_top_100 = []
    consumer_logs_top_100 = []

    print(settings.BASE_DIR)
    
    consumer_log_path = os.path.join(settings.FILES_DIR, "consumer/app.json")
    provider_log_path = os.path.join(settings.FILES_DIR, "provider/app.json")

    try:
        with open(consumer_log_path, "r") as ofs:
            consumer_logs_top_100 = ofs.readlines()
            file_length = len(consumer_logs_top_100)
            consumer_logs_top_100 = consumer_logs_top_100[file_length-100:]
    except:
        print("folder not creater for logs")
    
    try:
        with open(provider_log_path, "r") as ofs:
            provider_logs_top_100 = ofs.readlines()
            file_length = len(provider_logs_top_100)
            provider_logs_top_100 = provider_logs_top_100[file_length-100:]
    except:
        print("folder not creater for logs")

    return render(request, "logs.html", context={"provider_logs_top_100": provider_logs_top_100, "consumer_logs_top_100": consumer_logs_top_100})
