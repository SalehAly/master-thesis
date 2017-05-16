[
    {
        "id": "777d0e22.8e3b3",
        "type": "tab",
        "label": "Flow 1"
    },
    {
        "id": "efd7afd8.cad5b",
        "type": "inject",
        "z": "777d0e22.8e3b3",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": true,
        "x": 121.00000762939453,
        "y": 80.0000228881836,
        "wires": [
            [
                "b1153bd1.757f58"
            ]
        ]
    },
    {
        "id": "38c1a17d.bbb1ce",
        "type": "camerapi-takephoto",
        "z": "777d0e22.8e3b3",
        "filemode": "1",
        "filename": "",
        "filedefpath": "1",
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
        "x": 192.00001525878906,
        "y": 205.0000457763672,
        "wires": [
            [
                "1341e42.d727b1c",
                "60cd8711.d62068"
            ]
        ]
    },
    {
        "id": "df6c0cf1.d763c",
        "type": "influxdb out",
        "z": "777d0e22.8e3b3",
        "influxdb": "f638d6e8.4378f8",
        "name": "",
        "measurement": "image",
        "x": 723.8958511352539,
        "y": 157.25000667572021,
        "wires": []
    },
    {
        "id": "8d56342d.f0edb8",
        "type": "function",
        "z": "777d0e22.8e3b3",
        "name": "",
        "func": "var fileName = msg.payload.replace(/^.*[\\\\\\/]/, '')\nmsg.payload={\n    path:msg.payload,\n    name:fileName\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 524.8958587646484,
        "y": 156.75001335144043,
        "wires": [
            [
                "df6c0cf1.d763c"
            ]
        ]
    },
    {
        "id": "112083b6.03e44c",
        "type": "function",
        "z": "777d0e22.8e3b3",
        "name": "",
        "func": "\n\nvar payload = {\n    file : msg.payload,\n    data : \"image from server x\",\n    topic: \"NUC\",\n    localOutputResponse: true,\n    endpoint: \"777d0e22.8e3b3\"\n};\n\nmsg.payload = JSON.stringify(payload);\nmsg.headers = {'Content-Type' : 'application/json'} ;\nreturn msg;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 228.11808013916016,
        "y": 428.8889446258545,
        "wires": [
            [
                "25ee8f4.da3917"
            ]
        ]
    },
    {
        "id": "25ee8f4.da3917",
        "type": "http request",
        "z": "777d0e22.8e3b3",
        "name": "publish",
        "method": "POST",
        "ret": "txt",
        "url": "localhost:8080/publish",
        "tls": "",
        "x": 434.6736488342285,
        "y": 437.1111660003662,
        "wires": [
            [
                "60cd8711.d62068"
            ]
        ]
    },
    {
        "id": "60cd8711.d62068",
        "type": "debug",
        "z": "777d0e22.8e3b3",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 675.5625457763672,
        "y": 432.5555772781372,
        "wires": []
    },
    {
        "id": "b1153bd1.757f58",
        "type": "exec",
        "z": "777d0e22.8e3b3",
        "command": "python ir-sensor.py",
        "addpay": true,
        "append": "",
        "useSpawn": true,
        "timer": "",
        "name": "",
        "x": 333.2743110656738,
        "y": 85.0555648803711,
        "wires": [
            [
                "38c1a17d.bbb1ce"
            ],
            [],
            []
        ]
    },
    {
        "id": "1341e42.d727b1c",
        "type": "switch",
        "z": "777d0e22.8e3b3",
        "name": "",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "regex",
                "v": "/*.jpg",
                "vt": "str",
                "case": false
            }
        ],
        "checkall": "true",
        "outputs": 1,
        "x": 452.28123474121094,
        "y": 214.16321086883545,
        "wires": [
            [
                "112083b6.03e44c"
            ]
        ]
    },
    {
        "id": "f638d6e8.4378f8",
        "type": "influxdb",
        "z": "777d0e22.8e3b3",
        "hostname": "127.0.0.1",
        "port": "8086",
        "protocol": "http",
        "database": "images",
        "name": "",
        "usetls": false,
        "tls": ""
    }
]
