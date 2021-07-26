#!/bin/sh

CONSUMER_APP_DIR=../../fs-consumer-apps/merge-csv-nodejs #change application directory, should be absolute path without space
CONSUMER_APP_NAME='merge-csv-nodejs' #change application name
PORT='8081' #Change port according to your application
cd 'fs-configs/usage-control-example'
echo 'Building consumer image: '$CONSUMER_APP_NAME
export DOCKER_SCAN_SUGGEST=false
image_hash=$(docker build $CONSUMER_APP_DIR -t $CONSUMER_APP_NAME --network=host -q | sed -e 's/sha256\://g')
echo $image_hash
echo 'Generating Tar'
docker save $CONSUMER_APP_NAME > $CONSUMER_APP_NAME.tar
echo 'Loading image into docker'
docker load -i $CONSUMER_APP_NAME.tar
echo 'Tagging image with generated hash: '$image_hash
echo docker tag 'sha256:'$image_hash $CONSUMER_APP_NAME
docker tag 'sha256:'$image_hash $CONSUMER_APP_NAME
echo 'Updating example-provider-routes.xml'
sed -i 's/sha256-.*#'$PORT'/sha256-'${image_hash}'#'$PORT'/g' example-provider-routes.xml
echo 'Preparing application for UC - completed'