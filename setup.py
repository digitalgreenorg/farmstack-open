import os
import subprocess

def start_setup():

    # install virtualenv
    subprocess.call(["pip3", "install", "virtualenv"])

    # create executbale sh
    subprocess.call(["chmod", "+x", "run.sh"])
    subprocess.call(["chmod", "+x", "stop_consumer.sh"])
    subprocess.call(["chmod", "+x", "stop_provider.sh"])
    subprocess.call(["chmod", "+x", "stop.sh"])

    init_command = "python3 -m venv venv"

    activator_string = '''source venv/bin/activate ;'''
    
    requirements = [" --upgrade pip","bcrypt", "certifi", "cffi", 
                    "chardet", "cryptography", "Django==2.2", "python_on_whales",
                    "django-rest-swagger==2.2.0", "djangorestframework==3.12.4", 
                    "idna==2.10", "paramiko==2.7.2", "pycparser", 
                    "PyNaCl", "pytz", "PyYAML", "requests", "six", 
                    "sqlparse", "uritemplate==3.0.1", "urllib3==1.26.4", 
                    "django-cors-headers"]
    
    os.system(init_command)

    for req in requirements:
        activator_string += "pip install %s;" % (req)
    
    os.system(activator_string)

    #start server
    os.system("source venv/bin/activate;python connector/manage.py makemigrations;python connector/manage.py migrate;python connector/manage.py runserver 127.0.0.1:8000;")

if __name__ == "__main__":
    start_setup()