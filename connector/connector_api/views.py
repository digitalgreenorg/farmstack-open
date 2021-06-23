from connector_api.models import Connector
from datetime import date
import requests
import os
import time
import subprocess
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
            else:
                messagae = "Created connectors successfully."
                errors = create_connector.error
            
            # check if docker for connectors alreay running
            try:
                pid = os.fork()
            except Exception as e:
                print(e)
                
            # create a background process
            if pid == 0:
                subprocess.call(["./run.sh"])
                print(os.getpid())
                os._exit(0)
            
            time.sleep(5)
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

            if con_type == "provider":
                # delete provider instance from database
                try:
                    # create background process
                    try:
                        pid = os.fork()
                    except Exception as e:
                        print(e)

                    # check if any provider connector running
                    docker_outout = check_output(["docker", "container", "ls", "-a"])
                    output_string = docker_outout.decode('utf-8')
                    # check for consumer and provider core, if running stop it, else return to status
                    if "provider-core" in output_string:
                        # redirect to status page as connectors already running
                        if pid == 0:                   
                            subprocess.call(["./stop_provider.sh"])
                            print(os.getpid())
                            os._exit(0)
                        connector_object = Connector.objects.get(pk=connector_uuid)
                        connector_object.delete()
                except:
                    pass
                print("stop provider instnace")
            else:
                # delete consumer instance from database
                try:
                    # create background process
                    try:
                        pid = os.fork()
                    except Exception as e:
                        print(e)

                    # check if any consumer connector running
                    docker_outout = check_output(["docker", "container", "ls", "-a"])
                    output_string = docker_outout.decode('utf-8')
                    # check for consumer and provider core, if running stop it, else return to status
                    if "consumer-core" in output_string:
                        # redirect to status page as connectors already running
                        if pid == 0:                   
                            subprocess.call(["./stop_consumer.sh"])
                            print(os.getpid())
                            os._exit(0)
                        connector_object = Connector.objects.get(pk=connector_uuid)
                        connector_object.delete()
                except:
                    pass
            
            return redirect("http://127.0.0.1:8000/home/status/")
        except Exception as e:
            print(e)
            return Response(data={"message": "Connectors not deletd"}, status=status.HTTP_304_NOT_MODIFIED)