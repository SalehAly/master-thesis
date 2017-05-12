[
    {
        "id": "ab32f847.4c5bf8",
        "type": "inject",
        "z": "50e0b88c.901a28",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 96.11112213134766,
        "y": 65.77777671813965,
        "wires": [
            [
                "581f49d5.dd2418"
            ]
        ]
    },
    {
        "id": "581f49d5.dd2418",
        "type": "camerapi-takephoto",
        "z": "50e0b88c.901a28",
        "filemode": "1",
        "filename": "",
        "filedefpath": "0",
        "filepath": "/home/pi/.node-red/images/",
        "fileformat": "jpeg",
        "resolution": "1",
        "rotation": "0",
        "fliph": "0",
        "flipv": "0",
        "brightness": "50",
        "contrast": "0",
        "sharpness": "0",
        "imageeffect": "none",
        "name": "",
        "x": 284.61112213134766,
        "y": 72.77777671813965,
        "wires": [
            [
                "892301e1.7500e",
                "3b2a698a.a18866"
            ]
        ]
    },
    {
        "id": "58a806f7.72a9f8",
        "type": "influxdb out",
        "z": "50e0b88c.901a28",
        "influxdb": "b6a185ac.5f0db8",
        "name": "",
        "measurement": "image",
        "x": 702.1111335754395,
        "y": 71.02778244018555,
        "wires": []
    },
    {
        "id": "892301e1.7500e",
        "type": "function",
        "z": "50e0b88c.901a28",
        "name": "",
        "func": "var fileName = msg.payload.replace(/^.*[\\\\\\/]/, '')\nmsg.payload={\n    path:msg.payload,\n    name:fileName\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 479.1111259460449,
        "y": 72.52777862548828,
        "wires": [
            [
                "58a806f7.72a9f8"
            ]
        ]
    },
    {
        "id": "3b2a698a.a18866",
        "type": "function",
        "z": "50e0b88c.901a28",
        "name": "",
        "func": "\nvar payload = {\n    file : msg.payload,\n    data : \"image from server x\",\n    topic: \"Listener\"\n};\n\nmsg.payload = JSON.stringify(payload);\nmsg.headers = {'Content-Type' : 'application/json'} ;\nreturn msg;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 268.33335876464844,
        "y": 166.66667366027832,
        "wires": [
            [
                "4b0ded44.54b844",
                "d2f11a25.7434a8"
            ]
        ]
    },
    {
        "id": "4b0ded44.54b844",
        "type": "http request",
        "z": "50e0b88c.901a28",
        "name": "publish",
        "method": "POST",
        "ret": "txt",
        "url": "localhost:8080/publish",
        "tls": "",
        "x": 428.88890075683594,
        "y": 171.88889932632446,
        "wires": [
            []
        ]
    },
    {
        "id": "d2f11a25.7434a8",
        "type": "debug",
        "z": "50e0b88c.901a28",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 462.7778015136719,
        "y": 273.3333225250244,
        "wires": []
    },
    {
        "id": "b6a185ac.5f0db8",
        "type": "influxdb",
        "z": "50e0b88c.901a28",
        "hostname": "127.0.0.1",
        "port": "8086",
        "protocol": "http",
        "database": "images",
        "name": "",
        "usetls": false,
        "tls": ""
    }
]
