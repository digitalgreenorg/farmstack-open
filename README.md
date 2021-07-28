# Introduction

![](https://github.com/digitalgreenorg/farmstack-open/actions/workflows/example_uc.yml/badge.svg)

![](docs/.gitbook/assets/farmstack_horizontal_color_transparent-bg.png)

FarmStack is a reference implementation of an open and interoperable data sharing protocol in agriculture sector.

FarmStack is required because:

* Relevant farmer profile including farmer activity not available
* Lack of trust on misuse or under utilisation of data with a centralised data warehouse
* Need to comply with evolving data policy and privacy safeguarding measures
* Existing data integration tools lack the customisation

## Quick start

```bash
git clone https://github.com/digitalgreenorg/farmstack-open.git
cd farmstack-open
python3 setup.py
```

In browser, open: [https://localhost:8000/](https://localhost:8000/) and follow the instructions

For more details see [local deployment](docs/deploying-farmstack/local-deployment.md).

Requirements:

* Python3.6+
* Docker Desktop \(for MacOS and Windows with wsl2\).
* Docker and Docker Compose for ubuntu

## Deployment and Guides

You can see FarmStack in action by [Setting up Self-Managed Connector](docs/deploying-farmstack/setting-up-self-managed-connectors.md) for running a usage control example.

Or you can follow one of our step-by-step guide to setup your own connectors:

* [Configuring a connector with CSV file](docs/operation-guides/creating-a-connector-with-csv.md) 
* [Dockerizing applications to be compatible with FarmStack Connector](docs/operation-guides/dockerization/)
* [Install a dockerized application with a connector](docs/operation-guides/install-a-nodejs-application-with-connector.md)

## Features

FarmStack enables network of data providers and consumers through a suite of products and functionalities:

1. Share data directly without any third party through trusted **peer to peer \(p2p\) connector**.
2. Empower the data provider to restrict usage of data through **usage policies**.
3. Give control of data back to the farmers by managing consent using **data wallet**.
4. Enable entities to create plugins to make their **data discoverable \(description of data\)**.

FarmStack is the sum total of all the peer to peer connectors and associated usage policies.

For more information visit [our website](https://www.farmstack.co) or [Confluence Page](https://digitalgreenorg.atlassian.net/wiki/spaces/FS/overview).

## Contributing

We would love your contribution to this project no matter big or small.

To get started see our [contribution guide](docs/contributing-to-farmstack.md).

## Roadmap

@TODO - Add Roadmap

## License

@TODO - Add License

