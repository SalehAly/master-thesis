#!/bin/bash
DIR=/Users/Aly/.node-red
cd $DIR
java -jar SCAMPI.jar default_settings.txt > scampi-log.txt 2>&1 & disown
sleep 10
java -jar interface-1.0-SNAPSHOT.jar > interface-log.txt 2>&1 & disown
sleep 5
 node-red > node-red-log.txt 2>&1 & disown
echo "All Set Up"
tail -f interface-log.txt
