package com.middleware.domain;

import com.middleware.constants.Constants;

import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * Created by Aly on 1/19/17.
 */
public class CommandRunner {


    public static String run(String cmd) {
        try {
            String s;
            StringBuffer sb = new StringBuffer();
            Process p = Runtime.getRuntime().exec(cmd);
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(p.getInputStream()));
            while ((s = br.readLine()) != null)
                sb.append(s);
            p.waitFor();
            System.out.println("exit: " + p.exitValue());
            p.destroy();
            return sb.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String getFreeRam() {
        return run(Constants.RAM_CMD);
    }
}
