const { app } = require('@azure/functions');
const { APIServices } = require('../integrations/APIServices.js');
const { payloadConvert } = require('../models/PayloadConvert.js')
const crypto = require('crypto');
const QRCode = require('qrcode');

app.http('FIRSServiceIntegrator', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const model = await request.json();
        context.log(model)
        var resp = payloadConvert(model)
        context.log(resp)
        let qrCodeDataUrl = null
        try {
            const publicKey = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFyU0xpdDRtb1RMbFdjd1A4eEp6RQp3ZTdkRHExdC9kMi9zcXdQTlNVandablFPbklabVh4TXY4QUQxemMxdUErZ3VCc2tpUGdoSXd6ekxWYXJoNk1KCndEdVUxSC95V2FPZE1PTnZOQy9OWERybXB5cE5WUDZyQnV3LzVjSERMdEtoZlJ0YkdFa1JSVVF4MVAxUUJ6REsKVVRpaTRJOXJld29zcVQ4V1dBOE8zRVd5ZHJ5TEg1K3JpVmRUNVBPeU1jcU95YUR2bGRqWG9ZdnBSTHlkcmtDQQpkUWpMdkw0bG00TVNxS05WdGVJR0Y4ZWk4M3Juck5wR3hKTVVGYVMwekt5TzBJZlY0alBCK3ZXN3I1TXdzTjRvCkRnWVR2ME85Q050N3JoNlEvYi9XR3Ewakl3WHJ3c3JIQXE4TXNyUVlGV0JIOHpmejMwOHRWMTlRM1hPTnEyWEMKMHdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=='; // Your public key in PEM format
            const unixTimestamp = Math.floor(Date.now() / 1000);
            const v = {"irn": resp.irn+'.'+unixTimestamp, "certificate": "bHMrdllYN1lPVzlnblpyT1A5U0FMdklJOUMyQi9SMThVbktiTnlGNGJyUT0="}
            context.log(v)
            const dataToEncrypt = Buffer.from(JSON.stringify(v));
            const encryptedData = crypto.publicEncrypt(
            {
                key: Buffer.from(publicKey, 'base64').toString('utf-8'),
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            dataToEncrypt);
            context.log('Encrypted data (base64):', encryptedData.toString('base64'));
            qrCodeDataUrl = await QRCode.toDataURL(encryptedData.toString('base64'));
            console.log(qrCodeDataUrl); // This will output the Base64 encoded string
        }
        catch(error) {
            context.log(error);
        }
        //return { jsonBody: resp }
        try {
            var response = await APIServices.validateInvoice(resp)
            resp = await response.json()
            return { jsonBody: qrCodeDataUrl}
        } catch (error) {
	        context.log(error);
            return { jsonBody: resp}
        }
    }
});
