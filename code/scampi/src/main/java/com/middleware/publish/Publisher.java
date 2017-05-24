package com.middleware.publish;

import com.google.gson.GsonBuilder;
import com.middleware.api.SCAMPIApi;
import com.middleware.constants.Constants;
import com.middleware.domain.RESTHandler;
import com.middleware.domain.TopicMapping;
import com.middleware.model.Computation;
import com.middleware.model.PublishPayload;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;
import org.apache.log4j.Logger;

import java.io.File;
import java.util.UUID;

/**
 * Created by Aly on 1/23/17.
 */

public class Publisher {

    private static Logger log = Logger.getLogger(Publisher.class);
    private static TopicMapping topicMapping = TopicMapping.getInstance();

    public static String publish(PublishPayload payload) {
        try {
            if (payload.getTopic() == null) {
                publishMainTopic(payload.getData());
            } else {
                publishSpecialTopic(payload);
            }
        } catch (Exception e) {

            log.error(e.getMessage(), e);
            return RESTHandler.getResponse(
                    Constants.STATUS_FAIL
                    , e.getMessage())
                    .toString();
        }


        return RESTHandler.getResponse(Constants.STATUS_SUCCESS, "Message Published")
                .toString();
    }

    public static void publishMainTopic(String data) throws Exception {


        // build a new message
        SCAMPIMessage message = SCAMPIMessage.builder().build();

        // Generate a Unique id and put in the message
        message.putString(Constants.UNIQUE_GLOABL_ID, UUID.randomUUID().toString());

        log.info("Publishing to Main Topic "  + message.getString(Constants.UNIQUE_GLOABL_ID));

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
               message.putBinary(source, new File(Constants.HOME_DIR + "/" + Constants.NODE_RED_DIR + "/" + source))   ;
            }
        }
        message.putString(Constants.PUBLISHER_ID, SCAMPIApi.getAppLib().getLocalID());
        message.putString(Constants.JSON, data);
        SCAMPIApi.publish(message, Constants.TOPIC_MAIN);
        log.info("Message Published " + message.getString(Constants.UNIQUE_GLOABL_ID));

    }


    public static void publishSpecialTopic(PublishPayload payload) throws Exception {

        // build a new message
        SCAMPIMessage message = SCAMPIMessage.builder().build();

        // Generate a Unique id and put in the message
        message.putString(Constants.UNIQUE_GLOABL_ID, UUID.randomUUID().toString());

        log.info("Publishing to SPECIAL Topic:" + payload.getTopic() + " "
                + message.getString(Constants.UNIQUE_GLOABL_ID));

        if (payload.getFile() != null) {
            log.info("Attaching file " + payload.getFile());
            File file = new File(payload.getFile());
            message.putBinary(Constants.FILE, file);
            message.putString(Constants.PATH, file.getName());
        }

        if (payload.isLocalOutputResponse())
            topicMapping.put(SCAMPIApi.getAppLib().getLocalID(), payload.getEndpoint());

        message.putString(Constants.PUBLISHER_ID, SCAMPIApi.getAppLib().getLocalID());
        message.putString(Constants.DATA, payload.getData());
        message.putString(Constants.LOCAL_OUTPUT, String.valueOf(payload.isLocalOutputResponse()));
        SCAMPIApi.publish(message, payload.getTopic());

        log.info("Message Published " + message.getString(Constants.UNIQUE_GLOABL_ID));
    }

}
