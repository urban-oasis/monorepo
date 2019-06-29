# Urban oasis IoT platform

This is the Urban Oasis IoT project containing a React dashboard, sensor collector code for Arduino/Raspberry and a backend solution on Google Cloud.

## Dashboard

The dashboard is written in React and uses Google cloud as a backend to read and write sensor data.  

### Running locally

To launch the dashboard, move into the dashboard directory and do:

1. `npm install`
2. `npm start`

This will launch the website on `localhost:3000`.  

### Building for production

To run the website on Netlify and have it hosted on the web, you first need to build the code. Do that with:
```
npm build
```

Which builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Collector

The collector is the code that is run on the Arduino + Raspberry Pi. 

- `collector.ino`, collects data on Arduino and sends it via serial (usb) to the raspberry.
- `receive_sensors.py`, receives the data from the Arduino and sends it to the Google cloud backend for storage. __Right now, collection time is set on 1 hour intervals__.

To actually build for the Arduino, if you want to extend the functionality or continue improving, you also need to install the external library of Libelium Aquaponics. You can find a tutorial on the library, including the library itself, [here](https://www.cooking-hacks.com/documentation/tutorials/open-aquarium-aquaponics-fish-tank-monitoring-arduino/).

## Api

The api holds all serverless functions the are used on Google Cloud.
To monitor the cloud and work with the overall solution you login [here](https://console.cloud.google.com/) with user `urbanoasisgcp@urbanoasis.life`. To see the actual components, you must first choose the project `urbanoasis`, once you have logged in.  
The architecture uses the following services:

- Cloud Functions: all serverless code for input and output of sensors. Written in Node.
- Cloud Storage: the cheapest (and slowest) storage solution available. Here the sensor data is saved and updated.

### Updating a function

Each serverless function comes with a `deploy.sh` script. And the main code always exists inside the `index.js` file. So after you have done your changes to `index.js`, you have to:

1. [install the google cloud cli](https://cloud.google.com/sdk/docs/quickstart-macos)
2. Login by writing in the terminal `gcloud auth login`, and login with user `urbanoasisgcp@urbanoasis.life`.
3. Run the deploy file with `bash deploy.sh` within the function folder.
