# Setting up Video Library Connector

## Overview

This tutorial will guide you through the process of installing and running a Video Library Data Consumer. The video library can be found here: [Digital Green Video Library](https://solutions.digitalgreen.org/videos/library).&#x20;

Kindly complete the prerequisites before proceeding with the guide.

{% content-ref url="installing-prerequisites.md" %}
[installing-prerequisites.md](installing-prerequisites.md)
{% endcontent-ref %}

## Setting up FarmStack connector

In the terminal window type the following command to run FarmStack setup:

```
python3 setup.py
```

After the setup is complete, in the browser window, open the installer frontend by typing [http://localhost:8000](http://localhost:8000).

## Running the connector

Click on the <mark style="color:yellow;">Add New +</mark> button, which will open a dialog to setup connector.

![](<../.gitbook/assets/Screenshot 2022-01-13 at 10.37.57 PM (1).png>)

Select the connector you want to run. Here we'll run the Google Sheets connector.

![](<../.gitbook/assets/Screenshot 2022-01-13 at 10.39.27 PM.png>)

Click on <mark style="color:yellow;">Next</mark> which will take you to the configure tab.&#x20;

In the configure tab, enter a google email you would like to share the data with. You can also change the sheet title here.

![](<../.gitbook/assets/Screenshot 2022-01-13 at 10.42.12 PM.png>)

Clicking <mark style="color:yellow;">Next</mark> will take you to the connect tab.

In the connect tab, you can see the provider connectors available to connect.

![](<../.gitbook/assets/Screenshot 2022-01-13 at 10.42.54 PM.png>)

Select the Video List Provider (DG - Coco) from the list of providers and click <mark style="color:yellow;">Finish.</mark>

![](<../.gitbook/assets/Screenshot 2022-01-13 at 10.45.11 PM.png>)

On the homepage, the table will update to show the currently running connectors.

![](<../.gitbook/assets/Screenshot 2022-01-13 at 11.12.47 PM (1).png>)

From this table you can <mark style="color:blue;">open the homepage</mark> of the connector or delete the connector by clicking he <mark style="color:red;">red bin</mark> icon.

## Configuring the connectors

### Google Sheets Connector

Open the homepage of the App and click on the <mark style="color:yellow;">Sync Data</mark> button to fill the data in Google Sheet.

![](<../.gitbook/assets/Screenshot 2022-01-14 at 1.14.19 AM.png>)

### CSV Connector

Open the homepage of the App and click on the <mark style="color:yellow;">Sync Data</mark> button to generate a csv. Once the CSV file is generated you click on <mark style="color:blue;">Download</mark> option to download the CSV file.

![](<../.gitbook/assets/Screenshot 2022-01-14 at 1.16.29 AM.png>)
