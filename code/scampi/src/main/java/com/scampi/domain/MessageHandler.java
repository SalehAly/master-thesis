package com.scampi.domain;

import com.google.gson.*;
import com.scampi.constants.Constants;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;

/**
 * Created by Aly on 1/19/17.
 */
public class MessageHandler {

    public static void handleMessage(SCAMPIMessage message) {
        JsonObject jsonObject;
        // get the json object out of the Scmapi message
        if (message.hasString(Constants.JSON)) {
            String jsonMessage = message.getString(Constants.JSON);
            jsonObject = new JsonParser().parse(jsonMessage).getAsJsonObject();
        } else {
            return;
        }
        JsonArray flow = jsonObject.getAsJsonArray(Constants.FLOW);
/*
        // Get the flow from json object and write into a file
        try {
            FileWriter file = new FileWriter(constants.PATH + "flow.json");
            file.write(flow.toString());
            file.flush();
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
*/

/*
        // Run the command that adds the flow to node red
        CommandRunner.addFlow(flow.toString());
*/
        // run node-red on rest
        RESTHandler.post(Constants.NODE_RED_REST, Constants.FLOW_TARGET, flow.toString());
    }
    // For Testing
    public static void main(String[] args){

//        SCAMPIMessage message = SCAMPIMessage.builder().build();
//        JsonArray flow = new JsonParser().parse("[\n" +
//                "  {\n" +
//                "    \"id\": \"9ddb9925.0384d8\",\n" +
//                "    \"type\": \"tab\",\n" +
//                "    \"label\": \"Test Detect Face\"\n" +
//                "  },\n" +
//                "  {\n" +
//                "    \"id\": \"1d5bab2a.882ea5\",\n" +
//                "    \"type\": \"inject\",\n" +
//                "    \"z\": \"9ddb9925.0384d8\",\n" +
//                "    \"name\": \"\",\n" +
//                "    \"topic\": \"\",\n" +
//                "    \"payload\": \"\",\n" +
//                "    \"payloadType\": \"date\",\n" +
//                "    \"repeat\": \"60\",\n" +
//                "    \"crontab\": \"\",\n" +
//                "    \"once\": false,\n" +
//                "    \"x\": 141.25000762939453,\n" +
//                "    \"y\": 135.00000381469727,\n" +
//                "    \"wires\": [\n" +
//                "      [\n" +
//                "        \"91b099e7.989838\"\n" +
//                "      ]\n" +
//                "    ]\n" +
//                "  },\n" +
//                "  {\n" +
//                "    \"id\": \"2dec068f.dab03a\",\n" +
//                "    \"type\": \"debug\",\n" +
//                "    \"z\": \"9ddb9925.0384d8\",\n" +
//                "    \"name\": \"\",\n" +
//                "    \"active\": true,\n" +
//                "    \"console\": \"false\",\n" +
//                "    \"complete\": \"true\",\n" +
//                "    \"x\": 788.0000114440918,\n" +
//                "    \"y\": 133.00000190734863,\n" +
//                "    \"wires\": [\n" +
//                "      \n" +
//                "    ]\n" +
//                "  },\n" +
//                "  {\n" +
//                "    \"id\": \"3785ff4d.8ebc5\",\n" +
//                "    \"type\": \"camerapi-detect\",\n" +
//                "    \"z\": \"9ddb9925.0384d8\",\n" +
//                "    \"filemode\": \"0\",\n" +
//                "    \"filename\": \"\",\n" +
//                "    \"filedefpath\": \"0\",\n" +
//                "    \"filepath\": \"\",\n" +
//                "    \"fileformat\": \"jpeg\",\n" +
//                "    \"detect\": \"1\",\n" +
//                "    \"framesize\": \"1\",\n" +
//                "    \"extract\": \"1\",\n" +
//                "    \"name\": \"\",\n" +
//                "    \"x\": 610.375,\n" +
//                "    \"y\": 181.5,\n" +
//                "    \"wires\": [\n" +
//                "      [\n" +
//                "        \"2dec068f.dab03a\"\n" +
//                "      ]\n" +
//                "    ]\n" +
//                "  },\n" +
//                "  {\n" +
//                "    \"id\": \"91b099e7.989838\",\n" +
//                "    \"type\": \"camerapi-takephoto\",\n" +
//                "    \"z\": \"9ddb9925.0384d8\",\n" +
//                "    \"filemode\": \"0\",\n" +
//                "    \"filename\": \"\",\n" +
//                "    \"filedefpath\": \"1\",\n" +
//                "    \"filepath\": \"/home/pi/.node-red/images/\",\n" +
//                "    \"fileformat\": \"jpeg\",\n" +
//                "    \"resolution\": \"1\",\n" +
//                "    \"fliph\": \"0\",\n" +
//                "    \"flipv\": \"0\",\n" +
//                "    \"name\": \"\",\n" +
//                "    \"x\": 384.50000762939453,\n" +
//                "    \"y\": 132.50000381469727,\n" +
//                "    \"wires\": [\n" +
//                "      [\n" +
//                "        \"3785ff4d.8ebc5\",\n" +
//                "        \"2dec068f.dab03a\"\n" +
//                "      ]\n" +
//                "    ]\n" +
//                "  }\n" +
//                "]").getAsJsonArray();
//
//        json.add("flow",flow);
//        message.putString("json",json.toString());
//
//        handleMessage(message);
//
      System.out.println(CommandRunner.getFreeRam());

    }
}
