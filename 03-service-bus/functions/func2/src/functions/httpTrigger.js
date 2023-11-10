const { app, output } = require('@azure/functions');

const queueOutput = output.storageQueue({
    queueName: 'queuetest01',
    connection: 'AzureWebJobsStorage',
})

app.http('httpTrigger', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraOutputs: [queueOutput],
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

	try {
	  context.extraOutputs.set(queueOutput, name)
	  context.log('Successfully wrote to queue.')
	} catch(err) {
	  context.log('Error writing to queue: ', err)
	}

        return { body: `Hello, ${name}!` };
    }
});
