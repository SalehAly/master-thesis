package com.scampi.publish;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.scampi.api.ScampiHelloWorld;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;

import java.util.Arrays;

/**
 * Created by Aly on 1/23/17.
 */
public class Publisher {
    public static void main(String[] args){
       String flow = null;
        try{
             flow = args[0];
        }catch (Exception e ){
            System.out.println("Please include a flow");
           // e.printStackTrace();
            return;
        }
        System.out.println(flow);
        ScampiHelloWorld.init();

        SCAMPIMessage message = SCAMPIMessage.builder().build();
        JsonObject json = new JsonObject();
        JsonArray flowArray = new JsonParser().parse(flow).getAsJsonArray();

        json.add("flow",flowArray);
        message.putString( "json", json.toString() );

        try {
            ScampiHelloWorld.publish(message);
        } catch (InterruptedException e) {
            System.out.println("Error publishing the message");
            e.printStackTrace();
        }

        System.exit(0);

    }
}
