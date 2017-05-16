[
    {
        "id": "1cc2586a.afa048",
        "type": "tab",
        "label": "Tensor Flow"
    },
    {
        "id": "b82f055.2c587f8",
        "type": "inject",
        "z": "1cc2586a.afa048",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": true,
        "x": 229.76565170288086,
        "y": 100.75000381469727,
        "wires": [
            [
                "4b540143.f26da"
            ]
        ]
    },
    {
        "id": "4b540143.f26da",
        "type": "function",
        "z": "1cc2586a.afa048",
        "name": "init",
        "func": "var time = JSON.stringify({timestamp:msg.payload});\n\nvar payload = {\n    data : \"1cc2586a.afa048\",\n    topic:\"NUC\"\n};\n\nmsg.payload = JSON.stringify(payload);\nmsg.headers = {'Content-Type' : 'application/json'} ;\n\nflow.set('payloadArray', []);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 387.53127670288086,
        "y": 96.10939121246338,
        "wires": [
            [
                "53f6101d.f3887"
            ]
        ]
    },
    {
        "id": "53f6101d.f3887",
        "type": "http request",
        "z": "1cc2586a.afa048",
        "name": "Subscribe",
        "method": "POST",
        "ret": "txt",
        "url": "localhost:8080/subscribe",
        "tls": "",
        "x": 565.7656784057617,
        "y": 98.10939407348633,
        "wires": [
            [
                "86f52b75.fd9f88"
            ]
        ]
    },
    {
        "id": "dc4ea1ee.4e761",
        "type": "exec",
        "z": "1cc2586a.afa048",
        "command": "java -jar label-image-1.0-SNAPSHOT.jar",
        "addpay": true,
        "append": "",
        "useSpawn": "",
        "timer": "",
        "name": "",
        "x": 562.000244140625,
        "y": 211.5117473602295,
        "wires": [
            [
                "d6574563.7b0558",
                "f8499c1c.b7963"
            ],
            [],
            []
        ]
    },
    {
        "id": "f62c9012.cdfb5",
        "type": "http in",
        "z": "1cc2586a.afa048",
        "name": "",
        "url": "/1cc2586a.afa048",
        "method": "post",
        "swaggerDoc": "",
        "x": 115,
        "y": 202.68751335144043,
        "wires": [
            [
                "7e336a7.32c0d94",
                "e849f62e.e617d8"
            ]
        ]
    },
    {
        "id": "7e336a7.32c0d94",
        "type": "function",
        "z": "1cc2586a.afa048",
        "name": "",
        "func": "flow.set('payload', msg.payload);\nmsg.payload =  msg.payload.path ;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 318.00000762939453,
        "y": 212.1445484161377,
        "wires": [
            [
                "dc4ea1ee.4e761"
            ]
        ]
    },
    {
        "id": "86f52b75.fd9f88",
        "type": "debug",
        "z": "1cc2586a.afa048",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 967.0156192779541,
        "y": 193.66798210144043,
        "wires": []
    },
    {
        "id": "e849f62e.e617d8",
        "type": "http response",
        "z": "1cc2586a.afa048",
        "name": "",
        "x": 102.00784301757812,
        "y": 311.6680030822754,
        "wires": []
    },
    {
        "id": "d6574563.7b0558",
        "type": "switch",
        "z": "1cc2586a.afa048",
        "name": "",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "cont",
                "v": "water bottle",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "outputs": 1,
        "x": 276.00787353515625,
        "y": 423.1289415359497,
        "wires": [
            [
                "d5ea4954.ad70e8",
                "86f52b75.fd9f88"
            ]
        ]
    },
    {
        "id": "d5ea4954.ad70e8",
        "type": "function",
        "z": "1cc2586a.afa048",
        "name": "payload",
        "func": "var message = flow.get('payload' );\nvar endpoint = message.publisher_id;\n\nvar payload = {\n    data : msg.payload,\n    topic: endpoint\n};\n\nmsg.payload = JSON.stringify(payload);\nmsg.headers = {'Content-Type' : 'application/json'} ;\n\nflow.set('payloadArray', []);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 501.7657012939453,
        "y": 420.7500352859497,
        "wires": [
            [
                "360ed0b4.adb88",
                "86f52b75.fd9f88"
            ]
        ]
    },
    {
        "id": "360ed0b4.adb88",
        "type": "http request",
        "z": "1cc2586a.afa048",
        "name": "publish",
        "method": "POST",
        "ret": "txt",
        "url": "localhost:8080/publish",
        "tls": "",
        "x": 680.0000534057617,
        "y": 419.7500591278076,
        "wires": [
            [
                "86f52b75.fd9f88"
            ]
        ]
    },
    {
        "id": "f8499c1c.b7963",
        "type": "switch",
        "z": "1cc2586a.afa048",
        "name": "",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "cont",
                "v": "BEST MATCH",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "outputs": 1,
        "x": 825.7656364440918,
        "y": 296.74999809265137,
        "wires": [
            [
                "86f52b75.fd9f88"
            ]
        ]
    }
]
