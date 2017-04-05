package com.scampi.api;

import com.scampi.constants.Constants;
import com.scampi.model.Payload;
import com.scampi.domain.RESTHandler;
import com.scampi.publish.Publisher;
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
public class ScampiApi {
Logger log = Logger.getLogger(ScampiApi.class);
    @RequestMapping(value = "/publish", method = RequestMethod.POST, produces="application/json", consumes="application/json")
    @ResponseBody
    String publish(@RequestBody Payload payload) {
        if (ScampiService.getAppLib().getLifecycleState() != AppLib.State.CONNECTED)
            return RESTHandler.getResponse(Constants.STATUS_FAIL,"Scampi not connected")
                    .toString();

        return Publisher.publish(payload.getTopic(), payload.getData().toString());
    }

    @RequestMapping(value = "/subscribe", method = RequestMethod.POST, produces="application/json", consumes="application/json")
    @ResponseBody
    String subscribe(@RequestParam(value="topic") String topic ) {
       if (ScampiService.getAppLib().getLifecycleState() != AppLib.State.CONNECTED)
          return RESTHandler.getResponse(Constants.STATUS_FAIL,"Scampi not connected")
                  .toString();

       try{
            ScampiService.getAppLib().subscribe(topic);
        }catch (InterruptedException e){
            log.fatal("Could not Subscribe", e);
            return  e.getMessage();
        }

        return RESTHandler.getResponse(Constants.STATUS_SUCCESS,"subsribed to "+ topic).toString();
    }

    public static void main(String[] args) throws Exception {
        ScampiService.init();
        SpringApplication.run(ScampiApi.class, args);
    }
}
