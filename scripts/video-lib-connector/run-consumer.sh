#!/bin/bash

if [ -z "$1" ]
    then
        echo "Please enter the consumer connector you would like to run:"
        echo "1. Google sheets"
        echo "2. Display Table"
        echo "3. Download CSV"
        read input
        if [ "$input" == "1" ]
            then
                connector="gsheets"

        elif [ "$input" == "2" ]
            then
                connector="display-table"
        elif [ "$input" == "3" ]
            then
                connector="csv"
        else
            echo "Wrong input selected. Please run the script again."
            exit 1
        fi
elif ![ -z "$2" ]
    then
        echo "Too many arguments given"
        exit 1
elif [ [ "$1" == "gsheets" ] || [ "$1" == "display-table" ] || [ "$1" == "csv" ] ]
        then
            connector=$1
else
    echo "No such connector: $1. Options available: 1. gsheets 2. display-table 3. csv"
    exit 1
fi

docker_file="docker-compose-$connector.yaml"
echo "Running connector: $connector"

cd fs-configs/video-library-connector/
docker-compose -f $docker_file up -d


