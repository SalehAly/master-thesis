package com.scampi.domain;


import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

/**
 * Created by Aly on 1/19/17.
 */
public class RESTHandler {

    public static ClientResponse post(String resource, String target, String data) {
        try {
            Client client = Client.create();
            WebResource webResource = client.resource(resource + target);
            ClientResponse response = webResource.type("application/json")
                    .post(ClientResponse.class,data);

            if (response.getStatus() != 200 && response.getStatus()!=204 ) {
                System.out.println(response.toString());
                throw new RuntimeException("Failed : HTTP error code : " + response.getStatus());
            }

            String output = response.getEntity(String.class);
            System.out.println("============getCtoFResponse============");
            System.out.println(output);
            return  response;
        } catch (Exception e) {
            e.printStackTrace();
        }

     return null;
    }
}
