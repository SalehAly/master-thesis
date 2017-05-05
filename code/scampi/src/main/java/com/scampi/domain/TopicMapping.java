package com.scampi.domain;




import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Aly on 5/4/17.
 */

public class TopicMapping {
    /**
     * A cache containing a mapping between topic and computation end points
     */
    private ConcurrentHashMap<String, List<String>> map;
    private final static TopicMapping INSTANCE = new TopicMapping();

    private TopicMapping() {
        map = new ConcurrentHashMap<>();
    }

    public static TopicMapping getInstance() {
        return INSTANCE;
    }

    public void put(String topic, String endpoint){
       List<String> endpoints =  map.get(topic);
       if(endpoints == null) {
           endpoints = new ArrayList<>();
       } else if(endpoints.contains(endpoint)) {
           return;
       }
       endpoints.add(endpoint);
       map.put(topic, endpoints);
    }

    public List<String> getEndpoints(String topic) {
        List<String> endpoints =  map.get(topic);
        if(endpoints == null)
            return new ArrayList<>();
        return endpoints;
    }
}
