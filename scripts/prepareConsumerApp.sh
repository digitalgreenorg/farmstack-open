#!/bin/sh

# Config parameters
CONFIG_DIR='fs-configs/usage-control-example'
PROVIDER_CONFIG_FILE=example-provider-routes.xml
CONSUMER_DOCKER_COMPOSE=docker-compose-consumer.yaml

# Application parameters
# This should be a relative path to the config directory or an absolute path.
CONSUMER_APP_DIR=../../fs-connectors/consumer/sample-nodejs
CONSUMER_APP_NAME='sample-nodejs' #change application name
CONSUMER_APP_PORT=8081 #Change port according to your application
SYSTEM_PORT=8081 # Port on the system you want to map to your application's port

cd $CONFIG_DIR
echo 'Building consumer image: '$CONSUMER_APP_NAME
export DOCKER_SCAN_SUGGEST=false
image_hash=$(docker build $CONSUMER_APP_DIR -t $CONSUMER_APP_NAME --network=host -q | sed -e 's/sha256\://g')
echo $image_hash
# echo 'Generating Tar'
# docker save $CONSUMER_APP_NAME > $CONSUMER_APP_NAME.tar
# echo 'Loading image into docker'
# docker load -i $CONSUMER_APP_NAME.tar
# echo 'Tagging image with generated hash: '$image_hash
# echo docker tag 'sha256:'$image_hash $CONSUMER_APP_NAME
# docker tag 'sha256:'$image_hash $CONSUMER_APP_NAME
echo 'Updating '$PROVIDER_CONFIG_FILE
sed -i.bak 's/sha256-.*#'$PORT'/sha256-'${image_hash}'#'$PORT'/g' $PROVIDER_CONFIG_FILE
sed -i.bak 's/merge-csv-nodejs/'$CONSUMER_APP_NAME'/g' $PROVIDER_CONFIG_FILE
echo 'Updating '$CONSUMER_DOCKER_COMPOSE
sed -i.bak 's/farmstack\/merge-csv-nodejs/'$CONSUMER_APP_NAME'/g' $CONSUMER_DOCKER_COMPOSE
sed -i.bak 's/8081:8081/'$SYSTEM_PORT':'$CONSUMER_APP_PORT'/g' $CONSUMER_DOCKER_COMPOSE
echo 'Cleaning up'
rm *.bak
echo 'Preparing application for UC - completed'