# Install a dockerized application with connector

## Overview

 This tutorial will describe how to run the dockerized application with the connector. This tutorial does not contain information on dockerization of the app. Kindly [dockerization tutorial](dockerization/) according to your app.

You can find the sample-nodejs application used in this tutorial [here](https://github.com/digitalgreenorg/farmstack-open/tree/main/fs-consumer-apps/sample-nodejs).

## Installing dockerized application with connector

Kindly follow the previous tutorial to locally setup and deploy FarmStack before proceeding with this next step, if not done already.

{% page-ref page="../deploying-farmstack/installing-prerequisites.md" %}

Clone the FarmStack repository and open in terminal, using following commands:

```bash
git clone https://github.com/digitalgreenorg/farmstack-open.git
cd farmstack-open
```

Open `prepareConsumerApp.sh` in `scripts` folder in your favorite editor. 

Edit the following variable to according to your application:

```bash
# Application parameters
# This should be a relative path to the config directory or an absolute path.
CONSUMER_APP_DIR=../../fs-consumer-apps/sample-nodejs
CONSUMER_APP_NAME='sample-nodejs' #change application name
CONSUMER_APP_PORT=8081 #Change port according to your application
SYSTEM_PORT=8081 # Port on the system you want to map to your application's port
```

You can also edit the parameters for the example configuration according to your requirements, but it is advised to leave these variables untouched, unless you know what you're doing. 

```bash
# Config parameters
CONFIG_DIR='fs-configs/usage-control-example'
PROVIDER_CONFIG_FILE=example-provider-routes.xml
CONSUMER_DOCKER_COMPOSE=docker-compose-consumer.yaml
```

In the terminal, execute the script from `farmstack-open` directory:

```bash
./scripts/prepareConsumerApp.sh
```

This script will create a docker image for your application and modify the required usage control parameters in the `example-provider-routes.xml` file.

In the terminal window type the following command to run FarmStack setup:

```text
python3 setup.py
```

After the setup is complete, in the browser window, open the installer frontend by typing [localhost:8000](http://localhost:8000).

Follow the steps to create your connectors, give a unique name to your connectors such as cities-provider and cities-consumer.

Start the connection by clicking Setup Connection Button.

When the connector setup is done click View transferred data link to see your data. Kindly wait a couple of minutes for the contract negotiation process of provider and consumer to complete before they can start sharing the data.

This completes the tutorial for running the dockerized application with the consumer connector. If you face any issue while running your consumer app kindly open a new issue in the github repository and our experts will guide you.

