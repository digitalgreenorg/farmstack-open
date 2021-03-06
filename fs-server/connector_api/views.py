from connector_api.models import Connector
from datetime import date
import requests
import os
import time
import subprocess
import docker
import json, csv
from django import contrib, urls
from django.shortcuts import render, redirect
from django.utils.formats import localize
from rest_framework.response import Response
from rest_framework.views import status
from rest_framework import viewsets, generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.views.decorators.csrf import csrf_exempt
from subprocess import check_output
from .serializers import ConnectorSerializer
from django.conf import settings
from django.urls import reverse, reverse_lazy
from django.http import HttpResponseRedirect

class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check


class RunLocal(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    queryset = Connector.objects.all()
    serializer_class = ConnectorSerializer

    def get(self, request, *args, **kwargs):
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, *args, **kwargs):
        try:
            # create connector instance
            print(request.data)
            create_connector = ConnectorSerializer(data=request.data, many=isinstance(request.data, list))
            if create_connector.is_valid():
                create_connector.save()
                messagae = "Created connectors successfully."

                # clear log files
                consumer_log_path = os.path.join(settings.FILES_DIR, "consumer/app.json")
                provider_log_path = os.path.join(settings.FILES_DIR, "provider/app.json")

                try:
                    open(consumer_log_path, 'w+').close()
                    open(provider_log_path, 'w+').close()
                except Exception as e:
                    print(e)
            else:
                messagae = "Could not create connectors successfully."
                errors = create_connector.errors
                print(errors)
            
            print(messagae)
            # check if docker for connectors alreay running
            try:
                pid = os.fork()
            except Exception as e:
                print(e)
                
            # create a background process
            if pid == 0:
                subprocess.call(["./scripts/examples/run-uc.sh"])
                print(os.getpid())
                os._exit(0)
            
            time.sleep(60)
            return Response(data={"message": "Connectors saved"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(data={"message": "Connectors not saved"}, status=status.HTTP_304_NOT_MODIFIED)


class StopConnector(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    queryset = Connector.objects.all()
    serializer_class = ConnectorSerializer

    def post(self, request, *args, **kwargs):
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    def get(self, request, con_type, connector_uuid, *args, **kwargs):
        try:
            docker_client = docker.from_env()
            containers = docker_client.containers.list()

            for container in containers:
                if con_type in container.name:
                    container.stop()
                    container.remove()
                    try:
                        Connector.objects.get(pk=connector_uuid).delete()
                    except Exception as e:
                        print(e)

            return HttpResponseRedirect(reverse('status'))
        except Exception as e:
            print(e)
            return Response(data={"message": "Connectors not deleted"}, status=status.HTTP_304_NOT_MODIFIED)