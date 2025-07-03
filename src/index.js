const { app } = require('@azure/functions');
require('dotenv').config();

app.setup({
    enableHttpStream: true,
});
