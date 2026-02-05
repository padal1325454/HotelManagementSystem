package com.hms.exceptions;

/**
 * Custom exception for handling resource not found scenarios.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message); // Message-only constructor
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause); // Message with cause
    }
}

