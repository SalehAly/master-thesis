package com.middleware.model;

import lombok.Data;

/**
 * Created by Aly on 4/5/17.
 */
@Data
public class PublishPayload {
    private String data;
    private String topic;
    private String file;
    private boolean localOutputResponse;
    private String endpoint;
}
