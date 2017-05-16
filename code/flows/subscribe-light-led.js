[
    {
        "id": "316e1145.67794e",
        "type": "tab",
        "label": "data publish"
    },
    {
        "id": "66066ed5.763ae",
        "type": "http in",
        "z": "316e1145.67794e",
        "name": "",
        "url": "/777d0e22.8e3b3",
        "method": "post",
        "swaggerDoc": "",
        "x": 182.2847442626953,
        "y": 132.96180725097656,
        "wires": [
            [
                "a4c9cc7.b52903",
                "7fe07728.9782f8",
                "41846c90.fd4624"
            ]
        ]
    },
    {
        "id": "a4c9cc7.b52903",
        "type": "debug",
        "z": "316e1145.67794e",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 610.2708129882812,
        "y": 132.05556964874268,
        "wires": []
    },
    {
        "id": "7fe07728.9782f8",
        "type": "http response",
        "z": "316e1145.67794e",
        "name": "",
        "x": 417.2777862548828,
        "y": 291.06947326660156,
        "wires": []
    },
    {
        "id": "41846c90.fd4624",
        "type": "exec",
        "z": "316e1145.67794e",
        "command": "python red_led.py",
        "addpay": true,
        "append": "",
        "useSpawn": "",
        "timer": "",
        "name": "red led",
        "x": 390.28125762939453,
        "y": 190.0451602935791,
        "wires": [
            [
                "a4c9cc7.b52903"
            ],
            [
                "a4c9cc7.b52903"
            ],
            [
                "a4c9cc7.b52903"
            ]
        ]
    }
]
