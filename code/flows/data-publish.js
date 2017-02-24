/**
 * Created by Aly on 2/24/17.
 */
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
        "x": 126.5,
        "y": 110,
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
        "x": 634.5,
        "y": 136,
        "wires": []
    },
    {
        "id": "8382ee88.25143",
        "type": "exec",
        "z": "6246f5af.9db90c",
        "command": "java -cp interface-1.0-SNAPSHOT.jar com.scampi.publish.Publisher",
        "addpay": true,
        "append": "data",
        "useSpawn": false,
        "timer": "10",
        "name": "Publish",
        "x": 462,
        "y": 285,
        "wires": [
            [
                "42d9392e.25faa8"
            ],
            [
                "42d9392e.25faa8"
            ],
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
        "func": "msg.payload = {timestamp:msg.payload};\nmsg.payload = JSON.stringify(msg.payload);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 259.5,
        "y": 257,
        "wires": [
            [
                "8382ee88.25143"
            ]
        ]
    }
]