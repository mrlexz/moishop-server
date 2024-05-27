import {
  SESClient,
  SESClientConfig,
  SendEmailCommand,
} from "@aws-sdk/client-ses";
import dotenv from "dotenv";

dotenv.config();

const config: SESClientConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
};

const client = new SESClient(config);

type sendEmailProps = {
  emailFrom: string;
  emailTo: string | string[];
  subject: string;
  html: string;
};

export const sendEmail = async ({
  emailFrom,
  emailTo,
  subject,
  html,
}: sendEmailProps) => {
  try {
    const sendEmailTo = (() => {
      if (typeof emailTo === "string") {
        return [emailTo];
      }
      return emailTo;
    })();

    const input = {
      Source: emailFrom,
      Destination: {
        ToAddresses: sendEmailTo,
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: html,
            Charset: "UTF-8",
          },
        },
      },
    };
    console.log("🚀 ~ input:", input);
    const command = new SendEmailCommand(input);
    const response = await client.send(command);
    console.log("🚀 ~ send email aws response:", response);
    return response;
  } catch (err) {
    console.log("🚀 ~ err:", err);
    throw new Error("Error sending email by aws ses");
  }
};
