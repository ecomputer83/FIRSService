const { app } = require('@azure/functions');
const { APIServices } = require('../integrations/APIServices.js');

app.http('FIRSServiceIntegrator', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';
        var resp = { name: 'wale abiodun' }
        try {
            var response = await APIServices.getCountries()
            resp = await response.json()
            return { jsonBody: resp }
        } catch (error) {
	        context.log(error);
            return { jsonBody: {}}
        }
    }
});
