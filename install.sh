#!/bin/bash

echo "$OSTYPE"

if [[ "$OSTYPE" =~ "darwin".* ]]
then
    DOCKER_VERSION=$(docker-compose --version)

    echo "$DOCKER_VERSION"
    if [[ "$DOCKER_VERSION" =~ .*"docker-compose".* ]]
    then
        echo "docker compose found"
    else
        echo "install docker for mac then proceed"
        exit 1
    fi
else
    echo "installing/upgrading pip"
    sudo apt install python3-pip -y
    
    DOCKER_VERSION=$(docker-compose --version)

    echo "$DOCKER_VERSION"
    if [[ "$DOCKER_VERSION" =~ .*"docker-compose".* ]]
    then
        echo "docker compose found"
    else
        echo "installing docker"
        sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
fi

git clone -b UI_backend_integration https://github.com/digitalgreenorg/farmstack-open.git

cd farmstack-open

PYTHON_VERSION=$(python -V)

if [[ "$PYTHON_VERSION" =~ .*"Python 3".* ]]
then
    python setup.py
else

    PYTHON_VERSION=$(python3 -V)
    echo "$PYTHON_VERSION"
    if [[ "$PYTHON_VERSION" =~ .*"Python 3".* ]]
    then
        python3 setup.py
    else
        echo "Invalid python versions found install python3.0 or greater and try again"
    fi
fi
