import os
import subprocess

def start_setup():

    # install virtualenv
    subprocess.call(["pip3", "install", "virtualenv"])

    init_command = "python3 -m venv venv"

    activator_string = '''source venv/bin/activate ;'''
    
    requirements = [" --upgrade pip","bcrypt", "certifi", "cffi", 
                    "chardet", "cryptography", "Django==2.2", "python_on_whales",
                    "django-rest-swagger==2.2.0", "djangorestframework==3.12.2", 
                    "idna==2.10", "paramiko==2.7.2", "pycparser", 
                    "PyNaCl", "pytz", "PyYAML", "requests==2.25.1", "six", 
                    "sqlparse", "uritemplate==3.0.1", "urllib3==1.26.4", 
                    ]
    
    os.system(init_command)

    for req in requirements:
        activator_string += "pip install %s;" % (req)
    
    os.system(activator_string)

    #start server
    os.system("source venv/bin/activate;cd connector/connector/;python manage.py runserver 0.0.0.0:8000;")

if __name__ == "__main__":
    start_setup()