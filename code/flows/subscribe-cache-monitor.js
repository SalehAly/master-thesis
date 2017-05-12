[
    {
        "id": "d81b8283.bc9e4",
        "type": "tab",
        "label": "data sub"
    },
    {
        "id": "6b00f2d9.b344bc",
        "type": "http in",
        "z": "d81b8283.bc9e4",
        "name": "",
        "url": "/d81b8283.bc9e4",
        "method": "post",
        "swaggerDoc": "",
        "x": 121,
        "y": 229.00001335144043,
        "wires": [
            [
                "1939150e.534e3b"
            ]
        ]
    },
    {
        "id": "c10b4f18.b1b58",
        "type": "http request",
        "z": "d81b8283.bc9e4",
        "name": "",
        "method": "POST",
        "ret": "txt",
        "url": "localhost:8080/subscribe",
        "tls": "",
        "x": 438.00002670288086,
        "y": 90.75000357627869,
        "wires": [
            []
        ]
    },
    {
        "id": "7ab01ba5.642a24",
        "type": "inject",
        "z": "d81b8283.bc9e4",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": true,
        "x": 103,
        "y": 103.39061164855957,
        "wires": [
            [
                "1737514f.f461ff"
            ]
        ]
    },
    {
        "id": "1737514f.f461ff",
        "type": "function",
        "z": "d81b8283.bc9e4",
        "name": "",
        "func": "var time = JSON.stringify({timestamp:msg.payload});\n\nvar payload = {\n    data : \"d81b8283.bc9e4\",\n    topic:\"Listener\"\n};\n\nmsg.payload = JSON.stringify(payload);\nmsg.headers = {'Content-Type' : 'application/json'} ;\n\nflow.set('payloadArray', []);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 260.765625,
        "y": 93.75,
        "wires": [
            [
                "c10b4f18.b1b58"
            ]
        ]
    },
    {
        "id": "8014625b.93d92",
        "type": "http in",
        "z": "d81b8283.bc9e4",
        "name": "",
        "url": "/monitor",
        "method": "get",
        "swaggerDoc": "",
        "x": 147.01172637939453,
        "y": 352.19143295288086,
        "wires": [
            [
                "3af9f24a.958bbe"
            ]
        ]
    },
    {
        "id": "39ede435.9f1a0c",
        "type": "http response",
        "z": "d81b8283.bc9e4",
        "name": "",
        "x": 843.0078392028809,
        "y": 383.6602077484131,
        "wires": []
    },
    {
        "id": "1939150e.534e3b",
        "type": "function",
        "z": "d81b8283.bc9e4",
        "name": "",
        "func": "msg.topic = \"Listener\";\nvar payloads = flow.get('payloadArray');\npayloads.push(msg.payload);\nflow.set('payloadArray',payloads );\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 371.007869720459,
        "y": 233.12891960144043,
        "wires": [
            [
                "3bdb4783.e8f248",
                "b344b1cd.ab1b9"
            ]
        ]
    },
    {
        "id": "3af9f24a.958bbe",
        "type": "function",
        "z": "d81b8283.bc9e4",
        "name": "",
        "func": "msg.payload = flow.get('payloadArray');\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 334.00782012939453,
        "y": 373.12893533706665,
        "wires": [
            [
                "cb01cc6a.50c18",
                "b344b1cd.ab1b9"
            ]
        ]
    },
    {
        "id": "cb01cc6a.50c18",
        "type": "template",
        "z": "d81b8283.bc9e4",
        "name": "",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "{{#payload}}\n<div>\n    <p>{{data}}</p>\n    <img src=\"data:image/png;base64, {{file}}\" alt=\"\" />\n</div>\n{{/payload}}",
        "x": 524.0117950439453,
        "y": 395.12894916534424,
        "wires": [
            [
                "39ede435.9f1a0c"
            ]
        ]
    },
    {
        "id": "3bdb4783.e8f248",
        "type": "http response",
        "z": "d81b8283.bc9e4",
        "name": "",
        "x": 581.0039329528809,
        "y": 208.6171932220459,
        "wires": []
    },
    {
        "id": "b344b1cd.ab1b9",
        "type": "debug",
        "z": "d81b8283.bc9e4",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 831,
        "y": 263.67578125,
        "wires": []
    }
]
