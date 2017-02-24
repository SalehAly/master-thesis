package com.scampi.publish;

import com.google.gson.GsonBuilder;
import com.scampi.api.ScampiHelloWorld;
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

    public static void main(String[] args) {
        String data = null;
        String topic = null;
        try {
            data = args[0];
            if(args.length > 1){
                topic = args[1];
            }

        } catch (Exception e) {
            System.out.println(RESTHandler.getResponse(
                    Constants.STATUS_FAIL
                    ,"Please include a flow", e.getCause().toString())
                    .toString());

                System.exit(1);
        }



        // init SCAMPI
        ScampiHelloWorld.init();

        if(topic == null){
            publishMainTopic(data);
        }else{
            publishSpecialTopic(topic, data);
        }

        System.out.println(RESTHandler.getResponse(
                Constants.STATUS_SUCCESS, "Message Published"));
        System.exit(0);
    }

    public static void publishMainTopic(String data){

        try {
            System.out.println("Publishing to Main Topic");
            // build a new message
            SCAMPIMessage message = SCAMPIMessage.builder().build();


            // Model the computation from json into java models
            Computation computation = new GsonBuilder().create().fromJson(data,Computation.class);

            // get source files
            for (String source: computation.getSources()) {
                System.out.println(Constants.HOME_DIR +"/"+ Constants.NODE_RED_DIR+"/"+source);
                byte[] file =  Files.readAllBytes(Paths.get(Constants.HOME_DIR +"/"+ Constants.NODE_RED_DIR+"/"+source)) ;
                //include files
                message.putBinary(source, Base64.encode(file));
            }

            message.putString(Constants.JSON,data);
            ScampiHelloWorld.publish(message, Constants.TOPIC_MAIN );


        } catch (Exception e) {
            System.out.println(RESTHandler.getResponse(
                    Constants.STATUS_FAIL
                    ,"Error publishing the message", e.getCause().toString())
                    .toString());
            System.exit(1);
        }


    }


    public static void publishSpecialTopic(String topic, String data){

        // build a new message
        System.out.println("Publishing to SPECIAL Topic:" + topic);
        SCAMPIMessage message = SCAMPIMessage.builder().build();
        message.putString(Constants.JSON, data);
       try{
             ScampiHelloWorld.publish(message, Constants.DATA );

        } catch (Exception e) {
            System.out.println(RESTHandler.getResponse(
                    Constants.STATUS_FAIL
                    ,"Error publishing the message", e.getCause().toString())
                    .toString());
            System.exit(1);
       }

        System.out.println("Special Data Topic " +topic);
    }

}
