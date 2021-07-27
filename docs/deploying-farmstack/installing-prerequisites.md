# Installing Prerequisites

## Deployment on Linux, MacOS and Windows \(with WSL2\)

* Install Docker on your system according to OS:
  * [Docker Desktop for MacOS and Windows](https://www.docker.com/products/docker-desktop)
  * [Docker install on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
* For Ubuntu, also install docker-compose:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

* Install the dependencies on ubuntu:

```bash
sudo apt install python3-pip python3-venv
```

