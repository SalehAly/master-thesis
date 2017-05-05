package Exceptions;

/**
 * Created by Aly on 5/4/17.
 */
public class RestFailed extends RuntimeException {
    public RestFailed(String message) {
        super(message);
    }
}
