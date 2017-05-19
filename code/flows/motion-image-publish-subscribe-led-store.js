[
    {
        "id": "7132d115.f163f",
        "type": "tab",
        "label": "Detect & Store"
    },
    {
        "id": "1d39171f.f7a329",
        "type": "inject",
        "z": "7132d115.f163f",
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
                "bfa42eb4.2233b"
            ]
        ]
    },
    {
        "id": "ea9fe925.bb0928",
        "type": "camerapi-takephoto",
        "z": "7132d115.f163f",
        "filemode": "1",
        "filename": "",
        "filedefpath": "0",
        "filepath": "/home/pi/.node-red/static/",
        "fileformat": "jpeg",
        "resolution": "1",
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
                "386249a7.fc83a6",
                "3b24f067.38925"
            ]
        ]
    },
    {
        "id": "89f3cd87.82e16",
        "type": "influxdb out",
        "z": "7132d115.f163f",
        "influxdb": "dd25fb9f.bd72a8",
        "name": "",
        "measurement": "image",
        "x": 722.8958969116211,
        "y": 560.2500152587891,
        "wires": []
    },
    {
        "id": "d0b405df.35ac98",
        "type": "function",
        "z": "7132d115.f163f",
        "name": "",
        "func": "var data = JSON.parse(msg.payload.data);\nvar t = new Date().getTime();\nmsg.payload={\n    name: data.path,\n    time: t,\n    result:data.result\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 505.89591789245605,
        "y": 555.7500305175781,
        "wires": [
            [
                "89f3cd87.82e16"
            ]
        ]
    },
    {
        "id": "e18aecbc.99e3",
        "type": "function",
        "z": "7132d115.f163f",
        "name": "",
        "func": "\n\nvar payload = {\n    file : msg.payload,\n    data : \"image from server x\",\n    topic: \"NUC\",\n    localOutputResponse: true,\n    endpoint: \"777d0e22.8e3b3\"\n};\n\nmsg.payload = JSON.stringify(payload);\nmsg.headers = {'Content-Type' : 'application/json'} ;\nreturn msg;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 222.1180763244629,
        "y": 311.8889751434326,
        "wires": [
            [
                "ad833737.1aecc8"
            ]
        ]
    },
    {
        "id": "ad833737.1aecc8",
        "type": "http request",
        "z": "7132d115.f163f",
        "name": "publish",
        "method": "POST",
        "ret": "txt",
        "url": "localhost:8080/publish",
        "tls": "",
        "x": 437.6736602783203,
        "y": 317.11117362976074,
        "wires": [
            [
                "3b24f067.38925"
            ]
        ]
    },
    {
        "id": "3b24f067.38925",
        "type": "debug",
        "z": "7132d115.f163f",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 675.5625610351562,
        "y": 306.55558586120605,
        "wires": []
    },
    {
        "id": "bfa42eb4.2233b",
        "type": "exec",
        "z": "7132d115.f163f",
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
                "ea9fe925.bb0928"
            ],
            [],
            []
        ]
    },
    {
        "id": "386249a7.fc83a6",
        "type": "switch",
        "z": "7132d115.f163f",
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
                "e18aecbc.99e3"
            ]
        ]
    },
    {
        "id": "5741352a.da9b6c",
        "type": "http in",
        "z": "7132d115.f163f",
        "name": "",
        "url": "/777d0e22.8e3b3",
        "method": "post",
        "swaggerDoc": "",
        "x": 130.7657012939453,
        "y": 463.7500591278076,
        "wires": [
            [
                "2eba801a.f79e7",
                "ca11a3e0.d896d",
                "da780972.11bd48",
                "d0b405df.35ac98"
            ]
        ]
    },
    {
        "id": "2eba801a.f79e7",
        "type": "debug",
        "z": "7132d115.f163f",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 762.7517547607422,
        "y": 439.84377002716064,
        "wires": []
    },
    {
        "id": "ca11a3e0.d896d",
        "type": "http response",
        "z": "7132d115.f163f",
        "name": "",
        "x": 362.75873947143555,
        "y": 595.8577346801758,
        "wires": []
    },
    {
        "id": "da780972.11bd48",
        "type": "exec",
        "z": "7132d115.f163f",
        "command": "python red-led.py",
        "addpay": true,
        "append": "",
        "useSpawn": "",
        "timer": "",
        "name": "red led",
        "x": 542.7621994018555,
        "y": 497.83336067199707,
        "wires": [
            [
                "2eba801a.f79e7"
            ],
            [
                "2eba801a.f79e7"
            ],
            [
                "2eba801a.f79e7"
            ]
        ]
    },
    {
        "id": "dd25fb9f.bd72a8",
        "type": "influxdb",
        "z": "7132d115.f163f",
        "hostname": "127.0.0.1",
        "port": "8086",
        "protocol": "http",
        "database": "images",
        "name": ""
    }
]
