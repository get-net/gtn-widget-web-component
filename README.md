# Vue Plugin to handle invitation data on client app

## Installation
 ``npm install gtn-widget-vue``

## Usage
Visit [kyc-servie](https://test.id.gtn.ee)

Click on Applications link and then add button:

![alt Application creation](img/applications.png)

Fill application data:

![alt Application creation](img/add_app.png)

After save you can watch application properties:

![alt Application creation](img/client.png)

install plugin in your Vue app:

````
    import gtnPlugin from "gtn-widget-vue"

    Vue.use(gtnPlugin)
````

use invite-component to handle invites
````
<invite-widget 
    client="your client id">
</invite-widget>
````
