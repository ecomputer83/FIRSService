const { app } = require('@azure/functions');
const { APIServices } = require('../integrations/APIServices.js');
const { payloadConvert } = require('../models/PayloadConvert.js')

app.http('FIRSServiceIntegrator', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const model = await request.json();
        context.log(model)
        var resp = payloadConvert(model)
        context.log(resp)
        //return { jsonBody: resp}
        try {
            var response = await APIServices.validateInvoice(resp)
            resp = await response.json()
            return { jsonBody: resp }
        } catch (error) {
	        context.log(error);
            return { jsonBody: resp}
        }
    }
});
