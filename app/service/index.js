const mongoose = require('mongoose');
const schedule = require('node-schedule');

const model = require('../../models/user');
const email = require('../email');
let lock = false;

// Runs every 10 seconds
const rule = new schedule.RecurrenceRule();
rule.second = [0];

const unlockService = function () {
  lock = false;
};
const lockService = function () {
  lock = true;
};
const checkIfLocked = function () {
  return lock;
};

const checkForEmailSending = async function () {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  if (checkIfLocked()) {
    return;
  }
  lockService();
  const users = await model.find({ "emailTimes.hour": hour, "emailTimes.minutes": minutes });

  if (users.length > 0) {
    // WE NEED TO SEND OUT THOSE REMINDERS!
    console.log(`found ${users.length} users`);
    let minutesString = '' + minutes;
    if (minutes < 10) {
      minutesString = '0' + minutes;
    }
    for (let user of users) {

      let reminder = `Your ${hour}:${minutesString} Reminder: <br /><br /> Hi ${user.name}, Please take your medication! <br /><br /> From the Pillball Community`;
      email.sendReminder(reminder, user.email, user.name);
    }
    unlockService();
  }
  unlockService();
}

module.exports = function (testing) {
  if (!testing) {
    schedule.scheduleJob(rule, checkForEmailSending);
  }
  return {
    checkIfLocked,
    lockService,
    unlockService,
    checkForEmailSending,
  };
};