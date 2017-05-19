[
    {
        "id": "cca742dd.afe6f",
        "type": "tab",
        "label": "images"
    },
    {
        "id": "db5fb070.9859e",
        "type": "http in",
        "z": "cca742dd.afe6f",
        "name": "GET /images",
        "url": "/images",
        "method": "get",
        "swaggerDoc": "",
        "x": 89.625,
        "y": 161.6484432220459,
        "wires": [
            [
                "1f883748.114de9"
            ]
        ]
    },
    {
        "id": "1f883748.114de9",
        "type": "influxdb in",
        "z": "cca742dd.afe6f",
        "influxdb": "f6bcb1f6.6eb88",
        "name": "select images",
        "query": "select * from image",
        "x": 288.0156784057617,
        "y": 162.07813262939453,
        "wires": [
            [
                "32f61b23.4b66e4"
            ]
        ]
    },
    {
        "id": "32f61b23.4b66e4",
        "type": "template",
        "z": "cca742dd.afe6f",
        "name": "",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "{{#payload}}\n<div>\n    <p>{{result}}</p> <p>{{time}}</p>\n    <img src=\"{{name}}\" alt=\"\" />\n</div>\n{{/payload}}",
        "x": 457.76565170288086,
        "y": 161.75000286102295,
        "wires": [
            [
                "c9a2e6ae.b516c8"
            ]
        ]
    },
    {
        "id": "c9a2e6ae.b516c8",
        "type": "http response",
        "z": "cca742dd.afe6f",
        "name": "",
        "x": 657.7616691589355,
        "y": 170.28125,
        "wires": []
    },
    {
        "id": "f6bcb1f6.6eb88",
        "type": "influxdb",
        "z": "cca742dd.afe6f",
        "hostname": "127.0.0.1",
        "port": "8086",
        "protocol": "http",
        "database": "images",
        "name": "",
        "usetls": false,
        "tls": ""
    }
]
