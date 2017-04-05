package com.scampi.publish;

import com.google.gson.GsonBuilder;
import com.scampi.api.ScampiService;
import com.scampi.constants.Constants;
import com.scampi.domain.RESTHandler;
import com.scampi.model.Computation;
import com.sun.jersey.core.util.Base64;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;
import org.apache.log4j.Logger;

import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Created by Aly on 1/23/17.
 */

public class Publisher {

    private static Logger log = Logger.getLogger(Publisher.class);

    public static String publish(String topic, String data) {
        try {
            if (topic == null) {
                publishMainTopic(data);
            } else {
                publishSpecialTopic(topic, data);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return RESTHandler.getResponse(
                    Constants.STATUS_FAIL
                    , e.getMessage())
                    .toString();
        }

        return RESTHandler.getResponse(Constants.STATUS_SUCCESS, "Message Published")
                .toString();
    }

    public static void publishMainTopic(String data) throws Exception {

        log.info("Publishing to Main Topic");
        // build a new message
        SCAMPIMessage message = SCAMPIMessage.builder().build();

        // Model the computation from json into java models
        Computation computation = new GsonBuilder().create().fromJson(data, Computation.class);

        try {
            computation.getFlow().toString();
        } catch (NullPointerException e) {
            throw new RuntimeException("No Computation flow found");
        }
        // get source files
        if (computation.getSources() != null) {
            for (String source : computation.getSources()) {
                System.out.println(Constants.HOME_DIR + "/" + Constants.NODE_RED_DIR + "/" + source);
                byte[] file = Files.readAllBytes(Paths.get(Constants.HOME_DIR + "/" + Constants.NODE_RED_DIR + "/" + source));
                //include files
                message.putBinary(source, Base64.encode(file));
            }
        }
        message.putString(Constants.JSON, data);
        ScampiService.publish(message, Constants.TOPIC_MAIN);

    }


    public static void publishSpecialTopic(String topic, String data) throws Exception {

        // build a new message
        log.info("Publishing to SPECIAL Topic:" + topic);
        SCAMPIMessage message = SCAMPIMessage.builder().build();
        message.putString(Constants.JSON, data);
        ScampiService.publish(message, topic);
        log.info("Special Data Topic " + topic);
    }

}
