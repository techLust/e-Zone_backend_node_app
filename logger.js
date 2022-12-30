const log = require('log-to-file');
const task = require('node-cron');

task.schedule('* * * * * *', () => {
    log("Logger function test");
});
