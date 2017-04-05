package com.scampi.domain;


import com.google.gson.JsonObject;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

/**
 * Created by Aly on 1/19/17.
 */
public class RESTHandler {

    public static ClientResponse post(String resource, String target, String data) {
        try {
            System.out.println(data);
            Client client = Client.create();
            WebResource webResource = client.resource(resource + target);

            ClientResponse response = webResource.type("application/json").accept("application/json")
                    .post(ClientResponse.class, data.toString());

            if (response.getStatus() != 200 && response.getStatus() != 204) {
                System.out.println(response.toString());
                System.out.println(response.getEntity(String.class));
                throw new RuntimeException("Failed : HTTP error code : " + response.getStatus());
            }

            String output = response.getEntity(String.class);
            System.out.println("============getCtoFResponse============");
            System.out.println(output);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static JsonObject getResponse(String status, String message, String stacktrace) {
        JsonObject response = getResponse(status, message);
        response.addProperty("stacktrace", stacktrace);
        return response;
    }

    public static JsonObject getResponse(String status, String message) {
        JsonObject json = new JsonObject();
        json.addProperty("status", status);
        json.addProperty("message", message);
        return json;
    }
}
