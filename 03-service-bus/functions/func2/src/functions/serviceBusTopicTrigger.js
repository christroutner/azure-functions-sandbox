const { app } = require('@azure/functions');

app.serviceBusTopic('serviceBusTopicTrigger', {
    connection: 'MyServiceBusConnection',
    topicName: 'topic01',
    subscriptionName: 'S1',
    handler: (message, context) => {
        context.log('Service bus topic function processed message:', message);
    }
});
