[
    {
        "id": "6246f5af.9db90c",
        "type": "tab",
        "label": "data publish"
    },
    {
        "id": "a42ff494.97b458",
        "type": "inject",
        "z": "6246f5af.9db90c",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 119.83333587646484,
        "y": 176.66665744781494,
        "wires": [
            [
                "7a2c901b.b513f"
            ]
        ]
    },
    {
        "id": "42d9392e.25faa8",
        "type": "debug",
        "z": "6246f5af.9db90c",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 589.1666793823242,
        "y": 176.55556106567383,
        "wires": []
    },
    {
        "id": "7dd95601.3f9a38",
        "type": "http request",
        "z": "6246f5af.9db90c",
        "name": "",
        "method": "POST",
        "ret": "txt",
        "url": "localhost:8080/publish",
        "tls": "",
        "x": 406.94441986083984,
        "y": 176.22223663330078,
        "wires": [
            [
                "42d9392e.25faa8"
            ]
        ]
    },
    {
        "id": "7a2c901b.b513f",
        "type": "function",
        "z": "6246f5af.9db90c",
        "name": "",
        "func": "var time = JSON.stringify({timestamp:msg.payload});\n\nvar payload = {\n    data : time,\n    topic:\"test\"\n};\n\nmsg.payload = JSON.stringify(payload);\nmsg.headers = {'Content-Type' : 'application/json'} ;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 257.27777099609375,
        "y": 176.3333339691162,
        "wires": [
            [
                "7dd95601.3f9a38"
            ]
        ]
    }
]