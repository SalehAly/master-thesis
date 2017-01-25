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

        // run node-red on rest and add flow
        RESTHandler.post(Constants.NODE_RED_REST, Constants.FLOW_TARGET, flow.toString());
    }

}
