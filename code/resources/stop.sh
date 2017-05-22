kill $(ps aux | grep 'SCAMPI.jar' | awk '{print $2}')
 kill $(ps aux | grep 'interface-1.0-SNAPSHOT.jar' | awk '{print $2}')
kill $(ps aux | grep 'node-red' | awk '{print $2}')
cd /Users/$USER/.node-red
rm -rf router



echo "All Shut Down"
