# Introduction

![](https://github.com/digitalgreenorg/farmstack-open/actions/workflows/example\_uc.yml/badge.svg)

![](docs/.gitbook/assets/farmstack\_horizontal\_color\_transparent-bg.png)

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

In browser, open: [http://localhost:8000/](http://localhost:8000) and follow the instructions

For more details see [local deployment](docs/deploying-farmstack/local-deployment.md).

Requirements:

* Python3.6+
* Docker Desktop (for MacOS and Windows with wsl2).
* Docker and Docker Compose for ubuntu

## Deployment and Guides

You can see FarmStack in action by [Setting up Video Library Connector](docs/deploying-farmstack/setting-up-video-library-connector.md) for fetching data from [Digital Green's Video Library](https://solutions.digitalgreen.org/videos/library).

Or you can follow one of our step-by-step guide to setup your own connectors:

* [Configuring a connector with CSV file](docs/operation-guides/creating-a-connector-with-csv.md)&#x20;
* [Dockerizing applications to be compatible with FarmStack Connector](docs/operation-guides/dockerization/)
* [Install a dockerized application with a connector](docs/operation-guides/install-a-nodejs-application-with-connector.md)

## Features

FarmStack enables network of data providers and consumers through a suite of products and functionalities:

1. Share data directly without any third party through trusted **peer to peer (p2p) connector**.
2. Empower the data provider to restrict usage of data through **usage policies**.
3. Give control of data back to the farmers by managing consent using **data wallet**.
4. Enable entities to create plugins to make their **data discoverable (description of data)**.

FarmStack is the sum total of all the peer to peer connectors and associated usage policies.

For more information visit [our website](https://www.farmstack.co) or [Confluence Page](https://digitalgreenorg.atlassian.net/wiki/spaces/FS/overview).

## Contributing

We would love your contribution to this project no matter big or small.

To get started see our [contribution guide](docs/contributing-to-farmstack.md).

## Roadmap

@TODO - Add Roadmap

## License

Farmstack is licensed under Apache License 2.0. See [LICENSE](https://github.com/digitalgreenorg/farmstack-open/tree/576aa2ca789cd6910b3aee1d7ebd9cce08d73cf6/LICENSE/README.md) file for licensing information
