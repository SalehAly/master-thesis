[
    {
        "id": "90e665c5.822198",
        "type": "tab",
        "label": "Flow 1"
    },
    {
        "id": "ca0da5a6.4a15e8",
        "type": "inject",
        "z": "90e665c5.822198",
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
                "6292af.ae0fad5"
            ]
        ]
    },
    {
        "id": "317ecf1c.294b2",
        "type": "camerapi-takephoto",
        "z": "90e665c5.822198",
        "filemode": "1",
        "filename": "",
        "filedefpath": "1",
        "filepath": "/home/pi/.node-red/images/",
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
                "3392319a.ae2e2e",
                "fdf333e6.bdd6"
            ]
        ]
    },
    {
        "id": "f5a264e4.990618",
        "type": "influxdb out",
        "z": "90e665c5.822198",
        "influxdb": "10d7635d.d3d28d",
        "name": "",
        "measurement": "image",
        "x": 723.8958511352539,
        "y": 157.25000667572021,
        "wires": []
    },
    {
        "id": "4d5d98e8.a8dec8",
        "type": "function",
        "z": "90e665c5.822198",
        "name": "",
        "func": "var fileName = msg.payload.replace(/^.*[\\\\\\/]/, '')\nmsg.payload={\n    path:msg.payload,\n    name:fileName\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 524.8958587646484,
        "y": 156.75001335144043,
        "wires": [
            [
                "f5a264e4.990618"
            ]
        ]
    },
    {
        "id": "e7a3ceaf.ae997",
        "type": "function",
        "z": "90e665c5.822198",
        "name": "",
        "func": "\n\nvar payload = {\n    file : msg.payload,\n    data : \"image from server x\",\n    topic: \"NUC\",\n    localOutputResponse: true,\n    endpoint: \"777d0e22.8e3b3\"\n};\n\nmsg.payload = JSON.stringify(payload);\nmsg.headers = {'Content-Type' : 'application/json'} ;\nreturn msg;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 222.1180763244629,
        "y": 311.8889751434326,
        "wires": [
            [
                "b640423e.b85c6"
            ]
        ]
    },
    {
        "id": "b640423e.b85c6",
        "type": "http request",
        "z": "90e665c5.822198",
        "name": "publish",
        "method": "POST",
        "ret": "txt",
        "url": "localhost:8080/publish",
        "tls": "",
        "x": 437.6736602783203,
        "y": 317.11117362976074,
        "wires": [
            [
                "fdf333e6.bdd6"
            ]
        ]
    },
    {
        "id": "fdf333e6.bdd6",
        "type": "debug",
        "z": "90e665c5.822198",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 675.5625610351562,
        "y": 306.55558586120605,
        "wires": []
    },
    {
        "id": "6292af.ae0fad5",
        "type": "exec",
        "z": "90e665c5.822198",
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
                "317ecf1c.294b2"
            ],
            [],
            []
        ]
    },
    {
        "id": "3392319a.ae2e2e",
        "type": "switch",
        "z": "90e665c5.822198",
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
                "e7a3ceaf.ae997"
            ]
        ]
    },
    {
        "id": "467266ab.9de278",
        "type": "http in",
        "z": "90e665c5.822198",
        "name": "",
        "url": "/777d0e22.8e3b3",
        "method": "post",
        "swaggerDoc": "",
        "x": 130.7657012939453,
        "y": 463.7500591278076,
        "wires": [
            [
                "de5a81c6.48a19",
                "b8fbb0b.0bf5f5",
                "ac651efa.5306"
            ]
        ]
    },
    {
        "id": "de5a81c6.48a19",
        "type": "debug",
        "z": "90e665c5.822198",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 762.7517547607422,
        "y": 439.84377002716064,
        "wires": []
    },
    {
        "id": "b8fbb0b.0bf5f5",
        "type": "http response",
        "z": "90e665c5.822198",
        "name": "",
        "x": 569.7587280273438,
        "y": 598.8576736450195,
        "wires": []
    },
    {
        "id": "ac651efa.5306",
        "type": "exec",
        "z": "90e665c5.822198",
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
                "de5a81c6.48a19"
            ],
            [
                "de5a81c6.48a19"
            ],
            [
                "de5a81c6.48a19"
            ]
        ]
    },
    {
        "id": "10d7635d.d3d28d",
        "type": "influxdb",
        "z": "90e665c5.822198",
        "hostname": "127.0.0.1",
        "port": "8086",
        "protocol": "http",
        "database": "images",
        "name": ""
    }
]
