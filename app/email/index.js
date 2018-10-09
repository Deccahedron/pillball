
const sendReminder = function (message, emailTo, nameTo) {

  const helper = require('sendgrid').mail;
  //TODO: enterGridAPIKey here: 
  const sendGridId = process.env.SENDGRID_API_KEY;
  
  const sg = require('sendgrid')(sendGridId);
  const template = "";
  const emailFrom = "reminders@pillball.com";

  const from = new helper.Email(emailFrom);
  const to = new helper.Email(emailTo);
  const subject = "Your Pillball Reminder";

  const content = new helper.Content("text/html", message);

  const mail = new helper.Mail(from, subject, to, content);

  const request = require('sendgrid-rest').request;
  const jsonRequest = JSON.parse(JSON.stringify(request));
  jsonRequest.method = 'POST';
  jsonRequest.path = '/v3/mail/send';
  jsonRequest.body = mail.toJSON();

  sg.API(jsonRequest, function (err, response) {
    if (err) {
      return err;
    } else {
      console.log('email sent');
      return;
    }
  });
};

module.exports = { sendReminder };