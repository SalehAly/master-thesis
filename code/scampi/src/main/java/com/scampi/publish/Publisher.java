package com.scampi.publish;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.scampi.api.ScampiHelloWorld;
import com.scampi.constants.Constants;
import com.scampi.domain.RESTHandler;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;

import java.util.Arrays;

/**
 * Created by Aly on 1/23/17.
 */
public class Publisher {

    public static void main(String[] args) {
        String flow = null;

        try {
            flow = args[0];
        } catch (Exception e) {
            System.out.println(RESTHandler.getResponse(
                    Constants.STATUS_FAIL
                    ,"Please include a flow", e.getCause().toString())
                    .toString());
            System.exit(1);
        }

        try {
            ScampiHelloWorld.init();
            SCAMPIMessage message = SCAMPIMessage.builder().build();
            System.out.println(flow);

            JsonObject json = new JsonParser().parse(flow).getAsJsonObject();
            message.putString(Constants.JSON, json.toString());
            ScampiHelloWorld.publish(message);

        } catch (Exception e) {
            System.out.println(RESTHandler.getResponse(
                    Constants.STATUS_FAIL
                    ,"Error publishing the message", e.getCause().toString())
                    .toString());
            System.exit(1);
        }

        System.out.println(RESTHandler.getResponse(
                Constants.STATUS_SUCCESS, "Message Published"));
        System.exit(0);

    }


}
