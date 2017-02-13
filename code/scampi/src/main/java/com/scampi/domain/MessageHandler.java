package com.scampi.domain;

import com.google.gson.*;
import com.scampi.constants.Constants;
import com.sun.jersey.core.util.Base64;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;

/**
 * Created by Aly on 1/19/17.
 */
public class MessageHandler {

    public static void handleMessage(SCAMPIMessage message) {
        JsonObject jsonObject;
        // get the json object out of the Scmapi message
        try {

            if (message.hasString(Constants.JSON)) {
                String jsonMessage = message.getString(Constants.JSON);
                jsonObject = new JsonParser().parse(jsonMessage).getAsJsonObject();
            } else {
                return;
            }
            System.out.println("flow = "+jsonObject.get(Constants.FLOW).getAsString());
            String flow = new String(Base64.decode(jsonObject.get(Constants.FLOW).getAsString()));
            System.out.println("flow = "+flow);
            JsonArray flowArray = new JsonParser().parse(flow).getAsJsonArray();

            // run node-red on rest and add flow

            RESTHandler.post(Constants.NODE_RED_REST, Constants.FLOW_TARGET, flowArray.toString());

            System.out.println("Message Received");

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Message Failed");
        }

    }

}
