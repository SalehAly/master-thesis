package com.scampi.model;

import com.google.gson.JsonObject;
import lombok.Data;

import java.util.List;

/**
 * Created by Aly on 2/20/17.
 */
@Data
public class Computation {
    private Metadata metadata;
    private JsonObject flow;
    private IOSpec ioSpec;
    private List<String> sources;
}

