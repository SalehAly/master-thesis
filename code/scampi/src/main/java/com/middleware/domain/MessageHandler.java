package com.middleware.domain;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.middleware.api.SCAMPIApi;
import com.middleware.constants.Constants;
import com.middleware.model.Computation;
import com.middleware.model.Metadata;
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
    private static Metadata machineSpec = SCAMPIApi.getMachineSpec();

    /**
     *
     * @param message
     * @param topic
     */
    public static void handleMessage(SCAMPIMessage message, String topic) {


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
            } else {
                log.info("No computation Models included");
                return;
            }

            // Model the computation from json into java models
            Computation computation = new GsonBuilder().create().fromJson(jsonMessage, Computation.class);

            // Check if machine spec is a valid for the computation
            if (! computation.getMetadata().getPower().equals(machineSpec.getPower())
                    || ! computation.getMetadata().getRam().equals(machineSpec.getRam())) {
                log.info( "Hardware requirements not satisfied in " + message.getString(Constants.UNIQUE_GLOABL_ID));
                return;
            }
            // Check if sensors and actuators are there.
            if (computation.getMetadata().getResources().isCamera() && ! machineSpec.getResources().isCamera()
                || computation.getMetadata().getResources().isGasSensor() && ! machineSpec.getResources().isGasSensor()
                || computation.getMetadata().getResources().isTempSensor() && ! machineSpec.getResources().isTempSensor()) {

                log.info("Resource requirements not satisfied in "+ message.getString(Constants.UNIQUE_GLOABL_ID));
                return;
            }
            
            // Get the flow itself from the mode
            String flow = computation.getFlow().toString();


            for (String source : computation.getSources()) {
                Files.copy(message.getBinary(source), Paths.get(source), StandardCopyOption.REPLACE_EXISTING);
            }

//            String inputDataTopic = null;
//            if (computation.getIoSpec().getInput() != null && computation.getIoSpec().getInput().has("topic")) {
//                inputDataTopic = computation.getIoSpec().getInput().get("topic").getAsString();
//            }


//            if (inputDataTopic != null) {
//                log.info("Subscribing to " + inputDataTopic);
//                SCAMPIApi.getAppLib().subscribe(inputDataTopic);
//                String id = computation.getFlow().get("id").getAsString();
//                topicMapping.put(inputDataTopic, id) ;
//            }



            // run node-red on rest and add flow
            RESTHandler.post(Constants.NODE_RED_REST, Constants.FLOW_TARGET, flow,
                    message.getString(Constants.UNIQUE_GLOABL_ID));
            log.info("Message Received " + message.getString(Constants.UNIQUE_GLOABL_ID));

        } catch (Exception e) {
            log.fatal("Message Failed " + message.getString(Constants.UNIQUE_GLOABL_ID), e);
        }
    }

    /**
     * @param message The method is for handling special computational models that need to send data via pub/sub messaging
     *                the method ensures composabilty even between flows on different machines
     *                It takes the the data received and send it via REST to the supposedly listening receiving flow
     */

    public static void handleSpecialTopic(SCAMPIMessage message, String topic) {

        // Get the endpoints subscribing to this topic
        List<String> endpoints = topicMapping.getEndpoints(topic);

        // Check if message should be sent to a specific node on its global unique id
        boolean localOutput = false;
        try {
            localOutput = Boolean.valueOf(message.getString(Constants.LOCAL_OUTPUT));
        } catch (Exception e ){
            e.printStackTrace();
            log.info("Message does not have local output");
        }

        // Send data to all endpoints subscribing to this topic
        for (String endpoint : endpoints) {
            JsonObject body = new JsonObject();
            body.addProperty(Constants.PUBLISHER_ID, message.getString(Constants.PUBLISHER_ID));
            body.addProperty(Constants.DATA, message.getString(Constants.DATA));
            if(localOutput)
                body.addProperty(Constants.ENDPOINT, message.getString(Constants.PUBLISHER_ID));
            else
                body.addProperty(Constants.ENDPOINT, endpoint);

            try {
                String filePath = message.getString(Constants.PATH);
                body.addProperty(Constants.PATH, filePath);
                Files.copy(message.getBinary(Constants.FILE)
                        , Paths.get(Constants.HOME_DIR + "/" + Constants.NODE_RED_DIR + "/" + filePath)
                        , StandardCopyOption.REPLACE_EXISTING);

                log.info(Constants.HOME_DIR + "/" + Constants.NODE_RED_DIR + "/" + filePath);
            } catch (Exception e) {
                log.info("No File attached");
            }

         /**
          Code to transfer an image to bytes and send it as a string in response body

            InputStream binary = message.getBinary(Constants.FILE);
            if (binary != null) {
                int ch;
                StringBuilder sb = new StringBuilder();
                try {
                    while((ch = binary.read()) != -1)
                        sb.append((char)ch);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                body.addProperty(Constants.FILE, sb.toString());
            }
          */

            RESTHandler.post(Constants.NODE_RED_REST, endpoint, body.toString(), message.getString(Constants.UNIQUE_GLOABL_ID));
            log.info("Message Received " + message.getString(Constants.UNIQUE_GLOABL_ID));

        }


    }

}
