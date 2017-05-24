package com.middleware.api;

import com.middleware.constants.Constants;
import com.middleware.domain.TopicMapping;
import com.middleware.model.PublishPayload;
import com.middleware.domain.RESTHandler;
import com.middleware.model.SubscribePayload;
import com.middleware.publish.Publisher;
import fi.tkk.netlab.dtn.scampi.applib.AppLib;
import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

/**
 * Created by aly on 04.04.17.
 */
@RestController
@SpringBootApplication
public class MiddlewareApi {
    private static Logger log = Logger.getLogger(MiddlewareApi.class);
    private static TopicMapping topicMapping = TopicMapping.getInstance();

    @RequestMapping(value = "/publish", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
    @ResponseBody
    String publish(@RequestBody PublishPayload payload) {
        if (SCAMPIApi.getAppLib().getLifecycleState() != AppLib.State.CONNECTED)
            return RESTHandler.getResponse(Constants.STATUS_FAIL, "Scampi not connected")
                    .toString();

        return Publisher.publish(payload);
    }

    @RequestMapping(value = "/subscribe", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
    @ResponseBody
    String subscribe(@RequestBody SubscribePayload payload) {
        if (SCAMPIApi.getAppLib().getLifecycleState() != AppLib.State.CONNECTED)
            return RESTHandler.getResponse(Constants.STATUS_FAIL, "Scampi not connected")
                    .toString();

        try {
            topicMapping.put(payload.getTopic(), payload.getData());
            SCAMPIApi.getAppLib().subscribe(payload.getTopic());
        } catch (InterruptedException e) {
            log.fatal("Could not Subscribe", e);
            return e.getMessage();
        }
        log.info("subscribed to " + payload.getTopic());
        return RESTHandler.getResponse(Constants.STATUS_SUCCESS, "subsribed to " + payload.getTopic()).toString();
    }

    public static void main(String[] args) throws Exception {
        SCAMPIApi.init();
        SpringApplication.run(MiddlewareApi.class, args);
    }
}
