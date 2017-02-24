/**
 * Created by Aly on 2/24/17.
 */
[
    {
        "id": "74aecd41.7c3c64",
        "type": "tab",
        "label": "store image"
    },
    {
        "id": "c86f4ac1.0a1bb8",
        "type": "inject",
        "z": "74aecd41.7c3c64",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "60",
        "crontab": "",
        "once": false,
        "x": 85,
        "y": 114,
        "wires": [
            [
                "c3e2cb2e.4fe5d8"
            ]
        ]
    },
    {
        "id": "2ebbdce2.4d8274",
        "type": "influxdb out",
        "z": "74aecd41.7c3c64",
        "influxdb": "24b1fa97.98b266",
        "name": "",
        "measurement": "image",
        "x": 698.5,
        "y": 81,
        "wires": []
    },
    {
        "id": "d352f8eb.6a3418",
        "type": "debug",
        "z": "74aecd41.7c3c64",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 550.5,
        "y": 259,
        "wires": []
    },
    {
        "id": "320e2bf.19688d4",
        "type": "function",
        "z": "74aecd41.7c3c64",
        "name": "",
        "func": "var fileName = msg.payload.replace(/^.*[\\\\\\/]/, '')\nmsg.payload={\n    path:msg.payload,\n    name:fileName\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 472.5,
        "y": 84,
        "wires": [
            [
                "2ebbdce2.4d8274",
                "d352f8eb.6a3418"
            ]
        ]
    },
    {
        "id": "c3e2cb2e.4fe5d8",
        "type": "camerapi-takephoto",
        "z": "74aecd41.7c3c64",
        "filemode": "1",
        "filename": "",
        "filedefpath": "0",
        "filepath": "/home/pi/.node-red/images/",
        "fileformat": "jpeg",
        "resolution": "1",
        "fliph": "0",
        "flipv": "0",
        "name": "",
        "x": 281.5,
        "y": 131,
        "wires": [
            [
                "320e2bf.19688d4"
            ]
        ]
    },
    {
        "id": "24b1fa97.98b266",
        "type": "influxdb",
        "z": "74aecd41.7c3c64",
        "hostname": "127.0.0.1",
        "port": "8086",
        "protocol": "http",
        "database": "images",
        "name": ""
    }
]