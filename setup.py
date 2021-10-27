#!/bin/bash
import os
import shlex
import subprocess
import sys
from pathlib import Path

def start_setup():

    python_version = None
    pip_version = None
    # get os
    os_name = sys.platform
    print("os is %s" % (os_name))
    if os_name.startswith("win"):
        raise Exception("Try on linux system")
    else:
        try:
            python_version = subprocess.check_output(["python3", "-V"]).decode("utf-8")
        except:
            python_version = ""
        if python_version.startswith('Python'):
            python_version = "python3"
            pip_version = "pip3"
        else:
            try:
                python_version = subprocess.check_output(["python", "-V"]).decode("utf-8")
            except:
                print("No python found please install Python3.5 or greater")
            if python_version.startswith('Python 3'):
                python_version = "python"
            else:
                raise Exception("Required Python 3, found %s" % (sys.version_info))
    
    print("Proceeding with python - %s and pip - %s" % (python_version, pip_version))
    
    # install virtualenv
    subprocess.call(["%s" % (pip_version), "install", "virtualenv"])

    init_command = "%s -m venv .venv" % (python_version)

    if not os_name.startswith('win'):
        if not os_name.startswith('linux'):
            activator_string = '''source .venv/bin/activate ;'''
        else:
            activator_string = ""
    
    # requirements = [" --upgrade pip","bcrypt", "certifi", "cffi", 
    #                 "chardet", "cryptography", "Django==2.2", "python_on_whales",
    #                 "django-rest-swagger==2.2.0", "djangorestframework==3.12.4", 
    #                 "idna==2.10", "paramiko==2.7.2", "pycparser", 
    #                 "PyNaCl", "pytz", "PyYAML", "requests", "six", 
    #                 "sqlparse", "uritemplate==3.0.1", "urllib3==1.26.4", 
    #                 "django-cors-headers", "docker"]

    os.system(init_command)

    # for req in requirements:
    if not os_name.startswith('win'):
        if not os_name.startswith('linux'):
            activator_string += "pip install --upgrade pip;"
            activator_string += "pip install -r fs-server/requirements.txt;"
        else:
            activator_string += ".venv/bin/pip install --upgrade pip;"
            activator_string += '''.venv/bin/pip install  -r fs-server/requirements.txt;'''
    
    print(activator_string)
    os.system(activator_string)
    os.system("touch .setup_complete")
    
    # run_server()
    

def run_server():
    print("Server starting...")
    os_name = sys.platform
    cmdline = "0.0.0.0:8000"
    if len(sys.argv) > 1:
        cmdline = " ".join(map(shlex.quote, sys.argv[1:]))
    #start server
    if not os.name.startswith('win'):
        if not os_name.startswith('linux'):
            os.system("source .venv/bin/activate;python fs-server/manage.py makemigrations;python fs-server/manage.py migrate;python fs-server/manage.py runserver %s;" % cmdline)
        else:
            os.system(".venv/bin/python fs-server/manage.py makemigrations;.venv/bin/python fs-server/manage.py migrate;.venv/bin/python fs-server/manage.py runserver %s;" % cmdline)


if __name__ == "__main__":
    if not (Path(".setup_complete").is_file() and Path(".venv").is_dir()):
        start_setup()
    run_server()