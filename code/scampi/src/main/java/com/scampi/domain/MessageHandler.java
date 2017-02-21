package com.scampi.domain;

import com.google.gson.*;
import com.scampi.constants.Constants;
import com.scampi.model.Computation;
import com.sun.jersey.core.util.Base64;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;

/**
 * Created by Aly on 1/19/17.
 */
public class MessageHandler {

    public static void handleMessage(SCAMPIMessage message) {
        JsonObject jsonObject;
        String jsonMessage;
        // get the json object out of the Scmapi message
        try {

            if (message.hasString(Constants.JSON)) {
                 jsonMessage = message.getString(Constants.JSON);
                System.out.println(jsonMessage);
                jsonObject = new JsonParser().parse(jsonMessage).getAsJsonObject();
            } else {
                return;
            }

            String flow = jsonObject.get(Constants.FLOW).toString();

           // JsonArray flowArray = new JsonParser().parse(flow).getAsJsonArray();
            Computation computation = new GsonBuilder().create().fromJson(jsonMessage,Computation.class);
            // run node-red on rest and add flow
            System.out.println(computation.toString());
            RESTHandler.post(Constants.NODE_RED_REST, Constants.FLOW_TARGET, computation.getFlow().toString());

            System.out.println("Message Received");

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Message Failed");
        }

    }

}
