package com.middleware.exception;

/**
 * Created by Aly on 5/4/17.
 */
public class RESTFailedException extends RuntimeException {
    public RESTFailedException(String message) {
        super(message);
    }
}
