#!/bin/sh

cd fs-configs/usage-control-example/
docker-compose -f docker-compose-consumer.yaml down
docker-compose -f docker-compose-provider.yaml down
docker-compose -f docker-compose-consumer.yaml up -d
docker-compose -f docker-compose-provider.yaml up -d
