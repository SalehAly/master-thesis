[
    {
        "id": "ee736c81.306ff",
        "type": "tab",
        "label": "Tensor Flow"
    },
    {
        "id": "1b7d4033.db04d",
        "type": "inject",
        "z": "ee736c81.306ff",
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
                "c898e6c7.5891e8"
            ]
        ]
    },
    {
        "id": "c898e6c7.5891e8",
        "type": "function",
        "z": "ee736c81.306ff",
        "name": "init",
        "func": "var time = JSON.stringify({timestamp:msg.payload});\n\nvar payload = {\n    data : \"1cc2586a.afa048\",\n    topic:\"NUC\"\n};\n\nmsg.payload = JSON.stringify(payload);\nmsg.headers = {'Content-Type' : 'application/json'} ;\n\nflow.set('payloadArray', []);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 387.53127670288086,
        "y": 96.10939121246338,
        "wires": [
            [
                "89f7436.35b42c"
            ]
        ]
    },
    {
        "id": "89f7436.35b42c",
        "type": "http request",
        "z": "ee736c81.306ff",
        "name": "Subscribe",
        "method": "POST",
        "ret": "txt",
        "url": "localhost:8080/subscribe",
        "tls": "",
        "x": 565.7656784057617,
        "y": 98.10939407348633,
        "wires": [
            [
                "95467c4a.c8943"
            ]
        ]
    },
    {
        "id": "bfa614fb.f09bc8",
        "type": "exec",
        "z": "ee736c81.306ff",
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
                "173d3cc5.710d23",
                "f9794567.12fc48"
            ],
            [],
            []
        ]
    },
    {
        "id": "be71e63.073a918",
        "type": "http in",
        "z": "ee736c81.306ff",
        "name": "",
        "url": "/1cc2586a.afa048",
        "method": "post",
        "swaggerDoc": "",
        "x": 115,
        "y": 202.68751335144043,
        "wires": [
            [
                "c193e2f6.38f5d",
                "4f9ba8f3.28b4a8"
            ]
        ]
    },
    {
        "id": "c193e2f6.38f5d",
        "type": "function",
        "z": "ee736c81.306ff",
        "name": "",
        "func": "flow.set('payload', msg.payload);\nmsg.payload =  msg.payload.path ;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 318.00000762939453,
        "y": 212.1445484161377,
        "wires": [
            [
                "bfa614fb.f09bc8"
            ]
        ]
    },
    {
        "id": "95467c4a.c8943",
        "type": "debug",
        "z": "ee736c81.306ff",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 967.0156192779541,
        "y": 193.66798210144043,
        "wires": []
    },
    {
        "id": "4f9ba8f3.28b4a8",
        "type": "http response",
        "z": "ee736c81.306ff",
        "name": "",
        "x": 102.00784301757812,
        "y": 311.6680030822754,
        "wires": []
    },
    {
        "id": "173d3cc5.710d23",
        "type": "switch",
        "z": "ee736c81.306ff",
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
                "c25cbe09.42aea",
                "95467c4a.c8943"
            ]
        ]
    },
    {
        "id": "c25cbe09.42aea",
        "type": "function",
        "z": "ee736c81.306ff",
        "name": "payload",
        "func": "var message = flow.get('payload' );\nvar endpoint = message.publisher_id;\n\nvar dataObject = {\n    path : message.path,\n    result: msg.payload \n}\n\nvar payload = {\n    data : JSON.stringify(dataObject),\n    topic: endpoint\n};\n\nmsg.payload = JSON.stringify(payload);\nmsg.headers = {'Content-Type' : 'application/json'} ;\n\nflow.set('payloadArray', []);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 501.7657012939453,
        "y": 420.7500352859497,
        "wires": [
            [
                "87b67a2b.b98728",
                "95467c4a.c8943"
            ]
        ]
    },
    {
        "id": "87b67a2b.b98728",
        "type": "http request",
        "z": "ee736c81.306ff",
        "name": "publish",
        "method": "POST",
        "ret": "txt",
        "url": "localhost:8080/publish",
        "tls": "",
        "x": 680.0000534057617,
        "y": 419.7500591278076,
        "wires": [
            [
                "95467c4a.c8943"
            ]
        ]
    },
    {
        "id": "f9794567.12fc48",
        "type": "switch",
        "z": "ee736c81.306ff",
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
                "95467c4a.c8943"
            ]
        ]
    }
]
