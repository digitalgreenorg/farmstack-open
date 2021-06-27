# Local Deployment

{% hint style="info" %}
 This deployment has been tested on Linux, MacOS and Windows \(with wsl2 and Docker Desktop on wsl2\).
{% endhint %}

## Quick deployment on Linux

* Running this command will install Docker automatically on Linux, if it is not available.

```bash
curl https://raw.githubusercontent.com/digitalgreenorg/farmstack-open/UI_backend_integration/install.sh > fs-install.sh && bash fs-install.sh
```

## Deployment on Linux, MacOS and Windows \(with WSL2\)

* Clone the repository and open it.
* Run the setup.py file using python3

```bash
git clone https://github.com/digitalgreenorg/farmstack-open.git
cd farmstack-open
python3 setup.py
```

After the setup is done, you can view the connector setup UI at: [http://localhost:8000](http://localhost:8000).

