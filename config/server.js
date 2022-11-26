const app = require('../app');
require('./database');
require('dotenv').config();

const port = process.env.PORT;
const env = process.env.ENV;

// CREATE SERVER
app.listen(port, () =>
    console.log(`
App Stage: ${env}
Server running on port: ${port}
`));