package com.scampi.publish;

import com.google.gson.GsonBuilder;
import com.scampi.api.ScampiService;
import com.scampi.constants.Constants;
import com.scampi.domain.RESTHandler;
import com.scampi.model.Computation;
import com.scampi.model.Payload;
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

    public static String publish(Payload payload) {
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
                log.info(Constants.HOME_DIR + "/" + Constants.NODE_RED_DIR + "/" + source);
                byte[] file = Files.readAllBytes(Paths.get(Constants.HOME_DIR + "/" + Constants.NODE_RED_DIR + "/" + source));
                //include files
                message.putBinary(source, Base64.encode(file));
            }
        }
        message.putString(Constants.JSON, data);
        ScampiService.publish(message, Constants.TOPIC_MAIN);

    }


    public static void publishSpecialTopic(Payload payload) throws Exception {

        // build a new message
        log.info("Publishing to SPECIAL Topic:" + payload.getTopic());
        SCAMPIMessage message = SCAMPIMessage.builder().build();
        if (payload.getFile() != null){
            byte[] file = Files.readAllBytes(Paths.get(payload.getFile()));
            message.putBinary(Constants.FILE, Base64.encode(file));
        }
        message.putString(Constants.DATA, payload.getData());
        ScampiService.publish(message, payload.getTopic());
        log.info("Special Data Topic " + payload.getTopic());
    }

}
