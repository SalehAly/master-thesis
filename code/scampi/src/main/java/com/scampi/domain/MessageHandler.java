package com.scampi.domain;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonParser;
import com.scampi.api.ScampiService;
import com.scampi.constants.Constants;
import com.scampi.model.Computation;
import com.scampi.model.Metadata;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;
import org.apache.log4j.Logger;


import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import java.util.List;

/**
 * Created by Aly on 1/19/17.
 */
public class MessageHandler {
    private static Logger log = Logger.getLogger(MessageHandler.class);
    private static TopicMapping topicMapping = TopicMapping.getInstance();
    private static Metadata machineSpec = ScampiService.getMachineSpec();


    public static void handleMessage(SCAMPIMessage message, String topic) {

        System.out.println(topic);
        if (topic.equals(Constants.TOPIC_MAIN)) {
            handleMainTopic(message);
        } else {
            handleSpecialTopic(message, topic);
        }
    }

    /**
     * @param message This method is for handling the main computation models coming from node-red of a different machine
     *                then posting the computation model to the node-red instance on this machine
     */
    public static void handleMainTopic(SCAMPIMessage message) {

        String jsonMessage;
        // get the json object out of the Scmapi message
        try {
            if (message.hasString(Constants.JSON)) {
                jsonMessage = message.getString(Constants.JSON);
                log.info(jsonMessage);
            } else {
                log.info("No computation Models included");
                return;
            }

            // Model the computation from json into java models
            Computation computation = new GsonBuilder().create().fromJson(jsonMessage, Computation.class);

            // Check if machine spec is a valid for the computation
            if (! computation.getMetadata().getPower().equals(machineSpec.getPower())
                    || ! computation.getMetadata().getRam().equals(machineSpec.getRam())) {
                log.info("Hardware requirements not satisfied");
                return;
            }
            // Check if sensors and actuators are there.
            if (computation.getMetadata().getResources().isCamera() && ! machineSpec.getResources().isCamera()
                || computation.getMetadata().getResources().isGasSensor() && ! machineSpec.getResources().isGasSensor()
                || computation.getMetadata().getResources().isTempSensor() && ! machineSpec.getResources().isTempSensor()) {

                log.info("Resource requirements not satisfied");
                return;
            }
            
            // Get the flow itself from the mode
            String flow = computation.getFlow().toString();


            for (String source : computation.getSources()) {
                Files.copy(message.getBinary(source), Paths.get(source), StandardCopyOption.REPLACE_EXISTING);
            }
            String inputDataTopic = null;
            if (computation.getIoSpec().getInput() != null && computation.getIoSpec().getInput().has("topic")) {
                inputDataTopic = computation.getIoSpec().getInput().get("topic").getAsString();
            }

            if (inputDataTopic != null) {
                log.info("Subscribing to " + inputDataTopic);
                ScampiService.getAppLib().subscribe(inputDataTopic);
                String id = computation.getFlow().get("id").getAsString();
                topicMapping.put(inputDataTopic, id) ;
            }



            // run node-red on rest and add flow
            RESTHandler.post(Constants.NODE_RED_REST, Constants.FLOW_TARGET, flow);
            log.info("Message Received");

        } catch (Exception e) {
            log.fatal("Message Failed", e);
        }
    }

    /**
     * @param message The method is for handling special computational models that need to send data via pub/sub messaging
     *                the method ensures composabilty even between flows on different machines
     *                It takes the the data received and send it via REST to the supposedly listening receiving flow
     */

    public static void handleSpecialTopic(SCAMPIMessage message, String topic) {


        List<String> endpoints = topicMapping.getEndpoints(topic);
        System.out.println(endpoints.toString());
        // send data to all endpoints subscribing to this topic
        for (String endpoint : endpoints) {
            RESTHandler.post(Constants.NODE_RED_REST, endpoint, new JsonParser().parse(
                    message.getString(Constants.JSON)).toString());
            log.info("Message Received");

        }


    }

}
