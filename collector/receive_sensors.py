import serial
from numpy import inf
from numpy import nan
import numpy as np
import datetime
import requests
import json

ser = serial.Serial('/dev/cu.usbmodem146101', 9600)
url = 'https://europe-west2-urbanoasis.cloudfunctions.net/receiveSensors'
token = 'OEU@3o-4234JE-32Ujeo?@!'
headers = {
        'content-type': 'application/json',
        'Authorization': token
        }
s = [0]
post = {}
data = {}
data['id'] = 1
data['farm_id'] = 1
index = 0

while True:
    a = ser.readline()
    val = a.decode("utf-8")
    if '---' in val:
        print('New incoming values')
        index = 0
    if index == 1:
        try:
            data['ph'] = float(val)
        except Exception:
            data['ph'] = 0.0
    if index == 2:
        try:
            data['temp'] = float(val)
        except Exception:
            data['temp'] = 0.0
    if index == 3:
        try:
            data['water_level'] = int(val)
        except Exception as e:
            data['water_level'] = 0
    if index == 4:
        try:
            data['EC'] = float(val)
        except Exception:
            data['EC'] = 0.0
    if '+++' in val:
        print('End of transmission, sending data:')
        for key, value in data.items():
            if value == inf or value == -inf or (type(value) == float and np.isnan(value)):
                data[key] = 0
        data['timestamp'] = datetime.datetime.now().isoformat()
        print(data)

        post['data'] = data
        r = requests.post(url, headers=headers, data=json.dumps(post))
        print('---------------------')
        print(r)

    index += 1

