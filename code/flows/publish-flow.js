[
    {
        "id": "53893fdc.99f69",
        "type": "tab",
        "label": "publisher"
    },
    {
        "id": "3c694335.2e84cc",
        "type": "template",
        "z": "53893fdc.99f69",
        "name": "",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "<!DOCTYPE html>\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/html\">\n<head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>Publisher</title>\n\n    <!-- Latest compiled and minified CSS -->\n    <link rel=\"stylesheet\" href=\"bootstrap.min.css\"\n          integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">\n\n    <!-- Optional theme -->\n    <link rel=\"stylesheet\" href=\"bootstrap-theme.min.css\"\n          integrity=\"sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp\" crossorigin=\"anonymous\">\n\n    <!-- Latest compiled and minified JavaScript -->\n    <script src=\"jquery.min.js\">\n    </script>\n    <script src=\"bootstrap.min.js\"\n            integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\"\n            crossorigin=\"anonymous\"\n            async=\"true\">\n    </script>\n\n</head>\n<body>\n<div class=\"container\">\n\n\n    <form id=\"push\" action=\"localhost:1880/push\" method=\"post\" novalidate>\n        <div class=\"row\">\n\n            <div class=\"col-md-6\">\n                <h4>Computation Meta-data</h4>\n                <div class=\"well form-horizontal\">\n                        <div class=\"form-group\">\n                            <!--<p class=\"lead\"> The amount of computation power needed to execute the flow</p>-->\n                            <label for=\"power\" class=\"col-sm-2 control-label\">Computation Power</label>\n                            <div class=\"col-sm-6\">\n                                <select required=\"required\" id=\"power\" class=\"form-control input-sm\">\n                                    <option value=\"low\">Low</option>\n                                    <option value=\"medium\">Medium</option>\n                                    <option value=\"high\">High</option>\n                                </select>\n                            </div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <!--<p class=\"lead\"> The amount of free ram needed to execute the flow</p>-->\n                            <label for=\"ram\" class=\"col-sm-2 control-label\">Free ram</label>\n                            <div class=\"col-sm-6\">\n                                <select required=\"required\" id=\"ram\" class=\"form-control input-sm\">\n                                    <option value=\"low\"><500 MB</option>\n                                    <option value=\"medium\">500~1000 MB</option>\n                                    <option value=\"high\">>1000 MB</option>\n                                </select>\n                            </div>\n                        <!--</div>-->\n                    </div>\n                </div>\n\n\n            </div>\n\n            <div class=\"col-md-6\">\n                <h4>Resource Requirements</h4>\n                <div class=\"well\">\n                    <div class=\"checkbox\"><label> <input id=\"camera\" type=\"checkbox\">\n                        Camera </label></div>\n                    <div class=\"checkbox\"><label> <input id=\"temp\" type=\"checkbox\">\n                        Temperature Sensor</label></div>\n                    <div class=\"checkbox\"><label> <input id=\"gas\" type=\"checkbox\">\n                        Gas Sensor </label></div>\n                </div>\n            </div>\n        </div>\n\n\n        <h3>Flow </h3>\n\n\n        <div class=\"well\">\n            <div class=\"row form-horizontal\">\n\n                <div class=\"col-md-6\">\n\n\n\n                    <div class=\"form-group\">\n                        <label for=\"flow\" class=\"col-sm-3 control-label\">Flow Id</label>\n                        <div class=\"col-sm-6\">\n                            <input type=\"text\" required=\"required\" id=\"flow\" class=\"form-control input-sm\">\n                        </div>\n                      </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"input\" class=\"col-sm-3 control-label\">Data Input</label>\n                        <div class=\"col-sm-6\">\n                            <select required=\"required\" id=\"input\" class=\"form-control input-sm\">\n                                <option value=\"none\">None</option>\n                                <option value=\"scampi\">SCAMPI</option>\n                            </select>\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\" id=\"scampi-input\" style=\"display: none\">\n                        <label for=\"input\" class=\"col-sm-3 control-label\">SCAMPI Input Topic</label>\n                        <div class=\"col-sm-6\">\n                            <input  type=\"text\" required=\"required\" id=\"input-topic\" class=\"form-control input-sm\">\n                        </div>\n                    </div>\n\n                </div>\n\n\n\n                <div class=\"col-md-6\" >\n                    <div  class=\"form-group\">\n                        <label>File Dependency</label>\n                        <input id= \"files\" type=\"file\" name=\"file\" multiple >\n                        <p class=\"help-block\">Add data files or scripts from node-red directory</p>\n                    </div>\n\n\n\n                </div>\n\n\n            </div>\n            </div>\n\n        <!-- /#page-wrapper -->\n        <div id= \"success\" style=\"display: none;\" class=\"alert alert-success\" role=\"alert\">...</div>\n        <div id= \"fail\" style=\"display: none;\"class=\"alert alert-danger\" role=\"alert\">...</div>\n\n        <div class=\"form-group well\">\n            <label for=\"submit\" class=\"col-sm-2 control-label\">Push flow to network</label>\n            <button id=\"submit\" type=\"submit\" class=\"btn btn-success\">PUSH</button>\n        </div>\n    </form>\n\n\n</div>\n\n<!-- /#wrapper -->\n\n\n</body>\n<script>\n    $(document).ready(function () {\n\n\n        $( \"#input\" ).change(function() {\n            var value = $(\"#input\").val();\n            if(value === \"scampi\"){\n                $(\"#scampi-input\").show();\n          //      $(\"#database-input\").hide();\n           // }else if(value === \"datastore\") {\n            //    $(\"#scampi-input\").hide();\n             //   $(\"#database-input\").show();\n            }else{\n                $(\"#scampi-input\").hide();\n               // $(\"#database-input\").hide();\n            }\n        });\n//        $( \"#output\" ).change(function() {\n//            var value = $(\"#output\").val();\n//            if(value === \"scampi\"){\n//                $(\"#scampi-output\").show();\n//                $(\"#database-output\").hide();\n//            }else if(value === \"datastore\") {\n//                $(\"#scampi-output\").hide();\n//                $(\"#database-output\").show();\n//            }else{\n//                $(\"#scampi-output\").hide();\n//                $(\"#database-output\").hide();\n//            }\n//        });\n\n//        $(':file').change(function(e){\n//            for(var i =0; i<e.target.files.length;i++){\n//                var fileName = e.target.files[i].name;\n//                alert('The file \"' + fileName +  '\" has been selected.');\n//            }\n//        });\n\n        $(\"#push\").submit(function (event) {\n\n            var files = $('#files').prop(\"files\");\n            var names = $.map(files, function(val) { return val.name; });\n\n            var resources = {\n                camera: $('#camera').is(':checked'),\n                gasSensor: $('#gas').is(':checked'),\n                tempSensor: $('#temp').is(':checked')\n            };\n\n            var metadata = {\n                power: $('#power').val(),\n                ram: $('#ram').val(),\n                resources: resources\n            };\n\n            var input, output;\n            var ioSpec = {};\n\n            if($(\"#input\").val() != \"none\"){\n                 input = {\n                    'topic': $('#input-topic').val(),\n                    'table': $('#input-table').val()\n                };\n                ioSpec['input'] = input;\n            }\n            if($(\"#output\").val() != \"none\"){\n                output = {\n                    'topic': $('#output-topic').val(),\n                    'table': $('#output-table').val()\n                };\n                ioSpec['output'] = output;\n            }\n\n            var json = {\n                'metadata': metadata,\n                flow: $('#flow').val(),\n                'ioSpec': ioSpec,\n                sources: names\n            };\n\n\n            $.ajax({\n                type: \"POST\",\n                url: 'http://localhost:1880/push',\n                //processData: false,\n                data: JSON.stringify(json),\n                contentType: \"application/json\",\n                success: function (data) {\n                    //success message mybe...\n                    if(data.status == \"success\"){\n                        $(\"#fail\").hide();\n                        $(\"#success\").show();\n                    }else{\n                        $(\"#success\").hide();\n                        $(\"#fail\").show();\n                    }\n\n                }\n\n            })\n        });\n\n\n    });\n</script>\n</html>1",
        "x": 228,
        "y": 79.00000381469727,
        "wires": [
            [
                "e879d209.96c99"
            ]
        ]
    },
    {
        "id": "e879d209.96c99",
        "type": "http response",
        "z": "53893fdc.99f69",
        "name": "",
        "x": 372.5,
        "y": 74,
        "wires": []
    },
    {
        "id": "a509cbd.16aa438",
        "type": "http in",
        "z": "53893fdc.99f69",
        "name": "",
        "url": "/publish",
        "method": "get",
        "swaggerDoc": "",
        "x": 85,
        "y": 79,
        "wires": [
            [
                "3c694335.2e84cc"
            ]
        ]
    },
    {
        "id": "c8aa66ce.cf0eb8",
        "type": "http response",
        "z": "53893fdc.99f69",
        "name": "",
        "x": 534.3333549499512,
        "y": 405.77777671813965,
        "wires": []
    },
    {
        "id": "95ab1b76.837a88",
        "type": "debug",
        "z": "53893fdc.99f69",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 519.4444541931152,
        "y": 331.1111173629761,
        "wires": []
    },
    {
        "id": "ca28fa02.a778d8",
        "type": "function",
        "z": "53893fdc.99f69",
        "name": "",
        "func": "var flowId = msg.req.body.flow;\nflow.set('model',msg.req.body);\nmsg.url = 'localhost:1880/flow/'+ flowId;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 227.5,
        "y": 216,
        "wires": [
            [
                "d7988d1b.45602"
            ]
        ]
    },
    {
        "id": "35bf9603.63b17a",
        "type": "http in",
        "z": "53893fdc.99f69",
        "name": "",
        "url": "/push",
        "method": "post",
        "swaggerDoc": "",
        "x": 76.5,
        "y": 216,
        "wires": [
            [
                "ca28fa02.a778d8"
            ]
        ]
    },
    {
        "id": "d7988d1b.45602",
        "type": "http request",
        "z": "53893fdc.99f69",
        "name": "",
        "method": "GET",
        "ret": "txt",
        "url": "",
        "tls": "",
        "x": 391.5,
        "y": 220,
        "wires": [
            [
                "262d3ad0.da8d36"
            ]
        ]
    },
    {
        "id": "262d3ad0.da8d36",
        "type": "function",
        "z": "53893fdc.99f69",
        "name": "",
        "func": "// var model = JSON.stringify(flow.get('model'));\n// model.flow = JSON.stringify(msg.payload);\n// model = model;\n// var payload = { data : model };\n// msg.payload = JSON.stringify(payload);\n\nvar model = flow.get('model');\nmodel.flow = JSON.parse(msg.payload);\n\n\nmsg.payload = JSON.stringify(\n    {\n        'data' : JSON.stringify(model)\n    });\nmsg.headers = {'Content-Type' : 'application/json'} ;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 147.1666717529297,
        "y": 316.2222194671631,
        "wires": [
            [
                "fc7dcb6c.d56538",
                "95ab1b76.837a88"
            ]
        ]
    },
    {
        "id": "fc7dcb6c.d56538",
        "type": "http request",
        "z": "53893fdc.99f69",
        "name": "",
        "method": "POST",
        "ret": "txt",
        "url": "localhost:8080/publish",
        "tls": "",
        "x": 317.7777862548828,
        "y": 394.4444160461426,
        "wires": [
            [
                "c8aa66ce.cf0eb8",
                "95ab1b76.837a88"
            ]
        ]
    }
]
