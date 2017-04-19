package com.scampi.model;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Created by Aly on 2/20/17.
 */
@Data
@AllArgsConstructor
public class Metadata {
    private String ram;
    private String power;
    private Resource resources;
}

