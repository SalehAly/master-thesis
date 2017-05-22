[
    {
        "id": "3dd037ae.5f3338",
        "type": "tab",
        "label": "temperature"
    },
    {
        "id": "8661aa4e.3fa4e8",
        "type": "inject",
        "z": "3dd037ae.5f3338",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": true,
        "x": 158.63671875,
        "y": 166.1953125,
        "wires": [
            [
                "88b4581.146fba8"
            ]
        ]
    },
    {
        "id": "88b4581.146fba8",
        "type": "exec",
        "z": "3dd037ae.5f3338",
        "command": "python temp-sensor.py",
        "addpay": true,
        "append": "",
        "useSpawn": true,
        "timer": "",
        "name": "temp-sensor",
        "x": 315.0000228881836,
        "y": 168.50390625,
        "wires": [
            [
                "a5f4668e.406a48"
            ],
            [],
            []
        ]
    },
    {
        "id": "e4fe356d.1d0418",
        "type": "influxdb out",
        "z": "3dd037ae.5f3338",
        "influxdb": "1f517c5c.e9be34",
        "name": "tempdb",
        "measurement": "temperature",
        "x": 818.0040893554688,
        "y": 177.5586166381836,
        "wires": []
    },
    {
        "id": "58b31e8.1fef8e",
        "type": "function",
        "z": "3dd037ae.5f3338",
        "name": "adjust",
        "func": "\nvar t = new Date().getTime() * 1000000;\nmsg.payload={\n    time: t,\n    temp:msg.payload\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 635.0039596557617,
        "y": 177.13283348083496,
        "wires": [
            [
                "e4fe356d.1d0418"
            ]
        ]
    },
    {
        "id": "34573358.10b98c",
        "type": "http in",
        "z": "3dd037ae.5f3338",
        "name": "",
        "url": "/temp",
        "method": "get",
        "swaggerDoc": "",
        "x": 98,
        "y": 368.2031555175781,
        "wires": [
            [
                "5e6eaae3.a8e134"
            ]
        ]
    },
    {
        "id": "5c06173f.7a1a88",
        "type": "http response",
        "z": "3dd037ae.5f3338",
        "name": "",
        "x": 595.0040054321289,
        "y": 369.675892829895,
        "wires": []
    },
    {
        "id": "5e6eaae3.a8e134",
        "type": "function",
        "z": "3dd037ae.5f3338",
        "name": "",
        "func": "var start = msg.payload.start;\nvar end = msg.payload.end;\n\nvar query = \"SELECT * FROM temperature\"\n\nif(start != null && end != null)\nquery += \"where time > '\" + start +\"' and time < '\" + end +\"';\";\nelse query +=\" where time > now() - 2m order by time desc\";\n\nmsg.query = query;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 251.00785636901855,
        "y": 367.1445732116699,
        "wires": [
            [
                "57e06b5f.f89d24"
            ]
        ]
    },
    {
        "id": "57e06b5f.f89d24",
        "type": "influxdb in",
        "z": "3dd037ae.5f3338",
        "influxdb": "1f517c5c.e9be34",
        "name": "getTemp",
        "query": "",
        "x": 402.00783920288086,
        "y": 371.0742702484131,
        "wires": [
            [
                "5c06173f.7a1a88"
            ]
        ]
    },
    {
        "id": "a5f4668e.406a48",
        "type": "switch",
        "z": "3dd037ae.5f3338",
        "name": "filter",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "regex",
                "v": "^[0-9]+",
                "vt": "str",
                "case": false
            }
        ],
        "checkall": "true",
        "outputs": 1,
        "x": 485.0000457763672,
        "y": 166.13282012939453,
        "wires": [
            [
                "58b31e8.1fef8e",
                "10957e9.ce2eb81"
            ]
        ]
    },
    {
        "id": "10957e9.ce2eb81",
        "type": "switch",
        "z": "3dd037ae.5f3338",
        "name": "temp > 30",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "gt",
                "v": "30",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "outputs": 1,
        "x": 518.0117492675781,
        "y": 269.12891387939453,
        "wires": [
            [
                "11ea0b65.c7c045"
            ]
        ]
    },
    {
        "id": "11ea0b65.c7c045",
        "type": "exec",
        "z": "3dd037ae.5f3338",
        "command": "python red-led.py",
        "addpay": true,
        "append": "",
        "useSpawn": "",
        "timer": "",
        "name": "red led",
        "x": 721.765625,
        "y": 271.75,
        "wires": [
            [],
            [],
            []
        ]
    },
    {
        "id": "1f517c5c.e9be34",
        "type": "influxdb",
        "z": "3dd037ae.5f3338",
        "hostname": "127.0.0.1",
        "port": "8086",
        "protocol": "http",
        "database": "images",
        "name": "",
        "usetls": false,
        "tls": ""
    }
]
