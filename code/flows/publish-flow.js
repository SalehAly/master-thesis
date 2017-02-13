[
    {
        "id": "3a959bb.aaed964",
        "type": "tab",
        "label": "Flow 1"
    },
    {
        "id": "50c0e274.c5f61c",
        "type": "template",
        "z": "3a959bb.aaed964",
        "name": "",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "<!DOCTYPE html>\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/html\">\n<head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>Publisher</title>\n\n    <!-- Latest compiled and minified CSS -->\n    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"\n          integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">\n\n    <!-- Optional theme -->\n    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css\"\n          integrity=\"sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp\" crossorigin=\"anonymous\">\n\n    <!-- Latest compiled and minified JavaScript -->\n    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js\">\n    </script>\n    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"\n            integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\"\n            crossorigin=\"anonymous\"\n            async=\"true\">\n    </script>\n\n</head>\n<body>\n<div class=\"container\">\n\n    <h3>Computation Meta-data</h3>\n\n    <form id=\"push\" action=\"localhost:1880/push\" method=\"post\">\n        <div class=\"row\">\n            <div class=\"col-md-6\">\n                <div class=\"well\">\n                <div class=\"form-horizontal \">\n                    <!--<div class=\"col-md-6\">-->\n                    <div class=\"form-group\">\n                        <p class=\"lead\"> The amount of computation power needed to execute the flow</p>\n                        <label for=\"power\" class=\"col-sm-2 control-label\">Computation Power</label>\n                        <div class=\"col-sm-6\">\n                            <select required=\"required\" id=\"power\" class=\"form-control input-sm\">\n                                <option value=\"1\">Low</option>\n                                <option value=\"2\">Medium</option>\n                                <option value=\"3\">High</option>\n                            </select>\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <p class=\"lead\"> The amount of free ram needed to execute the flow</p>\n                        <label for=\"ram\" class=\"col-sm-2 control-label\">Free ram</label>\n                        <div class=\"col-sm-6\">\n                            <select required=\"required\" id=\"ram\" class=\"form-control input-sm\">\n                                <option value=\"1\"><500 MB</option>\n                                <option value=\"2\">500~1000 MB</option>\n                                <option value=\"3\">>1000 MB</option>\n                            </select>\n                        </div>\n                    </div>\n                    <!--</div>-->\n                </div>\n            </div>\n\n\n            </div>\n            <div class=\"col-md-6\">\n            <div class=\"well\">\n\n\n\n                        <h4> Resource Requirements</h4>\n\n                        <div class=\"checkbox\"><label> <input id=\"camera\" type=\"checkbox\" >\n                            Camera </label></div>\n                        <div class=\"checkbox\"><label> <input id=\"temp\" type=\"checkbox\" >\n                            Temperature Sensor</label></div>\n                        <div class=\"checkbox\"><label> <input id=\"gas\" type=\"checkbox\" >\n                            Gas Sensor </label></div>\n                    </div>\n                </div>\n            </div>\n\n\n\n\n\n<h3>Flow </h3>\n<div class=\"well\">\n    <textarea rows=\"8\" required=\"required\" id=\"flow\" class=\"form-control\" rows=\"3\"></textarea>\n    <!--<pre>&lt;p&gt;Sample text here...&lt;/p&gt;</pre>-->\n    Push flow to network\n    <button type=\"submit\" class=\"btn btn-default\">PUSH</button>\n</div>\n<!-- /#page-wrapper -->\n\n\n</form>\n</div>\n\n<!-- /#wrapper -->\n\n\n</body>\n<script>\n    $(document).ready(function () {\n        $(\"#push\").submit(function (event) {\n            var resources = {camera: $('#camera').is(':checked'), gas: $('#gas').is(':checked'), temp: $('#temp').is(':checked')};\n            var metadata = { power:  $('#power').val() , ram: $('#ram').val(), resources: resources };\n            var json = { 'meta-data' : metadata,\n                    flow:  btoa($('#flow').val().trim())} ;\n            console.log(JSON.stringify(json));\n            $.ajax({\n                type: \"POST\",\n                url: 'http://localhost:1880/push',\n                data: JSON.stringify(json),\n                contentType:\"application/json\",\n                success: function (data) {\n                    //success message mybe...\n                    console.log(\"sent\");\n                    console.log(data);\n\n                }\n\n            })\n        });\n\n\n    });\n</script>\n</html>",
        "x": 281,
        "y": 220,
        "wires": [
            [
                "51c3b7a9.fe98c8"
            ]
        ]
    },
    {
        "id": "51c3b7a9.fe98c8",
        "type": "http response",
        "z": "3a959bb.aaed964",
        "name": "",
        "x": 557.5,
        "y": 211,
        "wires": []
    },
    {
        "id": "5a961e51.1a5da",
        "type": "http in",
        "z": "3a959bb.aaed964",
        "name": "",
        "url": "/publish",
        "method": "get",
        "swaggerDoc": "",
        "x": 112,
        "y": 215,
        "wires": [
            [
                "50c0e274.c5f61c"
            ]
        ]
    },
    {
        "id": "174545e7.bf341a",
        "type": "http in",
        "z": "3a959bb.aaed964",
        "name": "",
        "url": "/push",
        "method": "post",
        "swaggerDoc": "",
        "x": 107,
        "y": 292,
        "wires": [
            [
                "d3235817.29c9b8"
            ]
        ]
    },
    {
        "id": "8efe485d.8601a8",
        "type": "http response",
        "z": "3a959bb.aaed964",
        "name": "",
        "x": 492,
        "y": 288,
        "wires": []
    },
    {
        "id": "9edcb16b.57c0a",
        "type": "exec",
        "z": "3a959bb.aaed964",
        "command": "java -cp interface-1.0-SNAPSHOT.jar com.scampi.publish.Publisher",
        "addpay": true,
        "append": "",
        "useSpawn": true,
        "timer": "10",
        "name": "Publish",
        "x": 266.27777099609375,
        "y": 413.5,
        "wires": [
            [
                "fb327835.4dd218"
            ],
            [
                "fb327835.4dd218"
            ],
            [
                "8efe485d.8601a8",
                "fb327835.4dd218"
            ]
        ]
    },
    {
        "id": "fb327835.4dd218",
        "type": "debug",
        "z": "3a959bb.aaed964",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 697.2222222222222,
        "y": 333.3333333333333,
        "wires": []
    },
    {
        "id": "d3235817.29c9b8",
        "type": "function",
        "z": "3a959bb.aaed964",
        "name": "",
        "func": "msg.payload = JSON.stringify(msg.req.body);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 258.5,
        "y": 343,
        "wires": [
            [
                "9edcb16b.57c0a",
                "fb327835.4dd218"
            ]
        ]
    }
]