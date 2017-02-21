package com.scampi.api;

import com.scampi.constants.Constants;
import com.scampi.domain.MessageHandler;
import fi.tkk.netlab.dtn.scampi.applib.*;

/**
 * Sample Scampi application that sends and receives Hello World! messages.
 * For explanation see the Scampi Application Developer Guide.
 *
 * @author teemuk
 */


public class ScampiHelloWorld {
    static private final AppLib APP_LIB = AppLib.builder().build();

    public static void main(String[] args)
            throws InterruptedException {
        // initalize Scampi API
        init();
        APP_LIB.subscribe(Constants.TOPIC_MAIN);

    }

    public static void publish(SCAMPIMessage message, String topic) throws InterruptedException {
        APP_LIB.publish(message , topic);
    }
    public static void init(){
        // Setup
        APP_LIB.start();
        APP_LIB.addLifecycleListener( new LifeCyclePrinter() );
        APP_LIB.connect();

        // Subscribe message receiver handler
        APP_LIB.addMessageReceivedCallback( new MessagePrinter() );

    }

    private static final class LifeCyclePrinter
            implements AppLibLifecycleListener {


        public void onConnected(String scampiId) {
            System.out.println("> onConnected: " + scampiId);
        }


        public void onDisconnected() {
            System.out.println("> onDisconnected");
        }


        public void onConnectFailed() {
            System.out.println("> onConnectFailed");
        }


        public void onStopped() {
            System.out.println("> onStopped");
        }
    }

    private static final class MessagePrinter
            implements MessageReceivedCallback {


        public void messageReceived(SCAMPIMessage message, String topic) {
            try {

                MessageHandler.handleMessage(message,topic);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                message.close();
            }
        }
    }
}
