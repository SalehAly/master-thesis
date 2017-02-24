/**
 * Created by Aly on 2/24/17.
 */
[
    {
        "id": "90bd5403.a39818",
        "type": "tab",
        "label": "get image"
    },
    {
        "id": "bade0248.b2a12",
        "type": "influxdb in",
        "z": "90bd5403.a39818",
        "influxdb": "263da5b3.6b2d8a",
        "name": "",
        "query": "select * from image;",
        "x": 297,
        "y": 170,
        "wires": [
            [
                "6049aafa.679d84"
            ]
        ]
    },
    {
        "id": "486ee36b.2e458c",
        "type": "template",
        "z": "90bd5403.a39818",
        "name": "",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "<html>\nThis is the payload:\n{{#payload}}\n<div class =\"media\">\n<img src={{name}}>time: {{time}}</img>\n </div>\n<br>\n{{/payload}}\n</html>\n",
        "x": 201,
        "y": 333,
        "wires": [
            [
                "2682a84a.9c1048"
            ]
        ]
    },
    {
        "id": "2682a84a.9c1048",
        "type": "http response",
        "z": "90bd5403.a39818",
        "name": "",
        "x": 693,
        "y": 258,
        "wires": []
    },
    {
        "id": "6049aafa.679d84",
        "type": "function",
        "z": "90bd5403.a39818",
        "name": "",
        "func": "msg.payload=msg.payload[0];\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 180.5,
        "y": 248,
        "wires": [
            [
                "486ee36b.2e458c"
            ]
        ]
    },
    {
        "id": "d1289628.43d8e8",
        "type": "http in",
        "z": "90bd5403.a39818",
        "name": "",
        "url": "/images",
        "method": "get",
        "swaggerDoc": "",
        "x": 131.5,
        "y": 77,
        "wires": [
            [
                "bade0248.b2a12"
            ]
        ]
    },
    {
        "id": "263da5b3.6b2d8a",
        "type": "influxdb",
        "z": "90bd5403.a39818",
        "hostname": "127.0.0.1",
        "port": "8086",
        "protocol": "http",
        "database": "images",
        "name": ""
    }
]