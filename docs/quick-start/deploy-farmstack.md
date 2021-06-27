# Deploy Farmstack

## Quick deployment on Ubuntu

* Running this command will install Docker automatically on Ubuntu, if it is not available.

```bash
curl https://raw.githubusercontent.com/digitalgreenorg/farmstack-open/main/scripts/install.sh > fs-install.sh && bash fs-install.sh
```

## Deployment on Ubuntu, MacOS and Windows \(with WSL2\)

* Install Docker on your system according to OS:
  * [Docker Desktop for MacOS and Windows](https://www.docker.com/products/docker-desktop).
  * [Docker install on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
* Clone the repository and open it.
* Run the setup.py file using python3

```bash
git clone https://github.com/digitalgreenorg/farmstack-open.git
cd farmstack-open
python3 setup.py
```

After the setup is done, you can view the connector setup UI at: [http://localhost:8000](http://localhost:8000).

