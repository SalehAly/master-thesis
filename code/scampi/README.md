## This is an example project for Scampi API that can be exported as an executable jar file.
-------------------------------------------------------------------------------------------



### To create an executable jar
--------------------------------
``mvn clean compile assembly:single``


## To compile
--------------------------------
``mvn clean install``



## To Run Listener
--------------------------------
``java -jar src/main/resources/interface-1.0-SNAPSHOT.jar``


## To Run Publisher
--------------------------------
``java -cp src/main/resources/interface-1.0-SNAPSHOT.jar com.scampi.publish.Publisher``





