#!/bin/bash

data=$(curl http://localhost:8081)
len=${#data}
if [[ $len -le 93 ]]
then
    echo "No data received at consumer $len"
    exit 1
else
    echo "Data transfer validation complete"
fi