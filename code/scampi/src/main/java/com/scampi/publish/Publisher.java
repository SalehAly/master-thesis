package com.scampi.publish;

import com.google.gson.GsonBuilder;
import com.scampi.api.ScampiService;
import com.scampi.constants.Constants;
import com.scampi.domain.RESTHandler;
import com.scampi.domain.TopicMapping;
import com.scampi.model.Computation;
import com.scampi.model.PublishPayload;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;
import org.apache.log4j.Logger;

import java.io.File;

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

        log.info("Message Published");
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
               message.putBinary(source, new File(Constants.HOME_DIR + "/" + Constants.NODE_RED_DIR + "/" + source))   ;
            }
        }
        message.putString(Constants.PUBLISHER_ID, ScampiService.getAppLib().getLocalID());
        message.putString(Constants.JSON, data);
        ScampiService.publish(message, Constants.TOPIC_MAIN);

    }


    public static void publishSpecialTopic(PublishPayload payload) throws Exception {

        // build a new message
        log.info("Publishing to SPECIAL Topic:" + payload.getTopic());
        SCAMPIMessage message = SCAMPIMessage.builder().build();
        if (payload.getFile() != null) {
            log.info("Attaching file " + payload.getFile());
            File file = new File(payload.getFile());
            message.putBinary(Constants.FILE, file);
            message.putString(Constants.PATH, file.getName());
        }

        if (payload.isLocalOutputResponse())
            topicMapping.put(ScampiService.getAppLib().getLocalID(), payload.getEndpoint());

        message.putString(Constants.PUBLISHER_ID, ScampiService.getAppLib().getLocalID());
        message.putString(Constants.DATA, payload.getData());
        ScampiService.publish(message, payload.getTopic());
        log.info("Special Data Topic " + payload.getTopic());
    }

}
