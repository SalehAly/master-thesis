package com.middleware.api;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.google.gson.GsonBuilder;
import com.middleware.constants.Constants;
import com.middleware.domain.MessageCache;
import com.middleware.domain.MessageHandler;
import com.middleware.model.Metadata;
import com.middleware.model.Resource;
import fi.tkk.netlab.dtn.scampi.applib.AppLib;
import fi.tkk.netlab.dtn.scampi.applib.AppLibLifecycleListener;
import fi.tkk.netlab.dtn.scampi.applib.MessageReceivedCallback;
import fi.tkk.netlab.dtn.scampi.applib.SCAMPIMessage;
import lombok.Data;
import org.apache.catalina.LifecycleState;
import org.apache.log4j.Logger;

import java.io.FileReader;

/**
 * Sample Scampi application that sends and receives Hello World! messages.
 * For explanation see the Scampi Application Developer Guide.
 *
 * @author teemuk
 */

@Data
public class SCAMPIApi {
     private static final AppLib APP_LIB = AppLib.builder().build();
     private static Metadata machineSpec;
     private static Logger log = Logger.getLogger(MiddlewareApi.class);
     private static MessageCache messageCache = MessageCache.getInstance();


    public static void init() throws InterruptedException {
        // initialize Scampi API
        initService();
        initMachineSpec();

        if(APP_LIB.getLifecycleState() != AppLib.State.CONNECTED){
            log.error("Scampi Server is not running");
        }

        while(APP_LIB.getLifecycleState() != AppLib.State.CONNECTED){
            Thread.sleep(Constants.FIVE_SECONDS);
            log.info("Waiting for SCAMPI to run and connect.. retrying");
            APP_LIB.connect();
            Thread.sleep(Constants.FIVE_SECONDS);
        }

        APP_LIB.subscribe(Constants.TOPIC_MAIN);
        // Subscribe to the machine own SCAMPI Id
        APP_LIB.subscribe(APP_LIB.getLocalID());


    }

    public static void publish(SCAMPIMessage message, String topic) throws InterruptedException {
        APP_LIB.publish(message, topic);
    }

    public static void initMachineSpec() {
        //TODO: initialize machine specification from json file

        try {
            machineSpec = new GsonBuilder().create().
                    fromJson(new FileReader(Constants.HOME_DIR + "/" +  Constants.NODE_RED_DIR + "/" + Constants.SPEC_FILE_PATH), Metadata.class);
        } catch (Exception e) {
            log.fatal("Either file not found or could not be parsed", e);
            // init with default settings
            machineSpec = new Metadata("low", "medium", new Resource(true, false, false));
        }


    }

    public static void initService() {
        // Setup
        APP_LIB.start();
        APP_LIB.addLifecycleListener(new LifeCyclePrinter());
        APP_LIB.connect();

        // Subscribe message receiver handler
        APP_LIB.addMessageReceivedCallback(new MessagePrinter());

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
                if (messageCache.hasMessage(message)){
                    return;
                }
                messageCache.put(message);
                MessageHandler.handleMessage(message, topic);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                message.close();
            }
        }
    }

    public static AppLib getAppLib() {
        return APP_LIB;
    }
    public static Metadata getMachineSpec() {
        return machineSpec;
    }
}
