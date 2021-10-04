#!/bin/bash

echo "$OSTYPE"

if [[ "$OSTYPE" =~ "darwin".* ]]
then
    DOCKER_VERSION=$(docker-compose --version)

    DOCKER_V = $(docker version)

    echo "$DOCKER_VERSION"
    if [[ "$DOCKER_VERSION" =~ .*"docker-compose".* ]]
    then
        echo "docker compose found"
    else
        echo "install docker for mac then proceed"
        exit 1
    fi
else
    echo "install time module"
    sudo apt install ntpdate
    sudo ntpdate -s time.nist.gov
    
    DOCKER_VERSION=$(docker-compose --version; echo $?)
    DOCKER_V=$(docker version; echo $?)

    echo "installing/upgrading pip"
    sudo apt install python3-venv -y
    sudo apt install python3-pip -y

    echo "$DOCKER_V"
    if [[ "$DOCKER_V" =~ "0".* ]]
    then
        echo "docker found"
    else
        echo "installing docker"
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo groupadd docker
        sudo usermod -aG docker $USER
        sudo systemctl restart docker
        # newgrp docker
        echo "docker installation done"
    fi

    
    DOCKER_VERSION=$(docker-compose --version)

    echo "$DOCKER_VERSION"
    if [[ "$DOCKER_VERSION" =~ "0".* ]]
    then
        echo "docker compose found"
    else
        echo "installing docker compose"
        sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
fi

git clone https://github.com/digitalgreenorg/farmstack-open.git;

cd farmstack-open;

chmod +x './scripts/video-lib-connector/*';

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
