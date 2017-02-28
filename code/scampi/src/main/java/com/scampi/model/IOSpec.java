package com.scampi.model;

import com.google.gson.JsonObject;
import lombok.Data;

/**
 * Created by Aly on 2/20/17.
 */
@Data
public class IOSpec {
    private JsonObject input;
    private JsonObject output;
}
