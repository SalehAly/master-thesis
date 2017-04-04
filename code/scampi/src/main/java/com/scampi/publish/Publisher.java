package com.scampi.publish;

import com.google.gson.GsonBuilder;
import com.scampi.api.ScampiService;
import com.scampi.constants.Constants;
import com.scampi.domain.RESTHandler;
import com.scampi.model.Computation;
import com.sun.jersey.core.util.Base64;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;

import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Created by Aly on 1/23/17.
 */

public class Publisher {


    public static String publish(String topic, String data) {
        try {
            if (topic == null) {
                publishMainTopic(data);
            } else {
                publishSpecialTopic(topic, data);
            }
        } catch (Exception e) {
            return RESTHandler.getResponse(
                    Constants.STATUS_FAIL
                    , "Error publishing the message", e.getCause().toString())
                    .toString();
        }

        return RESTHandler.getResponse(Constants.STATUS_SUCCESS, "Message Published")
                .toString();
    }

    public static void publishMainTopic(String data) throws Exception {

        System.out.println("Publishing to Main Topic");
        // build a new message
        SCAMPIMessage message = SCAMPIMessage.builder().build();

        // Model the computation from json into java models
        Computation computation = new GsonBuilder().create().fromJson(data, Computation.class);

        // get source files
        for (String source : computation.getSources()) {
            System.out.println(Constants.HOME_DIR + "/" + Constants.NODE_RED_DIR + "/" + source);
            byte[] file = Files.readAllBytes(Paths.get(Constants.HOME_DIR + "/" + Constants.NODE_RED_DIR + "/" + source));
            //include files
            message.putBinary(source, Base64.encode(file));
        }

        message.putString(Constants.JSON, data);
        ScampiService.publish(message, Constants.TOPIC_MAIN);

    }


    public static void publishSpecialTopic(String topic, String data) throws Exception {

        // build a new message
        System.out.println("Publishing to SPECIAL Topic:" + topic);
        SCAMPIMessage message = SCAMPIMessage.builder().build();
        message.putString(Constants.JSON, data);
        ScampiService.publish(message, topic);
        System.out.println("Special Data Topic " + topic);
    }

}
