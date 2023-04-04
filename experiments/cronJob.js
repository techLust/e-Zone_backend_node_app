const task = require('node-cron');

task.schedule(' 10 4 18 2 Dec Fri', () => {
    console.log("Running a cron job per 5 second");
},
{
    scheduled: true,
    timezone: 'Asia/Kolkata',
});

// task.schedule('* * * * *', () => {
//     console.log("******** Running a cron job per minute");
// });

// task.start()
// task.stop()

