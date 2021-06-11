#!/bin/sh

CUSTOMER_APP_NAME='merge-csv-nodejs'
cd 'configs'
echo 'Building consumer image: '$CUSTOMER_APP_NAME
image_hash=$(docker build ../src/consumer-apps/merge-csv-nodejs -t merge-csv-nodejs -q | sed -e 's/sha256\://g')
echo $image_hash
echo 'Generating Tar'
docker save $CUSTOMER_APP_NAME > $CUSTOMER_APP_NAME.tar
echo 'Loading image into docker'
docker load -i $CUSTOMER_APP_NAME.tar
echo 'Tagging image with generated hash: '$image_hash
docker tag 'sha256:'$image_hash $CUSTOMER_APP_NAME
echo 'Updating example-provider-routes.xml'
sed -i 's/sha256-.*#8081/sha256-'${image_hash}'#8081/g' example-provider-routes.xml
echo 'Preparing application for UC - completed'