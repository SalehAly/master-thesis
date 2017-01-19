package com.scampi.domain;

import com.scampi.Constants.Constants;

import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * Created by Aly on 1/19/17.
 */
public class CommandRunner {
    public static void addFlow(String flow) {
        try {
            String s;

            Process p = Runtime.getRuntime().exec(Constants.NODE_RED + " flow.json");
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(p.getInputStream()));
            while ((s = br.readLine()) != null)
                System.out.println("line: " + s);
            p.waitFor();
            System.out.println("exit: " + p.exitValue());
            p.destroy();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
