package com.scampi.domain;


import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Aly on 5/4/17.
 */

public class MessageCache {
    /**
     * A cache containing a mapping between topic and computation end points
     */

    public static final int CACHE_SIZE = 1000;

    private HashSet<String> cache;
    private final static MessageCache INSTANCE = new MessageCache();

    private MessageCache() {
        cache = new HashSet<>();
    }

    public static MessageCache getInstance() {
        return INSTANCE;
    }

    public void put(SCAMPIMessage message){
        if (!hasMessage(message))
                cache.add(message.getAppTag());

        if(cache.size() >= CACHE_SIZE){
            cache = new HashSet<>();
        }
    }

    public boolean hasMessage( SCAMPIMessage message){
        if(cache.contains(message.getAppTag()))
            return true;
        return false;
    }

}
