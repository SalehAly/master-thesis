package com.scampi.api;

import fi.tkk.netlab.dtn.scampi.applib.*;

/**
 * Sample Scampi application that sends and receives Hello World! messages.
 * For explanation see the Scampi Application Developer Guide.
 *
 * @author teemuk
 */


public class ScampiHelloWorld {
    static private final AppLib APP_LIB = AppLib.builder().build();

    public static void main( String[] args )
            throws InterruptedException {

        init();

        APP_LIB.subscribe( "Hello Service" );
        // Publish a message
        APP_LIB.publish( getMessage( "Hello World!" ), "Hello Service" );

        APP_LIB.addHostDiscoveryCallback(new HostDiscoveryCallback() {
            public void hostDiscovered(AppLib appLib, String s, int i, long l, double v, double v1, double v2) {
                System.out.println(s);
            }
        });
    }


    public static void publish(SCAMPIMessage message) throws InterruptedException {
        APP_LIB.publish(message , "Hello Service" );
    }
    public static void init(){
        // Setup
        APP_LIB.start();
        APP_LIB.addLifecycleListener( new LifeCyclePrinter() );
        APP_LIB.connect();

        // Subscribe to a service
        APP_LIB.addMessageReceivedCallback( new MessagePrinter() );

    }
    private static SCAMPIMessage getMessage(String text ) {
        SCAMPIMessage message = SCAMPIMessage.builder()
                .appTag( "Hello" )
                .build();
        message.putString( "text", text );
        return message;
    }

    private static final class LifeCyclePrinter
            implements AppLibLifecycleListener {


        public void onConnected( String scampiId ) {
            System.out.println( "> onConnected: " + scampiId );
        }


        public void onDisconnected() {
            System.out.println( "> onDisconnected" );
        }


        public void onConnectFailed() {
            System.out.println( "> onConnectFailed" );
        }


        public void onStopped() {
            System.out.println( "> onStopped" );
        }
    }

    private static final class MessagePrinter
            implements MessageReceivedCallback {


        public void messageReceived( SCAMPIMessage message,
                                     String service ) {
            try {
                if ( message.hasString( "text" ) ) {
                    System.out.println( "> messageReceived: "
                            + message.getString( "text" )

                    );
                }
            } finally {
                message.close();
            }
        }
    }
}
