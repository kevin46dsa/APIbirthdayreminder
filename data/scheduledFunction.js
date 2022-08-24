var scheduler = require('node-schedule');

// setting rule set (later can be done in a config file
var rule = new scheduler.RecurrenceRule();
rule.hour = 00;
rule.minute = 15;
rule.second = 00;
rule.dayOfWeek = new scheduler.Range(0,6);

var dailyJob = scheduler.scheduleJob(rule, function(){

// code for the job
//…
//…
console.log('this will run everyday at 12:15 AM');

});


//this code is used to run the job to check if there is any birthday today and send a mail to the user
// Code ref: https://buildcoding.com/how-to-schedule-a-job-everyday/#:~:text=When%20you%20have%20a%20few%20jobs%20that%20needs,hour%20or%20day%20or%20once%20in%20a%20week.


