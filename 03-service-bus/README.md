# 03 Service Bus

This directory contains code for working with Service Bus. The goal is to create two Azure Functions:
- The first function should be triggered by an HTTP endpoint.
- The first function writes a message to the Service Pub.
- The second function subscribes to a pubsub topic on the Service Bus.
- The second function is triggered by the message written to the Service Bus by the first function.

