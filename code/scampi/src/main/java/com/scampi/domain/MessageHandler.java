package com.scampi.domain;

import com.google.gson.*;
import com.scampi.constants.Constants;
import com.scampi.model.Computation;
import com.sun.jersey.core.util.Base64;
import fi.tkk.netlab.dtn.scampi.applib.AppLib;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Created by Aly on 1/19/17.
 */
public class MessageHandler {


    public static void handleMessage(SCAMPIMessage message, String topic, AppLib appLib){

        System.out.println(topic);
        if(topic.equals(Constants.TOPIC_MAIN)){
            handleMainTopic(message, appLib);
        }else{
            handleSpecialTopic(message, topic);
        }
    }

    /**
     * @param message
     * This method is for handling the main computation models coming from node-red of a different machine
     * then posting the computation model to the node-red instance on this machine
     */
    public static void handleMainTopic(SCAMPIMessage message, AppLib applib) {

        String jsonMessage;
        // get the json object out of the Scmapi message
        try {
            if (message.hasString(Constants.JSON)) {
                jsonMessage = message.getString(Constants.JSON);
                System.out.println(jsonMessage);
            } else {
                System.out.println("No computation Models included");
                return;
            }

           // Model the computation from json into java models
            Computation computation = new GsonBuilder().create().fromJson(jsonMessage,Computation.class);

            // Get the flow itself from the mode
            String flow = computation.getFlow().toString();

            for (String source: computation.getSources()) {
                Files.copy(message.getBinary(source), Paths.get(source));
            }

            String inputDataTopic = null;
            if(computation.getIoSpec().getInput()!= null && computation.getIoSpec().getInput().has("topic")){
                 inputDataTopic = computation.getIoSpec().getInput().get("topic").getAsString();
            }

            if(inputDataTopic != null){
                System.out.println("Subscribing to " + inputDataTopic );
                applib.subscribe(inputDataTopic);
            }


            // run node-red on rest and add flow
            RESTHandler.post(Constants.NODE_RED_REST, Constants.FLOW_TARGET, flow);


            System.out.println("Message Received");

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Message Failed");
        }

    }

    /**
     * @param message
     * The method is for handling special computational models that need to send data via pub/sub messaging
     * the method ensures composabilty even between flows on different machines
     * It takes the the data received and send it via REST to the supposedly listening receiving flow
     */

    public static void handleSpecialTopic(SCAMPIMessage message, String topic){

            // run node-red on rest and add flow
            RESTHandler.post(Constants.NODE_RED_REST, topic, new JsonParser().parse(message.getString(Constants.JSON)).toString());
            System.out.println("Message Received");


    }

}
