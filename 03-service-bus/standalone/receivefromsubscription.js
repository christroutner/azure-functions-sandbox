/*
    Quickstart example for working with Azure Service Bus
    https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-nodejs-how-to-use-topics-subscriptions?tabs=connection-string
*/


const { delay, ServiceBusClient, ServiceBusMessage } = require("@azure/service-bus");

const connectionString = "Endpoint=sb://srvbustest01.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=OB9k8bNt8+Z7NPztl2lGY1ywg1LLIpfMU+ASbGwdqxo="
const topicName = "topic01";
const subscriptionName = "S1";

 async function main() {
    // create a Service Bus client using the connection string to the Service Bus namespace
    const sbClient = new ServiceBusClient(connectionString);

    // createReceiver() can also be used to create a receiver for a queue.
    const receiver = sbClient.createReceiver(topicName, subscriptionName);

    // function to handle messages
    const myMessageHandler = async (messageReceived) => {
        console.log(`Received message: ${messageReceived.body}`);
    };

    // function to handle any errors
    const myErrorHandler = async (error) => {
        console.log(error);
    };

    // subscribe and specify the message and error handlers
    receiver.subscribe({
        processMessage: myMessageHandler,
        processError: myErrorHandler
    });

    // Waiting long enough before closing the sender to send messages
    await delay(5000);

    await receiver.close();
    await sbClient.close();
}

// call the main function
main().catch((err) => {
    console.log("Error occurred: ", err);
    process.exit(1);
 });