import AWS = require("aws-sdk");
import { config } from "./config/config";
export type AWSError = AWS.AWSError;
export type SendEmailResponse = AWS.SES.SendEmailResponse;
const c = config.dev;

//Configure AWS
var credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;
// Create a new SES object.
export const ses = new AWS.SES();

/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function sendEmailUsingSES(sender: string, recipient: string): any {
  // // Replace sender@example.com with your "From" address.
  // // This address must be verified with Amazon SES.
  // const sender = "Sender Name <sender@recipient.com>";

  // // Replace recipient@example.com with a "To" address. If your account
  // // is still in the sandbox, this address must be verified.
  // const recipient = "recipient@example.com";

  // Specify a configuration set. If you do not want to use a configuration
  // set, comment the following variable, and the
  // ConfigurationSetName : configuration_set argument below.
  // const configuration_set = "ConfigSet";

  // The subject line for the email.
  const subject = "You have a new feed to look at!";

  // The email body for recipients with non-HTML email clients.
  const body_text =
    "A new feed was added to Udagram! Go check it out!!\r\n" +
    "This email was sent with Amazon SES using the " +
    "AWS SDK for JavaScript in Node.js.";

  // The HTML body of the email.
  const body_html = `<html>
  <head></head>
  <body>
    <h1>A new feed was added to Udagram by ${sender}! Go check it out!!</h1>
    <p>This email was sent with
      <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
      <a href='https://aws.amazon.com/sdk-for-node-js/'>
        AWS SDK for JavaScript in Node.js</a>.</p>
  </body>
  </html>`;

  // The character encoding for the email.
  const charset = "UTF-8";

  // Specify the parameters to pass to the API.
  var params = {
    Source: sender,
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: charset,
      },
      Body: {
        Text: {
          Data: body_text,
          Charset: charset,
        },
        Html: {
          Data: body_html,
          Charset: charset,
        },
      },
    },
    // ConfigurationSetName: configuration_set
  };

  //Try to send the email.
  const resp = ses.sendEmail(params);
  return resp.promise();
}

export function verifyEmailForSES(email: string): any {
  var params = {
    EmailAddress: email,
  };
  const resp = ses.verifyEmailIdentity(params);
  return resp.promise();
}

export function getAllSESIdentities() {
  var params = {
    IdentityType: "EmailAddress", 
    MaxItems: 123, 
    NextToken: ""
   };
   const aws_resp =ses.listIdentities(params);
   return aws_resp.promise()
}
