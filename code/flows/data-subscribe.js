/**
 * Created by Aly on 2/24/17.
 */
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
        "url": "/data",
        "method": "post",
        "swaggerDoc": "",
        "x": 217.5,
        "y": 235,
        "wires": [
            [
                "8407c551.c6a118",
                "36571ba9.6072c4"
            ]
        ]
    },
    {
        "id": "8407c551.c6a118",
        "type": "debug",
        "z": "d81b8283.bc9e4",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 504.5,
        "y": 181,
        "wires": []
    },
    {
        "id": "36571ba9.6072c4",
        "type": "http response",
        "z": "d81b8283.bc9e4",
        "name": "",
        "x": 509.5,
        "y": 289,
        "wires": []
    }
]