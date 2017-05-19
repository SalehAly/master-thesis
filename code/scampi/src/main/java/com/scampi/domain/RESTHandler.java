package com.scampi.domain;


import Exceptions.RestFailed;
import com.google.gson.JsonObject;
import com.scampi.api.ScampiApi;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import org.apache.log4j.Logger;

/**
 * Created by Aly on 1/19/17.
 */
public class RESTHandler {
    private static  Logger log = Logger.getLogger(RESTHandler.class);
    public static ClientResponse post(String resource, String target, String data, String id) {
        try {

            Client client = Client.create();
            WebResource webResource = client.resource(resource + target);

            ClientResponse response = webResource.type("application/json").accept("application/json")
                    .post(ClientResponse.class, data.toString());

            if (response.getStatus() != 200 && response.getStatus() != 204) {
                log.error(response.toString());
                log.error(response.getEntity(String.class));
                throw new RestFailed("Failed : HTTP error code : " + response.getStatus());
            }

            String output = response.getEntity(String.class);
            StringBuffer sb = new StringBuffer();
            sb.append("Deployed "  + id + " to node-RED ");
            sb.append("============getCtoFResponse============");
            sb.append(response.getStatus());
            sb.append(response.getStatusInfo());
            // sb.append(output);
            log.info(sb.toString());
            return response;
        } catch (RestFailed e) {
            log.error("Request Failed" + e.getMessage(), e);
        }
        return null;
    }

    public static JsonObject getResponse(String status, String message) {
        JsonObject json = new JsonObject();
        json.addProperty("status", status);
        json.addProperty("message", message);
        return json;
    }
}
