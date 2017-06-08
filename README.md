# Master-Thesis: 
![alt text](https://travis-ci.org/SalehAly/master-thesis.svg?branch=develop)

M.Sc. Topic: A Pervasive Computing Framework for Distributed Computational Flow Composition and Execution
 
A delay-tolerant and information-centric framework architecture for pervasive computing  that distributes, composes and executes flows which are representations of computations describing pervasive use cases. The framework uses  service discovery, allows sending and receiving of flows while accounting for their dependencies, required hardware resources, sensors and actuators even without an end-to-end path between senders and receivers. Moreover, it provides the execution environment for the flows and a user interface for publishing and designing flows. Further, the framework allows devices to communicate with each other and exchange data in a publish-subscribe manner which enables them to compose and have inter-relationships in addition to  being able to locally exchange data through databases hosted on the same device. 

<p align="center">
<img align="center" src="https://raw.githubusercontent.com/SalehAly/master-thesis/develop/writing/latex-thesis/images/design.png" width="50%"> 
</p>


A. Flows are developed using node-RED UI, they can include publishing and subscribing REST calls to Maestro. If a flow subscribes to a certain topic, Maestro creates  a topic-endpoint mapping between the topic and an endpoint for this flow specifically, then send a subscribe request to SCAMPI. If another flow on the same instance wants to subscribe to the same topic, Maestro extends the mapping to include it, hence, once a message is received it gets forwarded to all subscribed flow endpoints. 

B. When Maestro receives a publish request from node-RED, it attaches the dependencies and an indicator that states if the response should be received by the sending device only. Then the message is forwarded to SCAMPI server.

C. SCAMPI keeps synchronizing messages and discovering new peers continuously as long as its running. Also, storing some message for the store-carry-forward routing functionality.

D. When a SCAMPI instance receives a message it is forwarded to Maestro, which then verifies the topic. If it was a computation message then Maestro checks meta-data, resources, dependencies and then either deploy the computation to node-RED or discard it. Otherwise, if the message was not a computation, Maestro forwards it to the subscribing flows from the topic-endpoint mapping. 


