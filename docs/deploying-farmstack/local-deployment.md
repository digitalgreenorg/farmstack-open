# Local Deployment

{% hint style="info" %}
 This deployment has been tested on Linux, MacOS and Windows \(with wsl2 and Docker Desktop on wsl2\).
{% endhint %}

## Deployment on MacOS and Linux

* Install Docker Desktop on your system \([instructions on docker](https://www.docker.com/products/docker-desktop)\).
* After docker has been installed you can quickstart by using these commands

```bash
git clone https://github.com/digitalgreenorg/farmstack-open.git
cd farmstack-open
./run.sh
```

To view the consumer app, visit consumer url: http://localhost:8081/

To stop the containers:

```bash
./stop.sh
```



