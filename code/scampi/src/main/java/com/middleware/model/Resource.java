package com.middleware.model;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Created by Aly on 2/20/17.
 */
@AllArgsConstructor
@Data
public class Resource {
    private boolean camera;
    private boolean tempSensor;
    private boolean gasSensor;
}
