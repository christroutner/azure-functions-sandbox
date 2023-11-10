/*
  This function is triggered by an HTTP endpoint. It writes a name to a Service
  Bus topic.

  curl -X GET http://localhost:7071/api/httpTrigger?name=chris
  curl -X GET https://cmdfunc01.azurewebsites.net/api/httpTrigger?name=chris
*/

const { app, output } = require('@azure/functions');

const serviceBusOutput = output.serviceBusQueue({
  queueName: 'topic01',
  connection: 'MyServiceBusConnection',
});

app.http('httpTrigger', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraOutputs: [serviceBusOutput],
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

	try {
	  context.extraOutputs.set(serviceBusOutput, name)
	  context.log('Successfully wrote to Service Bus')
	} catch(err) {
	  context.log('Error writing to Service Bus: ', err)
	}

        return { body: `Hello, ${name}!` };
    }
});
