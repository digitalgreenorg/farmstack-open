#!/bin/sh

cd fs-configs/usage-configs/usage-control-example/
docker-compose -f docker-compose-provider.yaml up -d
docker-compose -f docker-compose-consumer.yaml up -d
