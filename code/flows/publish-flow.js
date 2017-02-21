[
    {
        "id": "9c54f072.c8618",
        "type": "tab",
        "label": "Flow 1"
    },
    {
        "id": "8a903b1b.20e4e8",
        "type": "template",
        "z": "9c54f072.c8618",
        "name": "",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "<!DOCTYPE html>\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/html\">\n<head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>Publisher</title>\n\n    <!-- Latest compiled and minified CSS -->\n    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"\n          integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">\n\n    <!-- Optional theme -->\n    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css\"\n          integrity=\"sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp\" crossorigin=\"anonymous\">\n\n    <!-- Latest compiled and minified JavaScript -->\n    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js\">\n    </script>\n    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"\n            integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\"\n            crossorigin=\"anonymous\"\n            async=\"true\">\n    </script>\n\n</head>\n<body>\n<div class=\"container\">\n\n\n    <form id=\"push\" action=\"localhost:1880/push\" method=\"post\" novalidate>\n        <div class=\"row\">\n\n            <div class=\"col-md-6\">\n                <h4>Computation Meta-data</h4>\n                <div class=\"well form-horizontal\">\n                        <div class=\"form-group\">\n                            <!--<p class=\"lead\"> The amount of computation power needed to execute the flow</p>-->\n                            <label for=\"power\" class=\"col-sm-2 control-label\">Computation Power</label>\n                            <div class=\"col-sm-6\">\n                                <select required=\"required\" id=\"power\" class=\"form-control input-sm\">\n                                    <option value=\"low\">Low</option>\n                                    <option value=\"medium\">Medium</option>\n                                    <option value=\"high\">High</option>\n                                </select>\n                            </div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <!--<p class=\"lead\"> The amount of free ram needed to execute the flow</p>-->\n                            <label for=\"ram\" class=\"col-sm-2 control-label\">Free ram</label>\n                            <div class=\"col-sm-6\">\n                                <select required=\"required\" id=\"ram\" class=\"form-control input-sm\">\n                                    <option value=\"low\"><500 MB</option>\n                                    <option value=\"medium\">500~1000 MB</option>\n                                    <option value=\"high\">>1000 MB</option>\n                                </select>\n                            </div>\n                        <!--</div>-->\n                    </div>\n                </div>\n\n\n            </div>\n\n            <div class=\"col-md-6\">\n                <h4>Resource Requirements</h4>\n                <div class=\"well\">\n                    <div class=\"checkbox\"><label> <input id=\"camera\" type=\"checkbox\">\n                        Camera </label></div>\n                    <div class=\"checkbox\"><label> <input id=\"temp\" type=\"checkbox\">\n                        Temperature Sensor</label></div>\n                    <div class=\"checkbox\"><label> <input id=\"gas\" type=\"checkbox\">\n                        Gas Sensor </label></div>\n                </div>\n            </div>\n        </div>\n\n\n        <h3>Flow </h3>\n\n\n        <div class=\"well\">\n            <div class=\"row form-horizontal\">\n\n                <div class=\"col-md-6\">\n\n\n\n                    <div class=\"form-group\">\n                        <label for=\"flow\" class=\"col-sm-3 control-label\">Flow Id</label>\n                        <div class=\"col-sm-6\">\n                            <input type=\"text\" required=\"required\" id=\"flow\" class=\"form-control input-sm\">\n                        </div>\n                      </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"input\" class=\"col-sm-3 control-label\">Flow Id</label>\n                        <div class=\"col-sm-6\">\n                            <select required=\"required\" id=\"input\" class=\"form-control input-sm\">\n                                <option value=\"none\">None</option>\n                                <option value=\"scampi\">SCAMPI</option>\n                            </select>\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\" id=\"scampi-input\" style=\"display: none\">\n                        <label for=\"input\" class=\"col-sm-3 control-label\">SCAMPI Input Topic</label>\n                        <div class=\"col-sm-6\">\n                            <input  type=\"text\" required=\"required\" id=\"input-topic\" class=\"form-control input-sm\">\n                        </div>\n                    </div>\n\n                </div>\n\n\n\n                <div class=\"col-md-6\" >\n                    <div  class=\"form-group\">\n                        <label>File Dependency</label>\n                        <input id= \"files\" type=\"file\" name=\"file\" multiple >\n                        <p class=\"help-block\">Add data files or scripts from node-red directory</p>\n                    </div>\n\n\n\n                </div>\n\n\n            </div>\n            </div>\n\n        <!-- /#page-wrapper -->\n        <div id= \"success\" style=\"display: none;\" class=\"alert alert-success\" role=\"alert\">...</div>\n        <div id= \"fail\" style=\"display: none;\"class=\"alert alert-danger\" role=\"alert\">...</div>\n\n        <div class=\"form-group well\">\n            <label for=\"submit\" class=\"col-sm-2 control-label\">Push flow to network</label>\n            <button id=\"submit\" type=\"submit\" class=\"btn btn-success\">PUSH</button>\n        </div>\n    </form>\n\n\n</div>\n\n<!-- /#wrapper -->\n\n\n</body>\n<script>\n    $(document).ready(function () {\n\n\n        $( \"#input\" ).change(function() {\n            var value = $(\"#input\").val();\n            if(value === \"scampi\"){\n                $(\"#scampi-input\").show();\n          //      $(\"#database-input\").hide();\n           // }else if(value === \"datastore\") {\n            //    $(\"#scampi-input\").hide();\n             //   $(\"#database-input\").show();\n            }else{\n                $(\"#scampi-input\").hide();\n               // $(\"#database-input\").hide();\n            }\n        });\n//        $( \"#output\" ).change(function() {\n//            var value = $(\"#output\").val();\n//            if(value === \"scampi\"){\n//                $(\"#scampi-output\").show();\n//                $(\"#database-output\").hide();\n//            }else if(value === \"datastore\") {\n//                $(\"#scampi-output\").hide();\n//                $(\"#database-output\").show();\n//            }else{\n//                $(\"#scampi-output\").hide();\n//                $(\"#database-output\").hide();\n//            }\n//        });\n\n//        $(':file').change(function(e){\n//            for(var i =0; i<e.target.files.length;i++){\n//                var fileName = e.target.files[i].name;\n//                alert('The file \"' + fileName +  '\" has been selected.');\n//            }\n//        });\n\n        $(\"#push\").submit(function (event) {\n\n            var files = $('#files').prop(\"files\");\n            var names = $.map(files, function(val) { return val.name; });\n\n            var resources = {\n                camera: $('#camera').is(':checked'),\n                gas: $('#gas').is(':checked'),\n                temp: $('#temp').is(':checked')\n            };\n\n            var metadata = {\n                power: $('#power').val(),\n                ram: $('#ram').val(),\n                resources: resources\n            };\n\n            var input, output;\n            var ioSpec = {};\n\n            if($(\"#input\").val() != \"none\"){\n                 input = {\n                    'topic': $('#input-topic').val(),\n                    'table': $('#input-table').val()\n                };\n                ioSpec['input'] = input;\n            }\n            if($(\"#output\").val() != \"none\"){\n                output = {\n                    'topic': $('#output-topic').val(),\n                    'table': $('#output-table').val()\n                };\n                ioSpec['output'] = output;\n            }\n\n            var json = {\n                'meta-data': metadata,\n                flow: $('#flow').val(),\n                'io-spec': ioSpec,\n                sources: names\n            };\n\n\n            $.ajax({\n                type: \"POST\",\n                url: 'http://localhost:1880/push',\n                //processData: false,\n                data: JSON.stringify(json),\n                contentType: \"application/json\",\n                success: function (data) {\n                    //success message mybe...\n                    console.log(\"sent\");\n                    console.log(data);\n                    if(data == 0){\n                        $(\"#sucess\").show();\n                    }else{\n                        $(\"#fail\").show();\n                    }\n\n                }\n\n            })\n        });\n\n\n    });\n</script>\n</html>",
        "x": 230,
        "y": 77,
        "wires": [
            [
                "438bc950.1c0438"
            ]
        ]
    },
    {
        "id": "438bc950.1c0438",
        "type": "http response",
        "z": "9c54f072.c8618",
        "name": "",
        "x": 372.5,
        "y": 74,
        "wires": []
    },
    {
        "id": "6a03f3e1.b42c6c",
        "type": "http in",
        "z": "9c54f072.c8618",
        "name": "",
        "url": "/publish",
        "method": "get",
        "swaggerDoc": "",
        "x": 85,
        "y": 79,
        "wires": [
            [
                "8a903b1b.20e4e8"
            ]
        ]
    },
    {
        "id": "f55b55b3.e9ad08",
        "type": "http response",
        "z": "9c54f072.c8618",
        "name": "",
        "x": 671,
        "y": 458,
        "wires": []
    },
    {
        "id": "b1967306.ccb04",
        "type": "exec",
        "z": "9c54f072.c8618",
        "command": "java -cp interface-1.0-SNAPSHOT.jar com.scampi.publish.Publisher",
        "addpay": true,
        "append": "",
        "useSpawn": true,
        "timer": "10",
        "name": "Publish",
        "x": 294.27777099609375,
        "y": 385.5,
        "wires": [
            [
                "f6aada93.e99368"
            ],
            [
                "f6aada93.e99368"
            ],
            [
                "f55b55b3.e9ad08",
                "f6aada93.e99368"
            ]
        ]
    },
    {
        "id": "f6aada93.e99368",
        "type": "debug",
        "z": "9c54f072.c8618",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 697.2222222222222,
        "y": 333.3333333333333,
        "wires": []
    },
    {
        "id": "d4df06ab.167a58",
        "type": "function",
        "z": "9c54f072.c8618",
        "name": "",
        "func": "var flowId = msg.req.body.flow;\nflow.set('model',msg.req.body);\nmsg.url = 'localhost:1880/flow/'+ flowId;\nmsg.method = 'GET'\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 227.5,
        "y": 216,
        "wires": [
            [
                "427e1e12.c3613"
            ]
        ]
    },
    {
        "id": "c31e3542.3c7488",
        "type": "http in",
        "z": "9c54f072.c8618",
        "name": "",
        "url": "/push",
        "method": "post",
        "swaggerDoc": "",
        "x": 76.5,
        "y": 216,
        "wires": [
            [
                "d4df06ab.167a58"
            ]
        ]
    },
    {
        "id": "427e1e12.c3613",
        "type": "http request",
        "z": "9c54f072.c8618",
        "name": "",
        "method": "GET",
        "ret": "txt",
        "url": "",
        "tls": "",
        "x": 391.5,
        "y": 220,
        "wires": [
            [
                "f6aada93.e99368",
                "3bedb71c.1ba3c8"
            ]
        ]
    },
    {
        "id": "3bedb71c.1ba3c8",
        "type": "function",
        "z": "9c54f072.c8618",
        "name": "",
        "func": "var model = flow.get('model');\nmodel.flow = JSON.parse(msg.payload);\nmsg.payload = JSON.stringify(model);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 150.5,
        "y": 284,
        "wires": [
            [
                "f6aada93.e99368",
                "b1967306.ccb04"
            ]
        ]
    }
]