# Local Deployment

{% hint style="info" %}
This deployment has been tested on Linux, MacOS and Windows \(with wsl2 and Docker Desktop on wsl2\).
{% endhint %}

## Quick deployment on Linux

* Running this command will install Docker automatically on Linux, if it is not available.

```bash
curl https://raw.githubusercontent.com/digitalgreenorg/farmstack-open/main/scripts/install.sh > fs-install.sh && bash fs-install.sh
```

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

* Clone the repository and open it.
* Run the setup.py file using python3

```bash
git clone https://github.com/digitalgreenorg/farmstack-open.git
cd farmstack-open
python3 setup.py
```

After the setup is done, you can view the connector setup UI at: [http://localhost:8000](http://localhost:8000).

